import { GithubRepository } from "./github-repository.model";

export interface GithubRepositoryResponse {
    total_count: number;
    incomplete_results: boolean;
    items: GithubRepository[];
}
