import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { GithubRepository } from '../../models/github-repository.model';
import { GitHubService } from '../../services/github.service';
import * as SearchActions from '../actions/search.actions';
import { SearchState } from '../reducers/SearchState';

@Injectable()
export class SearchEffects {
    private actions$ = inject(Actions);
    private store = inject(Store<{ search: SearchState }>);
    private githubService = inject(GitHubService);

    search$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(SearchActions.searchRepositories),
            withLatestFrom(this.store.pipe(select(state => state.search.cache as Record<string, GithubRepository[]>))),
            switchMap(([action, cache]) => {
                if (cache && cache[action.query]) {
                    return of(SearchActions.searchRepositoriesSuccess({ repositories: cache[action.query] }));
                }

                return this.githubService.searchRepositories(action.query).pipe(
                    map(repos => SearchActions.searchRepositoriesSuccess({ repositories: repos })),
                    catchError(err => of(SearchActions.searchRepositoriesFailure({ error: err.message })))
                );
            })
        );
    });
}
