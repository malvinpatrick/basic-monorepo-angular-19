import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { PersonCardComponent, TeamDisplayComponent } from 'example-library';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PersonCardComponent, TeamDisplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'example-project';
}
