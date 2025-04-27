import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepositoriesTableComponent } from './repositories-table.component';
import { GithubRepository } from '../../../../models/github-repository.model';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

describe('RepositoriesTableComponent', () => {
  let component: RepositoriesTableComponent;
  let fixture: ComponentFixture<RepositoriesTableComponent>;

  const createRepo = (name: string, stars: number): GithubRepository => ({
    name,
    owner: { login: name + '_owner' } as any,
    language: 'TypeScript',
    stargazers_count: stars,
    created_at: '',
    html_url: '',
    id: 0,
    node_id: '',
    full_name: '',
    private: false,
    description: null,
    fork: false,
    url: '',
    updated_at: '',
    pushed_at: '',
    git_url: '',
    ssh_url: '',
    clone_url: '',
    svn_url: '',
    homepage: null,
    size: 0,
    watchers_count: 0,
    has_issues: false,
    has_projects: false,
    has_downloads: false,
    has_wiki: false,
    has_pages: false,
    has_discussions: false,
    forks_count: 0,
    archived: false,
    disabled: false,
    open_issues_count: 0,
    license: undefined,
    allow_forking: false,
    is_template: false,
    web_commit_signoff_required: false,
    topics: [],
    visibility: '',
    forks: 0,
    open_issues: 0,
    watchers: 0,
    default_branch: '',
    score: 0,
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepositoriesTableComponent, IonicModule, CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RepositoriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should sort repositories by stars descending on input', () => {
    component.repositories = [
      createRepo('Repo A', 10),
      createRepo('Repo B', 20),
    ];
    expect(component.repositories[0].stargazers_count).toBe(20);
    expect(component.repositories[1].stargazers_count).toBe(10);
  });

  it('should paginate repositories correctly', () => {
    const repos = Array.from({ length: 12 }, (_, i) => createRepo(`Repo ${i}`, i));
    component.repositories = repos;
    component.pageSize = 5;
    component.currentPage = 2;

    const paged = component.pagedRepositories;
    expect(paged.length).toBe(5);
    expect(paged[0].name).toBe('Repo 6');
  });

  it('should navigate to next page', () => {
    const repos = Array.from({ length: 15 }, (_, i) => createRepo(`Repo ${i}`, i));
    component.repositories = repos;
    component.pageSize = 5;
    component.currentPage = 1;

    component.nextPage();
    expect(component.currentPage).toBe(2);
  });

  it('should navigate to previous page', () => {
    const repos = Array.from({ length: 15 }, (_, i) => createRepo(`Repo ${i}`, i));
    component.repositories = repos;
    component.pageSize = 5;
    component.currentPage = 2;

    component.previousPage();
    expect(component.currentPage).toBe(1);
  });

  it('should toggle sort direction when sortByStars is called', () => {
    component.repositories = [
      createRepo('Repo A', 5),
      createRepo('Repo B', 10),
    ];
    component.sortByStars();
    expect(component.sortDirection).toBe('asc');

    component.sortByStars();
    expect(component.sortDirection).toBe('desc');
  });
});
