<script lang="ts">
    import { Zap, Package, Truck, FileText } from '@lucide/svelte';
    import { t } from '$lib/langStore';
    
    $: quoteSteps = [
        { 
            icon: Zap, 
            title: $t.title1_hiw, 
            description: $t.text1_hiw,
        },
        { 
            icon: Package, 
            title: $t.title2_hiw, 
            description: $t.text2_hiw,
        },
        { 
            icon: Truck, 
            title: $t.title3_hiw, 
            description: $t.text3_hiw,
        },
        { 
            icon: FileText, 
            title: $t.title4_hiw, 
            description: $t.text4_hiw,
        }
    ];
</script>

<section id="how-it-works" class="py-20 scroll-mt-86 md:scroll-mt-2 md:pt-30 bg-linear-to-b from-gray-50 to-white">
    <div class="container mx-auto px-6 max-w-7xl">
        
        <div class="text-center mb-16 max-w-3xl mx-auto">
            <h2 class="text-3xl sm:text-4xl font-extrabold text-secondary mt-2">
                {$t.paraq_hiw}
            </h2>
            <p class="mt-4 text-gray-600 text-lg">
                {$t.texting_hiw}
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {#each quoteSteps as step}
                <div class="hiw-card">
                    
                    <svelte:component this={step.icon} class="w-10 h-10 text-primary mb-4"/>
                    
                    <h3 class="text-xl font-bold text-secondary mb-2">{step.title}</h3>
                    
                    <p class="text-sm text-gray-600">{step.description}</p>
                </div>
            {/each}
        </div>
    </div>
</section>