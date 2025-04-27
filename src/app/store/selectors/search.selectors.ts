import { createSelector } from '@ngrx/store';
import { SearchState } from '../reducers/SearchState';

export const selectSearch = (state: { search: SearchState }) => state.search;

export const selectRepositories = createSelector(
  selectSearch,
  (state: SearchState) => state.repositories
);

export const selectLoading = createSelector(
  selectSearch,
  (state: SearchState) => state.loading
);

export const selectError = createSelector(
  selectSearch,
  (state: SearchState) => state.error
);
