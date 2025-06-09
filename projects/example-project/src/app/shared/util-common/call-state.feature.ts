import { signalStoreFeature, patchState, withMethods, withState, withComputed } from '@ngrx/signals';
import { computed } from '@angular/core';

// Define call state enum
export enum CallStatus {
  INIT = 'init',
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error'
}

// Define the call state model
export interface CallState {
  status: CallStatus;
  error: string | null;
}

// Initial state
export const initialCallState: CallState = {
  status: CallStatus.INIT,
  error: null
};

// Create a reusable feature for loading states
export function withCallState<State extends object>() {
  return signalStoreFeature(
    withState<{ callState: CallState }>({
      callState: initialCallState
    }),

    withMethods((store) => ({
      setLoading: () => {
        patchState(store, {
          callState: {
            status: CallStatus.LOADING,
            error: null
          }
        });
      },
      setLoaded: () => {
        patchState(store, {
          callState: {
            status: CallStatus.LOADED,
            error: null
          }
        });
      },
      setError: (error: string) => {
        patchState(store, {
          callState: {
            status: CallStatus.ERROR,
            error
          }
        });
      },
      resetCallState: () => {
        patchState(store, {
          callState: initialCallState
        });
      }
    })),

    // Computed properties for easy access to callState values
    withComputed((state) => ({
      isLoading: computed(() => state.callState().status === CallStatus.LOADING),
      isLoaded: computed(() => state.callState().status === CallStatus.LOADED),
      hasError: computed(() => state.callState().status === CallStatus.ERROR),
      errorMessage: computed(() => state.callState().error)
    }))
  );
}
