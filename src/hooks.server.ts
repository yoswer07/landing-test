import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    let lang = event.cookies.get('lang');

    if (!lang) {
        const acceptLang = event.request.headers.get('accept-language');
        if (acceptLang) {
            if (acceptLang.startsWith('en')) {
                lang = 'en';
            } else if (acceptLang.startsWith('es')) {
                lang = 'es';
            }
        }
        lang = lang || 'en';
        event.cookies.set('lang', lang, {
            path: '/',
            maxAge: 60 * 60 * 24 * 365,
            httpOnly: false
        });
    }
    return resolve(event, {
        transformPageChunk: ({ html }) => html.replace('%lang%', lang as string)
    });
};