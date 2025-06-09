import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserDto } from '../../domains/home/data/user.dto';

// Interface to match the response format from the DummyJSON API
interface DummyJsonUserResponse {
  users: DummyJsonUser[];
  total: number;
  skip: number;
  limit: number;
}

// Interface to match the user format from the DummyJSON API
interface DummyJsonUser {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  email: string;
  image: string;
  company?: {
    title: string;
  };
  // ...other properties not needed for our mapping
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'https://dummyjson.com/users';

  /**
   * Fetches users from the DummyJSON API and maps them to our UserDto format
   */
  getUsers(): Observable<UserDto[]> {
    return this.http.get<DummyJsonUserResponse>(this.apiUrl).pipe(
      map(response => response.users.map(user => this.mapToUserDto(user)))
    );
  }

  /**
   * Maps a DummyJSON user to our UserDto format
   */
  private mapToUserDto(user: DummyJsonUser): UserDto {
    return {
      id: user.id.toString(),
      name: `${user.firstName} ${user.lastName}`,
      title: user.company?.title || 'Unknown',
      avatarUrl: user.image
    };
  }
}
