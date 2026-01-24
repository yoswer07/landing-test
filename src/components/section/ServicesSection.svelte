<script lang="ts">
	import { SquareCheckBig } from '@lucide/svelte';
	import { Check } from '@lucide/svelte';
</script>

<section id="servicios" class="bg-gray-50 relative z-0 -mt-20 pb-20 pt-12 scroll-mt-56 md:-scroll-mt-4 md:pb-18">
	<div class="container mx-auto px-6 max-w-7xl pt-16">
		<div class="text-center mb-16 max-w-3xl mx-auto">
			<h2 class="text-3xl sm:text-4xl font-extrabold text-secondary mt-2">
				3PL Xpress: Tu Inventario Optimizado, de USA al Mundo.
			</h2>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
			<div class="service-card border-primary">
				<div class="flex items-center mb-4">
					<SquareCheckBig class="w-6 h-6 text-primary mr-3 shrink-0" />
					<h3 class="text-xl font-bold text-secondary">Recepción e Inspección (QC)</h3>
				</div>
				<p class="text-sm text-gray-600 mb-4">
					La tranquilidad comienza aquí. Verificamos que cada unidad cumpla con tus expectativas.
				</p>
				<ul class="space-y-3 text-sm text-gray-700">
					<li class="flex items-start gap-2">
						<Check size={18} class="text-primary shrink-0 mt-0.5" />
						<span>Confirmación de cantidades y estado</span>
					</li>
					<li class="flex items-start gap-2">
						<Check size={18} class="text-primary shrink-0 mt-0.5" />
						<span>Reporte fotográfico y registro en sistema</span>
					</li>
					<li class="flex items-start gap-2">
						<Check size={18} class="text-primary shrink-0 mt-0.5" />
						<span>Verificación de daños y reempaque</span>
					</li>
				</ul>
			</div>

			<div class="service-card border-secondary">
				<div class="flex items-center mb-4">
					<SquareCheckBig class="w-6 h-6 text-secondary mr-3 shrink-0" />
					<h3 class="text-xl font-bold text-secondary">Preparación Estratégica FBA</h3>
				</div>
				<p class="text-sm text-gray-600 mb-4">
					Tu inventario listo para cumplir con las estrictas normativas de Amazon, minimizando
					rechazos.
				</p>
				<ul class="space-y-3 text-sm text-gray-700">
					<li class="flex items-start gap-2">
						<Check size={18} class="text-primary shrink-0 mt-0.5" />
						<span>Stickers FNSKU y Box content</span>
					</li>
					<li class="flex items-start gap-2">
						<Check size={18} class="text-primary shrink-0 mt-0.5" />
						<span>Bundles, Multipacks, Polybags, Fragile Wrap</span>
					</li>
					<li class="flex items-start gap-2">
						<Check size={18} class="text-primary shrink-0 mt-0.5" />
						<span>Paletizado profesional para envíos LTL/FTL</span>
					</li>
				</ul>
			</div>

			<div class="service-card border-primary">
				<div class="flex items-center mb-4">
					<SquareCheckBig class="w-6 h-6 text-primary mr-3 shrink-0" />
					<h3 class="text-xl font-bold text-secondary">Logística FBM & Same-Day</h3>
				</div>
				<p class="text-sm text-gray-600 mb-4">
					Manejamos tus pedidos directos al cliente (FBM, TikTok Shop) con la velocidad que exigen
					las ventas.
				</p>
				<ul class="space-y-3 text-sm text-gray-700">
					<li class="flex items-start gap-2">
						<Check size={18} class="text-primary shrink-0 mt-0.5" />
						<span>Envíos el mismo día (*same-day fulfillment*)</span>
					</li>
					<li class="flex items-start gap-2">
						<Check size={18} class="text-primary shrink-0 mt-0.5" />
						<span>Empaques personalizados y etiquetado</span>
					</li>
					<li class="flex items-start gap-2">
						<Check size={18} class="text-primary shrink-0 mt-0.5" />
						<span>Manejo eficiente de plataformas de envío</span>
					</li>
				</ul>

			</div>

			<div class="service-card border-secondary">
				<div class="flex items-center mb-4">
					<SquareCheckBig class="w-6 h-6 text-secondary mr-3 shrink-0" />
					<h3 class="text-xl font-bold text-secondary">Soporte y Servicios Adicionales</h3>
				</div>
				<p class="text-sm text-gray-600 mb-4">
					Soluciones flexibles para operaciones complejas, siempre con acceso directo a un experto.
				</p>
				<ul class="space-y-3 text-sm text-gray-700">
					<li class="flex items-start gap-2">
						<Check size={18} class="text-primary shrink-0 mt-0.5" />
						<span>Kitting y Creación de Bundles</span>
					</li>
					<li class="flex items-start gap-2">
						<Check size={18} class="text-primary shrink-0 mt-0.5" />
						<span>Gestión de Retornos y Reempaque</span>
					</li>
					<li class="flex items-start gap-2">
						<Check size={18} class="text-primary shrink-0 mt-0.5" />
						<span>Inventarios en tiempo real y Soporte 1:1</span>
					</li>
				</ul>
			</div>
		</div>

		<div class="text-center mt-16">
			<div class="flex items-center justify-center space-x-25">
				<span class="text-xl md:text-4xl font-extrabold text-secondary tracking-tight">
					Entérate De Nuestros Costos
				</span>

				<a href="/precios" class="btn-primary"> Saber más </a>
			</div>
		</div>
	</div>
</section>
