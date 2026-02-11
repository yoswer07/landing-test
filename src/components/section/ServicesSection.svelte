<script lang="ts">
	import { SquareCheckBig } from '@lucide/svelte';
	import { Check } from '@lucide/svelte';
	import { t } from '$lib/langStore';
</script>

<section id="services" class="bg-gray-50 relative z-0 -mt-20 pb-20 pt-12 scroll-mt-76 md:-scroll-mt-4 md:pb-18">
	<div class="container mx-auto px-6 max-w-7xl pt-16">
		<div class="text-center mb-16 max-w-3xl mx-auto">
			<h2 class="text-3xl sm:text-4xl font-extrabold text-secondary mt-2">
				{$t.title_service}
			</h2>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
			<div class="service-card border-primary">
				<div class="flex items-center mb-4">
					<SquareCheckBig class="w-6 h-6 text-primary mr-3 shrink-0" />
					<h3 class="text-xl font-bold text-secondary">{$t.up1_service}</h3>
				</div>
				<p class="text-sm text-gray-600 mb-4">
					{$t.text1_service}
				</p>
				<ul class="space-y-3 text-sm text-gray-700">
					<li class="flex items-start gap-2">
						<Check size={18} class="text-primary shrink-0 mt-0.5" />
						<span>{$t.text2_service}</span>
					</li>
					<li class="flex items-start gap-2">
						<Check size={18} class="text-primary shrink-0 mt-0.5" />
						<span>{$t.text3_service}</span>
					</li>
					<li class="flex items-start gap-2">
						<Check size={18} class="text-primary shrink-0 mt-0.5" />
						<span>{$t.text4_service}</span>
					</li>
				</ul>
			</div>

			<div class="service-card border-secondary">
				<div class="flex items-center mb-4">
					<SquareCheckBig class="w-6 h-6 text-secondary mr-3 shrink-0" />
					<h3 class="text-xl font-bold text-secondary">{$t.up2_service}</h3>
				</div>
				<p class="text-sm text-gray-600 mb-4">
					{$t.text5_service}
				</p>
				<ul class="space-y-3 text-sm text-gray-700">
					<li class="flex items-start gap-2">
						<Check size={18} class="text-primary shrink-0 mt-0.5" />
						<span>{$t.text6_service}</span>
					</li>
					<li class="flex items-start gap-2">
						<Check size={18} class="text-primary shrink-0 mt-0.5" />
						<span>Bundles, Multipacks, Polybags, Fragile Wrap</span>
					</li>
					<li class="flex items-start gap-2">
						<Check size={18} class="text-primary shrink-0 mt-0.5" />
						<span>{$t.text7_service}</span>
					</li>
				</ul>
			</div>

			<div class="service-card border-primary">
				<div class="flex items-center mb-4">
					<SquareCheckBig class="w-6 h-6 text-primary mr-3 shrink-0" />
					<h3 class="text-xl font-bold text-secondary">{$t.up3_service}</h3>
				</div>
				<p class="text-sm text-gray-600 mb-4">
					{$t.text8_service}
				</p>
				<ul class="space-y-3 text-sm text-gray-700">
					<li class="flex items-start gap-2">
						<Check size={18} class="text-primary shrink-0 mt-0.5" />
						<span>{$t.text9_service}</span>
					</li>
					<li class="flex items-start gap-2">
						<Check size={18} class="text-primary shrink-0 mt-0.5" />
						<span>{$t.text10_service}</span>
					</li>
					<li class="flex items-start gap-2">
						<Check size={18} class="text-primary shrink-0 mt-0.5" />
						<span>{$t.text11_service}</span>
					</li>
				</ul>

			</div>

			<div class="service-card border-secondary">
				<div class="flex items-center mb-4">
					<SquareCheckBig class="w-6 h-6 text-secondary mr-3 shrink-0" />
					<h3 class="text-xl font-bold text-secondary">{$t.up4_service}</h3>
				</div>
				<p class="text-sm text-gray-600 mb-4">
					{$t.text12_service}
				</p>
				<ul class="space-y-3 text-sm text-gray-700">
					<li class="flex items-start gap-2">
						<Check size={18} class="text-primary shrink-0 mt-0.5" />
						<span>{$t.text13_service}</span>
					</li>
					<li class="flex items-start gap-2">
						<Check size={18} class="text-primary shrink-0 mt-0.5" />
						<span>{$t.text14_service}</span>
					</li>
					<li class="flex items-start gap-2">
						<Check size={18} class="text-primary shrink-0 mt-0.5" />
						<span>{$t.text15_service}</span>
					</li>
				</ul>
			</div>
		</div>

		<div class="text-center mt-16">
			<div class="flex items-center justify-center space-x-25">
				<span class="text-xl md:text-4xl font-extrabold text-secondary tracking-tight">
					{$t.hear_service}
				</span>

				<a href="/precios" class="btn-primary"> {$t.btn_service} </a>
			</div>
		</div>
	</div>
</section>
