import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { PersonCardComponent, TeamDisplayComponent } from 'example-library';
import { provideLogger } from '../shared/logger/providers';
import { defaultConfig, LoggerConfig } from '../shared/logger/logger-config';
import { LoggerService } from '../shared/logger/logger';

// const tmp: LoggerConfig = 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PersonCardComponent, TeamDisplayComponent],
  providers: [
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
    logger = inject(LoggerService)
  title = 'example-project';

    ngOnInit(): void {
        this.logger.info('AppComponent', 'AppComponent initialized');
        this.logger.debug('AppComponent', 'Debugging AppComponent');
        this.logger.error('AppComponent', 'An error occurred in AppComponent');
    }
}
