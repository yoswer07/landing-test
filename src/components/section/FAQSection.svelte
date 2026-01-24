<script lang="ts">
	// Necesitas una forma de manejar el estado abierto/cerrado del acordeón
	let activeIndex: number | null = null;

	// Función para alternar el acordeón
	function toggleAccordion(index: number) {
		activeIndex = activeIndex === index ? null : index;
	}

	// Datos de las FAQs basadas en el copy
	const faqs = [
		{
			q: '¿Qué tan rápidos son sus procesos de preparación (prep) y envío?',
			a: 'Trabajamos con tiempos de procesamiento muy rápidos, generalmente entre 24 y 48 horas después de la recepción, ideales para vendedores que necesitan flujo constante de inventario.'
		},
		{
			q: '¿Qué marketplaces cubren sus servicios de logística?',
			a: 'Nos especializamos en vendedores de Amazon FBA, TikTok Shop y Walmart, además de brindar logística fulfillment (FBM) para cualquier plataforma de e-commerce.'
		},
		{
			q: '¿Sus precios incluyen tarifas ocultas?',
			a: 'No, nuestros precios son claros y transparentes. Siempre sabrás cuánto cuesta cada unidad o servicio adicional antes de empezar la operación, sin sorpresas.'
		},
		{
			q: '¿Cómo puedo solicitar una cotización exacta?',
			a: 'Solo necesitamos información clave como el tipo y volumen mensual de tu producto, los servicios requeridos, el tamaño/peso promedio y la prioridad de envío (same-day o estándar). Te enviaremos una propuesta clara con el precio por unidad.'
		},
		{
			q: '¿Qué métodos de pago aceptan?',
			a: 'Aceptamos Zelle, PayPal, tarjeta de débito o crédito, y transferencias bancarias (EE. UU.). También ofrecemos facturación mensual para clientes recurrentes.'
		},
		{
			q: '¿Cómo es la comunicación con el equipo de 3PL Xpress?',
			a: 'Ofrecemos Comunicación Directa. No trabajamos con bots ni correos sin responder. Tendrás un canal directo 1:1 con nuestro equipo para soporte en tiempo real.'
		}
	];
</script>

<section id="faq" class="scroll-mt-68 md:-scroll-mt-4 py-18 md:pt-28 bg-linear-to-b from-white to-gray-50">
	<div class="container mx-auto px-6 max-w-4xl">
		<div class="text-center mb-12">
			<h2 class="text-3xl sm:text-4xl font-extrabold text-secondary mt-2">Preguntas Frecuentes</h2>
		</div>

		<div class="space-y-4">
			{#each faqs as faq, index}
				<div class="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
					<button
						class="flex justify-between items-center w-full p-5 text-left text-lg font-medium text-secondary bg-gray-50 hover:bg-gray-100 transition duration-150"
						on:click={() => toggleAccordion(index)}
						aria-expanded={activeIndex === index}
					>
						<span>{faq.q}</span>
						<svg
							class="w-6 h-6 transform transition-transform duration-300"
							class:rotate-180={activeIndex === index}
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 9l-7 7-7-7"
							></path>
						</svg>
					</button>

					{#if activeIndex === index}
						<div class="p-5 text-gray-700 bg-white border-t border-gray-200">
							{faq.a}
						</div>
					{/if}
				</div>
			{/each}
		</div>

		<!-- <div class="text-center mt-12">
            <p class="text-gray-700">¿No encuentras tu pregunta? Contáctanos directamente.</p>
            <a href="#contacto" class="btn-primary">
                Contactar a Soporte
            </a>
        </div> -->
	</div>
</section>
