import {
  all, takeLatest, call, put, select,
} from 'redux-saga/effects';

import api from '../../services/api';
import { navigate } from '../../services/navigation';

import * as DetalhesActions from '../actions/detalhes';
import * as LanchesActions from '../actions/lanches';

const promoLight = (bacon, alface, total) => ({
  promoOn: bacon.qtty === 0 && alface.qtty > 0,
  total: bacon.qtty === 0 && alface.qtty > 0 ? total * 0.1 : 0,
});

const promoLeveTresPagueDois = (ingrediente) => {
  let total = 0;
  if (ingrediente.qtty % 3 === 0) {
    total = ingrediente.price * ingrediente.qtty * (2 / 3);
  } else {
    total = ingrediente.qtty * ingrediente.price;
  }

  return {
    promoOn: ingrediente.qtty > 0 && ingrediente.qtty % 3 === 0,
    total,
  };
};

const calcPreco = (lanche, ingredientes) => {
  let total = 0;
  ingredientes.forEach((ingrediente) => {
    if (lanche.description.toLowerCase().match(ingrediente.title.toLowerCase()) != null) {
      total += ingrediente.price;
    }
  });

  return total;
};

function* getIngredientes() {
  const response = yield call(api.get, 'ingredientes');

  yield put(DetalhesActions.ingredientesSuccess(response.data));
}

function* getLanches() {
  yield getIngredientes();

  const ingredientes = yield select(state => state.detalhes.ingredientes);
  const lanchesResponse = yield call(api.get, 'lanches');
  const lanchesApi = lanchesResponse.data || [];

  const lanchesComPreco = lanchesApi.map((lanche) => {
    const lancheComPreco = lanche;
    lancheComPreco.price = calcPreco(lanche, ingredientes);

    return lancheComPreco;
  });

  yield put(LanchesActions.lanchesSuccess(lanchesComPreco));
}

function navigateToDetails() {
  navigate('Detalhes');
}

function* calcIngredientes() {
  const item = yield select(state => state.lanches.selectedLanche);
  const ingredientes = yield select(state => state.detalhes.ingredientes);

  const total = item.price;
  const ingredientesAtualizados = ingredientes.map((ingrediente) => {
    const ingredienteAtualizado = ingrediente;
    ingredienteAtualizado.qtty = 0;
    item.ingredientes.forEach((id) => {
      if (ingrediente.id === id) {
        ingredienteAtualizado.qtty += 1;
      }
    });

    return ingredienteAtualizado;
  });

  yield put(DetalhesActions.ingredientesSuccess(ingredientesAtualizados));
  yield put(DetalhesActions.totalUpdate(total));
}

function* calculaTotal() {
  const { ingredientes, promocao } = yield select(state => state.detalhes);

  let novaPromo = { total: 0, promoOn: false };
  let total = 0;

  const alface = ingredientes.findIndex(ingrediente => ingrediente.id === 1);
  const bacon = ingredientes.findIndex(ingrediente => ingrediente.id === 2);

  ingredientes.forEach((ingrediente) => {
    if (ingrediente.id === 3) {
      novaPromo = promoLeveTresPagueDois(ingrediente);
      total += novaPromo.total;
      promocao.carne = novaPromo.promoOn;
    } else if (ingrediente.id === 5) {
      novaPromo = promoLeveTresPagueDois(ingrediente);
      total += novaPromo.total;
      promocao.queijo = novaPromo.promoOn;
    } else {
      total += ingrediente.qtty * ingrediente.price;
    }
  });

  novaPromo = promoLight(ingredientes[bacon], ingredientes[alface], total);

  promocao.light = novaPromo.promoOn;
  total -= novaPromo.total;

  yield put(DetalhesActions.promocaoUpdate(promocao));
  yield put(DetalhesActions.totalUpdate(total));
}

function* ingredientesUpdateQtty(action) {
  yield put(DetalhesActions.ingredientesSuccess(action.payload.ingredientes));

  yield calculaTotal();
}

export default function* rootSaga() {
  return yield all([
    takeLatest('LANCHES_REQUEST', getLanches),
    takeLatest('LANCHES_SELECT', navigateToDetails),
    takeLatest('INGREDIENTES_REQUEST', getIngredientes),
    takeLatest('INGREDIENTES_CALCULATION', calcIngredientes),
    takeLatest('INGREDIENTES_UPDATE_QTTY_REQUEST', ingredientesUpdateQtty),
    takeLatest('INGREDIENTES_SUCCESS', calculaTotal),
  ]);
}
