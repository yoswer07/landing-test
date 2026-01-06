import { writable } from 'svelte/store';

// Definimos la estructura
interface Toast {
    show: boolean;
    message: string;
    type: 'success' | 'error';
}

// Creamos el store
export const toast = writable<Toast>({
    show: false,
    message: '',
    type: 'success'
});

// Función global para mostrar la notificación
export function showNotify(message: string, type: 'success' | 'error' = 'success') {
    toast.set({ show: true, message, type });

    // Se cierra automáticamente tras 4 segundos
    setTimeout(() => {
        toast.update(state => ({ ...state, show: false }));
    }, 4000);
}