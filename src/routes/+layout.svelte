<script lang="ts">
	import './layout.css';
	import Header from '../components/layout/Header.svelte';
    import Footer from '../components/layout/Footer.svelte';
    import Toast from '../components/layout/Toast.svelte';
	
	let { children } = $props();
</script>

<div class="min-h-screen flex flex-col">
    
    <Header />
    
    <main class="grow">
        {@render children()} 
    </main>

    <Footer />
    <Toast />

</div>
