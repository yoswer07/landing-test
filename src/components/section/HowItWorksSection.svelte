<script lang="ts">
    // Íconos para dar un toque visual
    import { Zap, Package, Truck, FileText } from '@lucide/svelte';
    
    // Lista de pasos con los íconos
    const quoteSteps = [
        { 
            icon: Zap, 
            title: '1. Define tu Inventario', 
            description: 'Indica el tipo de producto (ej. electrónicos, ropa) y la cantidad aproximada por mes para que podamos evaluar tu volumen operativo.',
            details: 'Tipo de producto | Cantidad mensual'
        },
        { 
            icon: Package, 
            title: '2. Especifica los Servicios', 
            description: 'Dinos exactamente qué necesitas: FBA, FBM, TikTok Shop, bundles, almacenamiento, paletizado u otros servicios adicionales.',
            details: 'Servicios requeridos'
        },
        { 
            icon: Truck, 
            title: '3. Detalles y Prioridad de Envío', 
            description: 'Proporciona el tamaño y peso promedio de los productos. Indícanos si requieres envío same-day o el estándar.',
            details: 'Tamaño, Peso, Prioridad de envío'
        },
        { 
            icon: FileText, 
            title: '4. Recibe tu Cotización Clara', 
            description: 'Te enviaremos una propuesta transparente que incluye precio por unidad, tarifas por servicios adicionales, y tiempos de procesamiento.',
            details: 'Cotización Clara y Tiempos'
        }
    ];
</script>

<section id="como-funciona" class="py-20 scroll-mt-64 md:-scroll-mt-4 md:pt-30 bg-linear-to-b from-gray-50 to-white">
    <div class="container mx-auto px-6 max-w-7xl">
        
        <div class="text-center mb-16 max-w-3xl mx-auto">
            <h2 class="text-3xl sm:text-4xl font-extrabold text-secondary mt-2">
                Obtén tu Cotización y Activa tu Operación 3PL Xpress
            </h2>
            <p class="mt-4 text-gray-600 text-lg">
                Cotizar tus servicios es el primer paso para delegar la logística y centrarte únicamente en las ventas. Sigue estos pasos:
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