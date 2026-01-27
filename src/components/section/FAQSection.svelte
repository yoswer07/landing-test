<script lang="ts">
	import { t } from '$lib/langStore';
	let activeIndex: number | null = null;

	function toggleAccordion(index: number) {
		activeIndex = activeIndex === index ? null : index;
	}

	$: faqs = [
		{
			q:  $t.q1_faq,
			a: 	$t.r1_faq
		},
		{
			q:  $t.q2_faq,
			a: 	$t.r2_faq
		},
		{
			q:  $t.q3_faq,
			a: 	$t.r3_faq
		},
		{
			q:  $t.q4_faq,
			a: 	$t.r4_faq
		},
		{
			q:  $t.q5_faq,
			a: 	$t.r5_faq
		},
		{
			q:  $t.q6_faq,
			a: 	$t.r6_faq
		}
	];
</script>

<section id="faq" class="scroll-mt-68 md:-scroll-mt-4 py-18 md:pt-28 bg-linear-to-b from-white to-gray-50">
	<div class="container mx-auto px-6 max-w-4xl">
		<div class="text-center mb-12">
			<h2 class="text-3xl sm:text-4xl font-extrabold text-secondary mt-2">{$t.title_faq}</h2>
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
