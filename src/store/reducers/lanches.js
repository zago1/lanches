const INITIAL_STATE = {
  data: [
    {
      id: 999,
      title: 'Monte seu lanche',
      description: 'Escolha todos os ingredientes que desejar.',
      price: 0.0,
    },
  ],
  selectedLanche: {},
  loading: false,
};

export default function lanches(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LANCHES_REQUEST':
      return { ...state, loading: true };
    case 'LANCHES_SUCCESS':
      return { ...state, data: [...state.data, ...action.payload.data], loading: false };
    case 'LANCHES_FAILURE':
      return { ...state, loading: false };
    case 'LANCHES_SELECT':
      return { ...state, selectedLanche: action.payload.data };
    default:
      return state;
  }
}
