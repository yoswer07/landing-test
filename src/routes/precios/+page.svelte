<script lang="ts">
	import { Package, Truck, Box, Warehouse, Info, CircleCheck, ArrowRight } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { auth } from '../../lib/firebase';
	import { onAuthStateChanged } from 'firebase/auth';

	let user: any = null;

	onMount(() => {
		// Escuchar el estado del usuario para saber si está logueado
		const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			user = firebaseUser;
		});

		return () => unsubscribe(); // Limpiar el listener al destruir el componente
	});

	function handleQuoteClick(e: Event) {
		if (!user) {
			// Si no hay usuario, redirigir al login
			window.location.href = '/login';
		} else {
			// Si hay usuario, ir al dashboard
			window.location.href = '/dashboard';
		}
	}

	const fbaServices = [
		{
			name: 'Labeling (Etiquetado)',
			prices: ['0 a 1,000 und: $0.75', '1,001 a 3,000 und: $0.65']
		},
		{
			name: 'Labeling + Polybag',
			prices: ['0 a 1,000 und: $1.00', '1,001 a 3,000 und: $0.90', '3,000+ und: $0.85']
		},
		{
			name: 'Labeling + Polybag (2-3 und)',
			prices: ['0 a 1,000 und: $1.25', '1,001 a 3,000 und: $1.20', '3,000+ und: $1.10']
		},
		{
			name: 'Glass Wrapping',
			prices: ['Sobre: $1.00', '1 und: $1.30', 'Bundle 2-3 und: $1.80', 'Bundle 4-6 und: $2.30', 'Bundle 12 und: $2.80']
		}
	];
</script>

<section class="bg-gray-50 py-16 px-6">
	<div class="max-w-6xl mx-auto">
		<div class="text-center mb-16">
			<h1 class="text-4xl md:text-5xl font-extrabold text-secondary mb-4">
				Tarifas <span class="text-primary">Transparentes</span>
			</h1>
			<p class="text-gray-600 max-w-2xl mx-auto">
				Soluciones logísticas adaptadas al volumen de tu negocio. Sin letras chiquitas.
			</p>
		</div>

		<div class="flex flex-col gap-12">
			<div class="lg:col-span-2 space-y-6">
				<div class="flex items-center gap-3 mb-2">
					<Package class="text-primary" size={28} />
					<h2 class="text-2xl font-bold text-secondary">FBA (Amazon Fulfillment)</h2>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					{#each fbaServices as service}
						<div class="service-card border-primary/20">
							<h3 class="font-bold text-secondary mb-4 flex items-center gap-2">
								<CircleCheck size={18} class="text-primary" />
								{service.name}
							</h3>
							<ul class="space-y-2">
								{#each service.prices as price}
									<li class="flex justify-between text-sm border-b border-gray-100 pb-1">
										<span class="text-gray-600">{price.split(':')[0]}</span>
										<span class="font-bold text-secondary">{price.split(':')[1]}</span>
									</li>
								{/each}
							</ul>
						</div>
					{/each}
				</div>
			</div>

			<div class="space-y-6">
				<div class="flex items-center gap-3 mb-2">
					<Truck class="text-primary" size={28} />
					<h2 class="text-2xl font-bold text-secondary">FBM (Multichannel)</h2>
				</div>

				<div
					class="service-card text-gray-600 border-primary/20 p-8 md:p-12 shadow-xl relative overflow-hidden"
				>
					<div class="absolute top-0 right-0 opacity-10 -mr-8 -mt-8">
						<Truck size={160} />
					</div>

					<div class="relative z-10 text-center flex flex-col items-center">
						<h3 class="text-2xl font-bold mb-4">Tarifas Personalizadas</h3>

						<p class="mb-8 max-w-md mx-auto">
							Ofrecemos soluciones de despacho multicanal adaptadas al volumen real y necesidades
							específicas de tu operación.
						</p>

						<div class="space-y-4 w-full max-w-sm">
							<button
								on:click={handleQuoteClick}
								class="btn-primary w-full flex items-center justify-center gap-2 group"
							>
								SOLICITAR COTIZACIÓN FBM
								<ArrowRight size={20} class="group-hover:translate-x-1 transition-transform" />
							</button>

							<p class="text-[10px] uppercase tracking-widest opacity-60">
								Respuesta inmediata por nuestro equipo comercial
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div class="service-card border-primary/20">
                <div class="flex items-center gap-3 mb-6">
                    <Box class="text-primary" size={24} />
                    <h3 class="text-xl font-bold text-secondary">Suministros (Cajas)</h3>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div class="bg-gray-50 p-3 rounded-lg text-center">
                        <p class="text-xs text-gray-500 uppercase">Pequeña</p>
                        <p class="text-lg font-bold text-secondary">$1.60</p>
                    </div>
                    <div class="bg-gray-50 p-3 rounded-lg text-center">
                        <p class="text-xs text-gray-500 uppercase">Mediana</p>
                        <p class="text-lg font-bold text-secondary">$2.30</p>
                    </div>
                    <div class="bg-gray-50 p-3 rounded-lg text-center">
                        <p class="text-xs text-gray-500 uppercase">Pallet</p>
                        <p class="text-lg font-bold text-secondary">$12</p>
                    </div>
                    <div class="bg-gray-50 p-3 rounded-lg text-center border-2 border-primary/30">
                        <p class="text-xs text-gray-500 uppercase">Palletización</p>
                        <p class="text-lg font-bold text-primary">$22</p>
                    </div>
                </div>
            </div>

            <div class="service-card border-primary/20 flex flex-col justify-center">
                <div class="flex items-center gap-3 mb-6">
                    <Warehouse class="text-primary" size={24} />
                    <h3 class="text-xl font-bold text-secondary">Almacenamiento</h3>
                </div>
                <div class="flex items-center justify-between bg-primary/10 p-6 rounded-xl border border-primary/20">
                    <div>
                        <p class="text-primary font-bold text-lg">1ra Semana GRATIS</p>
                        <p class="text-gray-600 text-sm italic">Prueba nuestro sistema sin compromiso</p>
                    </div>
                    <div class="text-right">
                        <p class="text-3xl font-black text-secondary">$55</p>
                        <p class="text-xs text-gray-500 uppercase">30 días / pallet</p>
                    </div>
                </div>
            </div>
        </div> -->
	</div>
</section>
