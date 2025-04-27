import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GithubRepositoriesComponent } from './github-repositories.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { SearchState } from '../../store/reducers/search.reducer';
import * as SearchActions from '../../store/actions/search.actions';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('GithubRepositoriesComponent', () => {
  let component: GithubRepositoriesComponent;
  let fixture: ComponentFixture<GithubRepositoriesComponent>;
  let store: MockStore<{ search: SearchState }>;
  const initialState: SearchState = {
    repositories: [],
    loading: false,
    error: null,
    cache: {},
    lastQuery: null
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GithubRepositoriesComponent],
      providers: [
        provideMockStore({ initialState: { search: initialState } })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(GithubRepositoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should not dispatch any action if search term is not a string', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.onSearch(null as any);
    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it('should dispatch clearRepositories if search term is empty after trimming', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.onSearch('   ');
    expect(dispatchSpy).toHaveBeenCalledWith(SearchActions.clearRepositories());
  });

  it('should dispatch searchRepositories if valid search term is given', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.onSearch('angular');
    expect(dispatchSpy).toHaveBeenCalledWith(SearchActions.searchRepositories({ query: 'angular' }));
  });

  it('should initialize repositories$ as an Observable', (done) => {
    component.repositories$.subscribe(value => {
      expect(value).toEqual([]);
      done();
    });
  });

  it('should initialize loading$ as an Observable', (done) => {
    component.loading$.subscribe(value => {
      expect(value).toBe(false);
      done();
    });
  });

  it('should call onSearch when search event is emitted from search bar', () => {
    const onSearchSpy = spyOn(component, 'onSearch');
    const searchBarDe: DebugElement = fixture.debugElement.query(By.css('app-search-bar'));
    searchBarDe.triggerEventHandler('search', 'rxjs');
    expect(onSearchSpy).toHaveBeenCalledWith('rxjs');
  });

  it('should dispatch clearRepositories when user deletes all input', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.onSearch('');
    expect(dispatchSpy).toHaveBeenCalledWith(SearchActions.clearRepositories());
  });
});