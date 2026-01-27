<script>
    import { HeroSection, ServicesSection, HowItWorksSection, FAQSection } from '$lib';
    import { t } from '$lib/langStore';
</script>

<svelte:head>
    <link rel="alternate" hreflang="es" href="https://3pxlogistics.com" />
    <link rel="alternate" hreflang="en" href="https://3pxlogistics.com" />
    <link rel="alternate" hreflang="x-default" href="https://3pxlogistics.com" />
    <title>{$t.home_title}</title>
    <meta name="description" content={$t.home_description}>
</svelte:head>

<main>
    
    <HeroSection />
    <ServicesSection />
    <HowItWorksSection />
    <FAQSection />

    </main>

<style>
</style>