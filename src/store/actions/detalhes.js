export const ingredientesRequest = () => ({
  type: 'INGREDIENTES_REQUEST',
});

export const ingredientesSuccess = data => ({
  type: 'INGREDIENTES_SUCCESS',
  payload: { data },
});

export const ingredientesFailure = () => ({
  type: 'INGREDIENTES_FAILURE',
});

export const ingredientesCalc = () => ({
  type: 'INGREDIENTES_CALCULATION',
});

export const totalUpdate = total => ({
  type: 'TOTAL_UPDATE',
  payload: { total },
});

export const promocaoUpdate = promocao => ({
  type: 'PROMOCAO_UPDATE',
  payload: { promocao },
});

export const ingredientesUpdateQttyRequest = ingredientes => ({
  type: 'INGREDIENTES_UPDATE_QTTY_REQUEST',
  payload: { ingredientes },
});
