import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GithubRepository } from '../../models/github-repository.model';
import * as SearchActions from '../../store/actions/search.actions';
import { SearchState } from '../../store/reducers/SearchState';
import * as SearchSelectors from '../../store/selectors/search.selectors';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { RepositoriesTableComponent } from './table/repositories-table/repositories-table.component';

@Component({
  selector: 'app-github-repositories',
  templateUrl: './github-repositories.component.html',
  styleUrls: ['./github-repositories.component.scss'],
  imports: [CommonModule, IonicModule, SearchBarComponent, RepositoriesTableComponent],
})
export class GithubRepositoriesComponent implements OnInit {
  repositories$: Observable<GithubRepository[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<{ search: SearchState }>) {
    this.repositories$ = this.store.pipe(select(state => state.search.repositories));
    this.loading$ = this.store.pipe(select(SearchSelectors.selectLoading));
  }

  ngOnInit() { }

  onSearch(term: string): void {
    if (typeof term !== 'string') return;

    const trimmedTerm = term.trim();

    if (!trimmedTerm) {
      this.store.dispatch(SearchActions.clearRepositories());
      return;
    }

    this.store.dispatch(SearchActions.searchRepositories({ query: trimmedTerm }));
  }
}
