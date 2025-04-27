import { createReducer, on } from '@ngrx/store';
import * as SearchActions from '../actions/search.actions';
import { GithubRepository } from '../../models/github-repository.model';

export interface SearchState {
    repositories: GithubRepository[];
    loading: boolean;
    error: string | null;
    cache: Record<string, GithubRepository[]>;
    lastQuery: string | null;
}

export const initialState: SearchState = {
    repositories: [],
    loading: false,
    error: null,
    cache: {},
    lastQuery: null,
};

export const searchReducer = createReducer(
    initialState,
    on(SearchActions.searchRepositories, (state, { query }) => ({
        ...state,
        loading: true,
        error: null,
        lastQuery: query,
        repositories: state.cache[query] || []
    })),
    on(SearchActions.searchRepositoriesSuccess, (state, { repositories }) => ({
        ...state,
        loading: false,
        repositories,
        cache: state.lastQuery ? {
            ...state.cache,
            [state.lastQuery]: repositories
        } : state.cache
    })),
    on(SearchActions.searchRepositoriesFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
    on(SearchActions.clearRepositories, (state) => ({
        ...state,
        repositories: [],
        loading: false,
        error: null
    }))
);