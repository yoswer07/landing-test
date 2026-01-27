import { writable } from 'svelte/store';

interface Toast {
    show: boolean;
    message: string;
    type: 'success' | 'error';
}

export const toast = writable<Toast>({
    show: false,
    message: '',
    type: 'success'
});

export function showNotify(message: string, type: 'success' | 'error' = 'success') {
    toast.set({ show: true, message, type });

    setTimeout(() => {
        toast.update(state => ({ ...state, show: false }));
    }, 4000);
}