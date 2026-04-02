<script lang="ts">
	import { Package, Truck, CircleCheck, ArrowRight, Box, Warehouse, PackageCheck, CalendarCheck2 } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { auth } from '../../lib/firebase';
	import { onAuthStateChanged } from 'firebase/auth';
	import { t } from '$lib/langStore';

	let user: any = null;

	let activeTab = 'ecommerce';
	$: tabs = [
		{ id: 'ecommerce', label: 'Ecommerce / FBA' },
		{ id: 'almacen', label: $t.text36_price }
	];

	onMount(() => {
		const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			user = firebaseUser;
		});

		return () => unsubscribe();
	});

	function handleQuoteClick(e: Event) {
		if (!user) {
			window.location.href = '/login';
		} else {
			window.location.href = '/dashboard';
		}
	}

	$: fbaServices = [
		{
			name: $t.label_quote,
			prices: ['1 - 500 und: $0.75', '501 - 1,499 und: $0.65', '1,500+ und: $0.55']
		},
		{
			name: `${$t.label_quote} + Polybag`,
			prices: ['0 - 500 und: $0.90', '501 - 1,500 und: $0.85', '1,501+ und: $0.85']
		},
		{
			name: `${$t.label_quote} + Polybag (2-3 und)`,
			prices: ['0 - 500 und: $1.10', '501 - 1,500 und: $1.05', '1,500+ und: Consultar']
		},
		{
			name: 'Glass Wrapping',
			prices: [
				'1 und: $1.30',
				'Bundle 2-3 und: $1.80/paquete',
				'Bundle 4-6 und: $2.30/paquete',
				'Bundle 12 und: $2.80/paquete'
			]
		}
		// `${$t.env_price}: $1.00`
	];
</script>

