const INITIAL_STATE = {
  ingredientes: [],
  total: 0.0,
  promocao: {
    light: null,
    carne: null,
    queijo: null,
  },
  loading: false,
};

export default function detalhes(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'INGREDIENTES_REQUEST':
      return { ...state, loading: true };

    case 'INGREDIENTES_SUCCESS':
      return { ...state, ingredientes: action.payload.data, loading: false };

    case 'INGREDIENTES_FAILURE':
      return { ...state, loading: false };

    case 'TOTAL_UPDATE':
      return { ...state, total: action.payload.total };

    case 'PROMOCAO_UPDATE':
      return { ...state, promocao: action.payload.promocao };

    default:
      return state;
  }
}
