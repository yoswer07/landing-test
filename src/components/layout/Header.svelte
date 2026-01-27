<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { smoothScroll } from '$lib/actions/smoothScroll';

	import { locale } from '$lib/langStore';
	import { Languages } from '@lucide/svelte';

	import { t } from '$lib/langStore';

	function toggleLang() {
		locale.update((l) => (l === 'es' ? 'en' : 'es'));
	}

	// Variables de estado
	let isMenuOpen = false;
	let user: any = null;
	let auth: any;

	$: navLinks = [
        { label: $t.nav_services, href: '/#services' },
        { label: $t.nav_how_it_works, href: '/#how-it-works' },
        { label: $t.nav_pricing, href: '/pricing' },
        { label: $t.nav_faq, href: '/#faq' }
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

<header class="sticky top-0 z-50 bg-secondary shadow-md">
	<div class="container mx-auto px-6 max-w-7xl">
		<div class="flex items-center justify-between h-20">
			<div class="shrink-0">
				<a href="/" class="flex items-center">
					<img src="/images/logo2.png" alt="Logo" class="h-24 xl:h-32 w-auto mr-2 transition-all" />
				</a>
			</div>

			<div class="hidden md:flex items-center gap-3 xl:gap-8">
				<nav class="flex gap-4 xl:gap-8">
					{#each navLinks as link}
						<a
							href={link.href}
							use:smoothScroll
							class="text-gray-200 hover:text-blue-500 font-medium text-sm xl:text-base transition duration-150 whitespace-nowrap"
						>
							{link.label}
						</a>
					{/each}
				</nav>

                <div class="flex items-center bg-gray-100 rounded-lg p-0.5 xl:p-1 shrink-0">
                    <button
                        on:click={() => toggleLang()}
                        class="px-2 xl:px-3 py-1 text-[10px] xl:text-xs font-bold rounded-md transition-all
                        {$locale === 'es'
                            ? 'bg-white text-secondary shadow-sm'
                            : 'text-gray-400 hover:text-secondary'}">
                        ES
                    </button>
                    <button
                        on:click={() => toggleLang()}
                        class="px-2 xl:px-3 py-1 text-[10px] xl:text-xs font-bold rounded-md transition-all
                        {$locale === 'en'
                            ? 'bg-white text-secondary shadow-sm'
                            : 'text-gray-400 hover:text-secondary'}">
                        EN
                    </button>
			    </div>

				<div class="hidden md:block shrink-0">
					{#if user}
						<a href="/dashboard" class="btn-primary py-2 px-4">
							<span class="md:max-[1024px]:hidden">{$t.btn_account_slice}</span> {$t.btn_account_slice2}
						</a>
					{:else}
						<a href="/login" class="btn-primary py-2 px-4">
							{$t.btn_session_slice}
						</a>
					{/if}
				</div>
			</div>

			<div class="md:hidden flex items-center">
				<button on:click={toggleMenu} class="text-gray-200 hover:text-blue-600 focus:outline-none">
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						{#if isMenuOpen}
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						{:else}
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						{/if}
					</svg>
				</button>
			</div>
		</div>
	</div>

	{#if isMenuOpen}
		<div
			id="mobile-menu"
			class="md:hidden bg-secondary"
			transition:slide={{ duration: 200, easing: quintOut }}
		>
			<div class="px-2 pt-2 pb-3 space-y-1 border-t border-gray-700">
				{#each navLinks as link}
					<a
						href={link.href}
						on:click={toggleMenu}
						use:smoothScroll
						class="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:bg-gray-700"
					>
						{link.label}
					</a>
				{/each}
                <div class="px-3 py-4 flex items-center justify-between border-t border-gray-700/50 mt-2">
                    <span class="text-sm font-medium text-gray-400 flex items-center gap-2">
                        <Languages size={16} />
                        Idioma / Language
                    </span>
                    <div class="flex items-center bg-gray-800 rounded-lg p-1 border border-gray-700">
                        <button
                            on:click={() => toggleLang()}
                            class="px-4 py-1.5 text-xs font-bold rounded-md transition-all
                            {$locale === 'es'
                                ? 'bg-primary text-white shadow-sm'
                                : 'text-gray-400 hover:text-gray-200'}">
                            ES
                        </button>
                        <button
                            on:click={() => toggleLang()}
                            class="px-4 py-1.5 text-xs font-bold rounded-md transition-all
                            {$locale === 'en'
                                ? 'bg-primary text-white shadow-sm'
                                : 'text-gray-400 hover:text-gray-200'}">
                            EN
                        </button>
                    </div>
                </div>
				<div class="py-2 px-3">
					{#if user}
						<a
							href="/dashboard"
							on:click={toggleMenu}
							class="btn-primary px-4 block w-full text-center py-2"
						>
							{$t.btn_account}
						</a>
					{:else}
						<a
							href="/login"
							on:click={toggleMenu}
							class="btn-primary px-4 block w-full text-center py-2"
						>
							{$t.btn_session}
						</a>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</header>
