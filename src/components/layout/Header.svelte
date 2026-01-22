<script lang="ts">
    import { onMount } from 'svelte';
    import { slide } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import { smoothScroll } from '$lib/actions/smoothScroll';

    // Variables de estado
    let isMenuOpen = false;
    let user: any = null;
    let auth: any;

    const navLinks = [
        { label: 'Servicios', href: '/#servicios' },
        { label: 'Cómo Funcionamos', href: '/#como-funciona' },
        { label: 'Precios', href: '/precios' },
        { label: 'Preguntas Frecuentes', href: '/#faq' },
    ];

    onMount(async () => {
        const firebaseModule = await import('../../lib/firebase');
        const authModule = await import('firebase/auth');
        auth = firebaseModule.auth;

        authModule.onAuthStateChanged(auth, (firebaseUser: any) => {
            user = firebaseUser;
        });
    });

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }
</script>

<header class="sticky top-0 z-50 bg-white shadow-lg">
    <div class="container mx-auto px-6 max-w-7xl">
        <div class="flex items-center justify-between h-20">
            
            <div class="shrink-0">
                <a href="/" class="flex items-center">
                    <img src="/images/logo3plxllg.png" alt="Logo" class="h-30 sm:h-35 w-auto mr-2" />
                </a>
            </div>

            <div class="hidden md:flex items-center space-x-8">
                <nav class="flex space-x-8">
                    {#each navLinks as link}
                        <a href={link.href} use:smoothScroll class="text-gray-800 hover:text-blue-500 font-medium transition duration-150">
                            {link.label}
                        </a>
                    {/each}
                </nav>

                <div class="hidden md:block">
                    {#if user}
                        <a href="/dashboard" class="btn-primary py-2 px-4">
                            <span class="md:max-[926px]:hidden">Mi</span> Cuenta
                        </a>
                    {:else}
                        <a href="/login" class="btn-primary py-2 px-4">
                            Iniciar <span class="md:max-[926px]:hidden">Sesión</span>
                        </a>
                    {/if}
                </div>
            </div>

            <div class="md:hidden flex items-center">
                <button on:click={toggleMenu} class="text-gray-800 hover:text-blue-600 focus:outline-none">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {#if isMenuOpen}
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        {:else}
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        {/if}
                    </svg>
                </button>
            </div>
        </div>
    </div>
    
    {#if isMenuOpen}
        <div id="mobile-menu" class="md:hidden bg-gray-100" transition:slide="{{ duration: 200, easing: quintOut }}">
            <div class="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200">
                {#each navLinks as link}
                    <a href={link.href} on:click={toggleMenu} use:smoothScroll class="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-gray-300">
                        {link.label}
                    </a>
                {/each}
                <div class="py-2 px-3">
                    {#if user}
                        <a href="/dashboard" on:click={toggleMenu} class="btn-primary px-4 block w-full text-center py-2">
                            Mi Cuenta
                        </a>
                    {:else}
                        <a href="/login" on:click={toggleMenu} class="btn-primary px-4 block w-full text-center py-2">
                            Iniciar Sesión
                        </a>
                    {/if}
                </div>
            </div>
        </div>
    {/if}
</header>