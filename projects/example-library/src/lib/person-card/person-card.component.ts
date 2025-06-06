import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class PersonCardComponent {
  @Input() name: string = '';
  @Input() jobTitle: string = '';
  @Input() avatarUrl: string = '';
}
