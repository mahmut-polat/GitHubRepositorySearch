import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { GithubRepository } from '../models/github-repository.model';

@Injectable({ providedIn: 'root' })
export class GitHubService {
  private readonly GITHUB_TOKEN = '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'; //readonly token
  private readonly BASE_URL = 'https://api.github.com/search/repositories';

  constructor(private http: HttpClient) { }

  searchRepositories(query: string) {
    if (!query.trim()) {
      return of([] as GithubRepository[]);
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.GITHUB_TOKEN}`,
    });

    const url = `${this.BASE_URL}?q=${encodeURIComponent(query)}`;

    return this.http.get<{ items: GithubRepository[] }>(url, { headers }).pipe(
      map(res => res.items)
    );
  }
}
