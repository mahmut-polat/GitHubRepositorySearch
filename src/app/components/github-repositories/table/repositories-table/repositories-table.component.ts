import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { GithubRepository } from '../../../../models/github-repository.model';

@Component({
  selector: 'app-repositories-table',
  templateUrl: './repositories-table.component.html',
  styleUrls: ['./repositories-table.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class RepositoriesTableComponent {

  private _repositories: GithubRepository[] = [];
  private readonly PAGE_SIZE: number = 10;

  currentPage: number = 1;
  sortDirection: 'asc' | 'desc' = 'desc';

  @Input()
  set repositories(value: GithubRepository[]) {
    if (value) {
      this._repositories = [...value].sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));
      this.currentPage = 1;
    }
  }
  get repositories(): GithubRepository[] {
    return this._repositories;
  }

  get pagedRepositories(): GithubRepository[] {
    if (!this.repositories || this.repositories.length === 0) {
      return [];
    }

    const start = (this.currentPage - 1) * this.PAGE_SIZE;
    return this.repositories.slice(start, start + this.PAGE_SIZE);
  }

  get hasRepositories(): boolean {
    return Array.isArray(this.repositories) && this.repositories.length > 0;
  }

  get totalPages(): number {
    return this.repositories ? Math.ceil(this.repositories.length / this.PAGE_SIZE) : 0;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  sortByStars() {
    if (this._repositories) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  
      const sorted = [...this._repositories].sort((a, b) => {
        const aStars = a.stargazers_count || 0;
        const bStars = b.stargazers_count || 0;
        return this.sortDirection === 'asc' ? aStars - bStars : bStars - aStars;
      });
  
      this._repositories = sorted;
      this.currentPage = 1;
    }
  }
  
}
