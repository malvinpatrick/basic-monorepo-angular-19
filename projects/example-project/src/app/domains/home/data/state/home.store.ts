import { signalStore, withState, withComputed, patchState, signalStoreFeature, withMethods } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { UserDto } from '../user.dto';
import { withCallState } from '../../../../shared/util-common';
import { UserService } from '../../../../shared/util-common/user.service';
import { firstValueFrom } from 'rxjs';

type HomeState = {
    users: UserDto[];
};

const initialState: HomeState = {
    users: [
        {
            id: '1',
            name: 'John Doe',
            title: 'Software Engineer',
            avatarUrl: 'https://i.pravatar.cc/300'
        },
        {
            id: '2',
            name: 'Jane Smith',
            title: 'Product Manager',
            avatarUrl: 'https://i.pravatar.cc/301'
        },
        {
            id: '3',
            name: 'Alice Johnson',
            title: 'UX Designer',
            avatarUrl: 'https://i.pravatar.cc/302'
        }
    ]
};

export const HomeStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withCallState(),

    withComputed((store) => ({
        userCount: computed(() => store.users().length),
        allUsers: computed(() => store.users())
    })),

    withMethods((store: any) => {
        // Inject the UserService
        const userService = inject(UserService);

        return {
            loadUsers: async () => {
                // Set loading state
                store.setLoading();

                // Subscribe to the user service
                try {
                    const users: UserDto[] = await firstValueFrom(userService.getUsers());
                    patchState(store, { users });
                    store.setLoaded();
                } catch (error: any) {
                    console.error('Error loading users:', error);
                    store.setError(error.message || 'Failed to load users');
                }

                // .subscribe({
                //     next: (users: UserDto[]) => {
                //         // Update state with users from API
                //         patchState(store, { users });
                //         store.setLoaded();
                //     },
                //     error: (error: Error) => {
                //         console.error('Error loading users:', error);
                //         store.setError(error.message || 'Failed to load users');
                //     }
                // });
            },
            addUser: (user: UserDto) => {
                patchState(store, (state: { users: UserDto[] }) => ({
                    users: [...state.users, user]
                }));
            },
            removeUser: (id: string) => {
                patchState(store, (state: { users: UserDto[] }) => ({
                    users: state.users.filter((user: UserDto) => user.id !== id)
                }));
            }
        };
    })
);
