import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PersonCardComponent } from '../person-card/person-card.component';

interface TeamMember {
  name: string;
  jobTitle: string;
  avatarUrl: string;
}

@Component({
  selector: 'lib-team-display',
  templateUrl: './team-display.component.html',
  styleUrls: ['./team-display.component.css'],
  standalone: true,
  imports: [CommonModule, PersonCardComponent],
})
export class TeamDisplayComponent {
  teamMembers: TeamMember[] = [
    {
      name: 'John Doe',
      jobTitle: 'Frontend Developer',
      avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      name: 'Jane Smith',
      jobTitle: 'UX Designer',
      avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
      name: 'Mike Johnson',
      jobTitle: 'Backend Developer',

      avatarUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
      name: 'Sarah Williams',
      jobTitle: 'Project Manager',
      avatarUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
  ];
}
