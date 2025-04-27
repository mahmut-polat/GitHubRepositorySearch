import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { GithubRepository } from '../models/github-repository.model';

@Injectable({ providedIn: 'root' })
export class GitHubService {
  private readonly BASE_URL = environment.githubApi.baseUrl;
  private readonly GITHUB_TOKEN = environment.githubApi.token; // Add token if needed

  constructor(private http: HttpClient) { }

  searchRepositories(query: string) {
    if (!query.trim()) {
      return of([] as GithubRepository[]);
    }

    let headers = new HttpHeaders();
    if (this.GITHUB_TOKEN) {
      headers = headers.set('Authorization', `Bearer ${this.GITHUB_TOKEN}`);
    }

    const url = `${this.BASE_URL}?q=${encodeURIComponent(query)}`;

    return this.http.get<{ items: GithubRepository[] }>(url, { headers }).pipe(
      map(res => res.items)
    );
  }
}