<section class="bg-gray-50 py-12 px-6">
	<div class="max-w-6xl mx-auto">
		<div class="text-center mb-16">
			<h1 class="text-4xl md:text-5xl font-extrabold text-secondary mb-4">
				{@html $t.pricing_title}
			</h1>
			<p class="text-gray-600 max-w-2xl mx-auto">
				{$t.pricing_sub}
			</p>
		</div>

		<div class="flex justify-center mb-8">
			<div
				class="inline-flex bg-gray-200/50 p-1.5 rounded-2xl border border-gray-200 backdrop-blur-sm"
			>
				{#each tabs as tab}
					<button
						on:click={() => (activeTab = tab.id)}
						class="px-8 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ease-out
                        {activeTab === tab.id
							? 'bg-white text-primary shadow-md transform scale-[1.02]'
							: 'text-gray-500 hover:text-secondary'}"
					>
						{tab.label}
					</button>
				{/each}
			</div>
		</div>

		{#if activeTab === 'ecommerce'}
			<div in:fade={{ duration: 300 }}>
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
								<h3 class="text-2xl font-bold mb-4">{$t.tarif_price}</h3>

								<p class="mb-8 max-w-md mx-auto">
									{$t.text_price}
								</p>

								<div class="space-y-4 w-full max-w-sm">
									<button
										on:click={handleQuoteClick}
										class="btn-primary w-full flex items-center justify-center gap-2 group"
									>
										{$t.btn_quote}
										<ArrowRight size={20} class="group-hover:translate-x-1 transition-transform" />
									</button>

									<p class="text-[10px] uppercase tracking-widest opacity-60">
										{$t.text2_price}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
					<div class="service-card border-primary/20">
						<div class="flex items-center gap-3 mb-6">
							<Box class="text-primary" size={24} />
							<h3 class="text-xl font-bold text-secondary">{$t.text3_price}</h3>
						</div>
						<div class="grid grid-cols-2 gap-4">
							<div class="bg-gray-50 p-3 rounded-lg text-center">
								<p class="text-xs text-gray-500 uppercase">{$t.text4_price}</p>
								<p class="text-lg font-bold text-secondary">$2</p>
							</div>
							<div class="bg-gray-50 p-3 rounded-lg text-center">
								<p class="text-xs text-gray-500 uppercase">{$t.text5_price}</p>
								<p class="text-lg font-bold text-secondary">$3.50</p>
							</div>

							<div class="bg-gray-50 p-3 rounded-lg text-center">
								<p class="text-xs text-gray-500 uppercase">Pallet</p>
								<p class="text-lg font-bold text-secondary">$12</p>
							</div>
							<div class="bg-gray-50 p-3 rounded-lg text-center border-2 border-primary/30">
								<p class="text-xs text-gray-500 uppercase">{$t.text6_price}</p>
								<p class="text-lg font-bold text-primary">$20</p>
							</div>
						</div>
					</div>

					<div class="service-card border-primary/20 flex flex-col justify-center">
						<div class="flex items-center gap-3 mb-6">
							<Warehouse class="text-primary" size={24} />
							<h3 class="text-xl font-bold text-secondary">{$t.text7_price}</h3>
						</div>
						<div
							class="flex items-center justify-between bg-primary/10 p-6 rounded-xl border border-primary/20"
						>
							<div>
								<p class="text-primary font-bold text-lg">{$t.text8_price}</p>
								<p class="text-gray-600 text-sm italic">{$t.text9_price}</p>
							</div>
							<div class="text-right">
								<p class="text-3xl font-black text-secondary">$55</p>
								<p class="text-xs text-gray-500 uppercase">30 {$t.text10_price} / pallet</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		{:else}
			<div in:fade={{ duration: 300 }} class="space-y-12">
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<div class="service-card border-primary/20">
						<div class="flex items-center gap-3 mb-6">
							<Truck class="text-primary" size={24} />
							<h3 class="text-xl font-bold text-secondary">{$t.text11_price}</h3>
						</div>
						<div class="space-y-4">
							<div class="flex justify-between text-sm border-b border-gray-100 pb-1">
								<span class="text-gray-600">{$t.text12_price} 20ft / 40ft</span>
								<span class="font-bold text-secondary">$400.00</span>
							</div>
							<div class="flex justify-between text-sm border-b border-gray-100 pb-1">
								<span class="text-gray-600">{$t.text12_price} 53ft</span>
								<span class="font-bold text-secondary">$475.00</span>
							</div>
							<p class="text-[10px] text-gray-400 italic mt-2">
								*{$t.text13_price}
							</p>
						</div>
					</div>

					<div class="service-card border-primary/20">
						<div class="flex items-center gap-3 mb-6">
							<Box class="text-primary" size={24} />
							<h3 class="text-xl font-bold text-secondary">{$t.text14_price}</h3>
						</div>
						<div class="space-y-4">
							<div class="flex justify-between text-sm border-b border-gray-100 pb-1">
								<span class="text-gray-600">{$t.text15_price}</span>
								<span class="font-bold text-secondary">$30.00</span>
							</div>
							<div class="flex justify-between text-sm border-b border-gray-100 pb-1">
								<span class="text-gray-600">{$t.text16_price}</span>
								<span class="font-bold text-secondary">$60.00</span>
							</div>
							<p class="text-[10px] text-gray-400 italic mt-2">
								*{$t.text17_price}
							</p>
						</div>
					</div>
				</div>

				<div class="service-card border-primary/20 bg-white">
					<div class="flex items-center gap-3 mb-8">
						<Warehouse class="text-primary" size={24} />
						<h3 class="text-xl font-bold text-secondary">{$t.text18_price}</h3>
					</div>
					<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div
							class="bg-primary/5 p-5 rounded-xl border border-primary/10 relative overflow-hidden"
						>
							<div
								class="absolute top-0 right-0 bg-primary text-white text-[10px] px-3 py-1 rounded-bl-lg font-bold"
							>{$t.text19_price}
							</div>
							<p class="text-xs text-gray-500 uppercase font-bold mb-1">{$t.text20_price}</p>
							<p class="text-2xl font-black text-secondary">
								$55.00 <span class="text-sm font-normal text-gray-500">/{$t.text21_price}</span>
							</p>
							<p class="text-[10px] text-primary font-bold mt-2">{$t.text22_price}</p>
						</div>

						<div class="bg-gray-50 p-5 rounded-xl border border-gray-200">
							<p class="text-xs text-gray-500 uppercase font-bold mb-1">Bin 18x24x48</p>
							<p class="text-2xl font-black text-secondary">
								$10.00 <span class="text-sm font-normal text-gray-500">/{$t.text21_price}</span>
							</p>
							<p class="text-[10px] text-gray-400 mt-2">{$t.text23_price}</p>
						</div>

						<div
							class="bg-gray-50 p-5 rounded-xl border border-gray-200 flex flex-col justify-center"
						>
							<p class="text-xs text-gray-500 uppercase font-bold mb-1">{$t.text24_price}</p>
							<p class="text-lg font-bold text-secondary">{$t.text25_price}</p>
						</div>
					</div>
				</div>						

				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div class="service-card border-primary/20">
						<div class="flex items-center gap-3 mb-6">
							<PackageCheck size={24} class="text-primary" />
							<h3 class="text-xl font-bold text-secondary">{$t.text26_price}</h3>
						</div>
						<div class="space-y-4">
							<div class="flex justify-between text-sm border-b border-gray-100 pb-1">
								<span class="text-gray-600">{$t.text27_price}</span>
								<span class="font-bold text-secondary">$45.00 / pallet</span>
							</div>
							<div class="flex justify-between text-sm border-b border-gray-100 pb-1">
								<span class="text-gray-600">{$t.text28_price}</span>
								<span class="font-bold text-secondary">$20.00 / pallet</span>
							</div>
							<div class="flex justify-between text-sm border-b border-gray-100 pb-1">
								<span class="text-gray-600">{$t.text29_price}</span>
								<span class="font-bold text-secondary">$5.50</span>
							</div>
							<div class="flex justify-between text-sm border-b border-gray-100 pb-1">
								<span class="text-gray-600">{$t.text30_price}</span>
								<span class="font-bold text-secondary">$9.50</span>
							</div>
						</div>
					</div>
					<div class="service-card border-primary/20">
						<div class="flex items-center gap-3 mb-6">
							<CalendarCheck2 size={24} class="text-primary" />
							<h3 class="text-xl font-bold text-secondary">{$t.text31_price}</h3>
						</div>
						<div class="space-y-4">
							<div class="flex justify-between text-sm border-b border-gray-100 pb-1">
								<span class="text-gray-600">{$t.text32_price}</span>
								<span class="font-bold text-secondary">$25.00 / hr</span>
							</div>
							<div class="flex justify-between text-sm border-b border-gray-100 pb-1">
								<span class="text-gray-600">{$t.text33_price}</span>
								<span class="font-bold text-secondary">$100.00</span>
							</div>
							<div class="flex justify-between text-sm border-b border-gray-100 pb-1">
								<span class="text-gray-600">{$t.text34_price}</span>
								<span class="font-bold text-secondary">$250.00</span>
							</div>
							<p class="text-[10px] text-gray-400 italic mt-2">
								*{$t.text35_price}
							</p>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</section>
