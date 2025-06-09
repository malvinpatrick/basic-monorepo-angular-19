import { Component, inject, OnInit } from '@angular/core';
import { PersonCardComponent } from 'example-library';
import { HomeStore } from '../data';
import { CommonModule } from '@angular/common';
import { UserDto } from '../data';

@Component({
    selector: 'app-feature-home',
    imports: [PersonCardComponent, CommonModule],
    templateUrl: './feature-home.component.html',
    styleUrl: './feature-home.component.css',
    standalone: true
})
export class FeatureHomeComponent implements OnInit {
    private homeStore = inject(HomeStore);

    // Access the store selectors
    users = this.homeStore.allUsers;
    userCount = this.homeStore.userCount;
    
    // Access loading state from withCallState
    isLoading = this.homeStore.isLoading;
    isLoaded = this.homeStore.isLoaded;
    hasError = this.homeStore.hasError;
    errorMessage = this.homeStore.errorMessage;
    
    ngOnInit(): void {
        // Load users from API when component initializes
        this.loadUsers();
    }
    
    // Method to load users from the API
    loadUsers(): void {
        this.homeStore.loadUsers();
    }
    
    // Method to add a dummy user
    addDummyUser(): void {
        const id = crypto.randomUUID();
        const newUser: UserDto = {
            id: id,
            name: `User ${id.substring(0, 4)}`,
            title: 'New Employee',
            avatarUrl: `https://i.pravatar.cc/${Math.floor(Math.random() * 1000)}`
        };
        
        this.homeStore.addUser(newUser);
    }
    
    // Method to remove the last user
    removeLastUser(): void {
        const users = this.users();
        if (users.length > 0) {
            const lastUser = users[users.length - 1];
            if (lastUser.id) {
                this.homeStore.removeUser(lastUser.id);
            }
        }
    }
}
