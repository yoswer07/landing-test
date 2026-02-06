<script lang="ts">
	import './layout.css';
	import Header from '../components/layout/Header.svelte';
    import Footer from '../components/layout/Footer.svelte';
    import Toast from '../components/layout/Toast.svelte';
    import { t } from '$lib/langStore';
	
	let { children } = $props();
</script>

<svelte:head>
    <link rel="alternate" hreflang="es" href="https://3pxlogistics.com" />
    <link rel="alternate" hreflang="en" href="https://3pxlogistics.com" />
    <link rel="alternate" hreflang="x-default" href="https://3pxlogistics.com" />
    <title>{$t.home_title}</title>
    <meta name="description" content={$t.home_description}>
</svelte:head>

<div class="min-h-screen flex flex-col">

    <Header />
        
    <main class="grow">
        {@render children()} 
    </main>

    <Footer />
    <Toast />

</div>
