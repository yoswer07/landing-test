<script lang="ts">
	export let userData: any;
	export let email: string;
	import { CalendarDays, ArrowRight } from '@lucide/svelte';
	const contactEmail = import.meta.env.VITE_SUPPORT_EMAIL;
	import { t } from '$lib/langStore';
</script>

<div class="bg-white rounded-xl shadow-md p-8 text-center">
	<div class="relative w-32 h-32 mx-auto mb-4">
		<img
			src={'https://ui-avatars.com/api/?name=' + (userData.firstName || userData.lastName)}
			alt="Avatar"
			class="rounded-full w-full h-full border-4 border-primary object-cover"
		/>
	</div>
	<h1 class="text-2xl font-bold text-secondary">
		{userData.firstName || ''}
		{userData.lastName || $t.user_name}
	</h1>
	<p class="text-gray-500">{email}</p>
	<div class="mt-4 text-sm text-gray-400">Tel: {userData.phone || $t.profile_tel}</div>
</div>
<div
	class="mt-12 p-6 bg-linear-to-r from-gray-50 to-white border border-gray-200 rounded-2xl shadow-sm"
>
	<div class="flex flex-col sm:flex-row items-center justify-between gap-6">
		<div class="flex items-center gap-4 text-center sm:text-left">
			<div
				class="hidden sm:flex w-12 h-12 bg-primary/10 rounded-full items-center justify-center text-primary"
			>
				<CalendarDays size={24} />
			</div>

			<div>
				<h4 class="text-lg font-bold text-secondary">{$t.text_date}</h4>
				<p class="text-gray-500 text-sm">{$t.text_date2}</p>
			</div>
		</div>

		<a
			href="mailto:{contactEmail}"
			target="_blank"
			class="btn-secondary flex items-center justify-center gap-2 group"
		>
			{$t.contact_us}
			<ArrowRight size={18} class="group-hover:translate-x-1 transition-transform" />
		</a>
	</div>
</div>
