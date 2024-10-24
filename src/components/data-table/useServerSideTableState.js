import { ref } from "vue";

const DEFAULT_PAGINATION_STATE = {
  sortBy: null,
  descending: true,
  page: 1,
  rowsPerPage: 3,
};
const DEFAULT_FILTER_STATE = {};
const DEFAULT_STATE = {
  pagination: DEFAULT_PAGINATION_STATE,
  filter: DEFAULT_FILTER_STATE,
};

export function useServerSideTableState(initialState = DEFAULT_STATE) {
  const paginationInitialState =
    initialState.pagination || DEFAULT_PAGINATION_STATE;

  const pagination = ref(paginationInitialState);

  const filterInitialState = initialState.filter || DEFAULT_FILTER_STATE;
  const filter = ref(filterInitialState);

  return {
    pagination,
    filter,
  };
}
