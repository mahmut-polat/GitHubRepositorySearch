import { createAction, props } from '@ngrx/store';
import { GithubRepository } from '../../models/github-repository.model';

export const searchRepositories = createAction(
  '[Search] Search Repositories',
  props<{ query: string }>()
);

export const searchRepositoriesSuccess = createAction(
  '[Search] Search Repositories Success',
  props<{ repositories: GithubRepository[] }>()
);

export const searchRepositoriesFailure = createAction(
  '[Search] Search Repositories Failure',
  props<{ error: string }>()
);

export const clearRepositories = createAction(
  '[Search] Clear Repositories'
);
