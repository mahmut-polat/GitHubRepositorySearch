import { GithubRepository } from '../../models/github-repository.model';

export interface SearchState {
    repositories: GithubRepository[];
    loading: boolean;
    error: string | null;
    cache: Record<string, GithubRepository[]>;
    lastQuery: string | null;
}
