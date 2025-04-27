import { Component } from '@angular/core';
import { GithubRepositoriesComponent } from './components/github-repositories/github-repositories.component';

@Component({
  selector: 'app-root',
  imports: [GithubRepositoriesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'GitHubRepositorySearch';
}
