<script lang="ts">
	import hero from '$lib/assets/hero-img.webp';
	import { onMount } from 'svelte';
	import { auth } from '../../lib/firebase';
	import { onAuthStateChanged } from 'firebase/auth';
	import { t } from '$lib/langStore';

	let user: any = null;

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
</script>

<section
	class="relatite text-white bg-section-main pt-10 pb-16 lg:pt-12 lg:pb-20 overflow-hidden min-h-fit lg:min-h-[60vh] flex items-center"
>
	<div class="container mx-auto px-6 max-w-6xl relative z-10">
		<div class="flex flex-col lg:flex-row items-center justify-between gap-12">
			<div class="lg:w-1/2 text-center lg:text-left space-y-6">
				<h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
					<span class="text-white">{$t.scale_hero} <br />E-commerce </span>
					<br /><span class="text-primary">{$t.stress_hero}</span>
				</h1>

				<p class="text-xl sm:text-2xl opacity-90 max-w-lg mx-auto lg:mx-0">
					{$t.text_hero}
				</p>

				<button on:click={handleQuoteClick} class="btn-primary inline-block text-lg">
					{$t.btn_hero}
				</button>
			</div>

			<div class="lg:w-1/2 hidden md:flex md:w-[80%] mt-10 lg:mt-0 justify-center items-center">
				<div
					class="rounded-xl overflow-hidden h-72 md:h-96 flex items-center justify-center"
				>
					<span class="md:flex">
						<enhanced:img
							src={hero}
							alt="Source"
							class="max-w-full h-auto rounded-lg opacity-90"
						/>
					</span>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.bg-section-main {
		background-color: #25657e;

		background-image: linear-gradient(to bottom, #25657e, #3497bf);

		clip-path: polygon(
			0% 0%,
			100% 0%,
			100% 90%,
			50% 100%,
			0% 90%
		);

		min-height: 400px;
		width: 100%;
		position: relative;
		z-index: 10;
	}
	@media (min-width: 1024px) {
        .bg-section-main {
            min-height: 450px;
        }
    }
</style>
