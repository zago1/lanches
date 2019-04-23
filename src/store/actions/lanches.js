export const lanchesRequest = () => ({
  type: 'LANCHES_REQUEST',
});

export const lanchesSuccess = data => ({
  type: 'LANCHES_SUCCESS',
  payload: { data },
});

export const lanchesFailure = () => ({
  type: 'LANCHES_FAILURE',
});

export const lancheSelect = data => ({
  type: 'LANCHES_SELECT',
  payload: { data },
});
