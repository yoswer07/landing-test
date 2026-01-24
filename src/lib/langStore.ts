import { writable, derived } from 'svelte/store';
import { translations } from './translations';
import Cookies from 'js-cookie';
import { browser } from '$app/environment';

const initialLang = Cookies.get('lang') || 'en';
export const locale = writable(initialLang);

if (browser) {
    locale.subscribe((value) => {
        Cookies.set('lang', value, { expires: 365, path: '/' });
        document.documentElement.lang = value;
    });
}

export const t = derived(locale, ($locale) => translations[$locale as keyof typeof translations]);