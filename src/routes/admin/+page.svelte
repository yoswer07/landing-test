<script lang="ts">
	import { onMount } from 'svelte';
	import { auth, db } from '../../lib/firebase';
	import { collection, getDocs, deleteDoc, doc, getDoc, query, orderBy } from 'firebase/firestore';
	import { onAuthStateChanged, signOut } from 'firebase/auth';
	import { showNotify } from '$lib/toastStore';
	import { t } from '$lib/langStore';

	let user: any = null;
	let loading = true;
	let quotes: any[] = [];
	let searchQuery = '';

	let currentPage = 1;
	let itemsPerPage = 10;

	$: filteredQuotes = quotes.filter((q) => {
		const fullName = `${q.firstName} ${q.lastName}`.toLowerCase();
		return fullName.includes(searchQuery.toLowerCase());
	});

	$: totalPages = Math.ceil(filteredQuotes.length / itemsPerPage);

	$: paginatedQuotes = filteredQuotes.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	$: if (searchQuery) currentPage = 1;

	onMount(() => {
		const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
			if (firebaseUser) {
				user = firebaseUser;
				await checkAdminStatus(user.uid);
			} else {
				window.location.href = '/login';
			}
		});
		return () => unsubscribe();
	});

	async function checkAdminStatus(uid: string) {
		try {
			const docRef = doc(db, 'users', uid);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists() && docSnap.data().isAdmin === true) {
				await fetchQuotes();
			} else {
				$t.admin_accesno;
				showNotify($t.admin_accesno, 'error');
				window.location.href = '/dashboard';
			}
		} catch (e) {
			window.location.href = '/dashboard';
		}
	}

	async function fetchQuotes() {
		try {
			const q = query(collection(db, 'quotes'), orderBy('createdAt', 'desc'));
			const querySnapshot = await getDocs(q);

			quotes = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
				createdAt: doc.data().createdAt?.toDate()
			}));
		} catch (e) {
			showNotify($t.admin_noquote, 'error');
		} finally {
			loading = false;
		}
	}

	async function handleDelete(id: string) {
		if (!confirm($t.admin_delete)) return;

		try {
			await deleteDoc(doc(db, 'quotes', id));
			quotes = quotes.filter((q) => q.id !== id);
			showNotify($t.admin_deleteconfirm, 'success');
		} catch (e) {
			showNotify($t.admin_errordelete, 'error');
		}
	}

	const handleLogout = async () => {
		await signOut(auth);
		window.location.href = '/';
	};

	const formatDate = (date: any) => {
		if (!date) return '-';
		return new Intl.DateTimeFormat('es-ES', {
			day: '2-digit',
			month: 'short',
			hour: '2-digit',
			minute: '2-digit'
		}).format(date);
	};
</script>

<div class="aside_field">
	<aside class="aside_field_colors">
		<div class="p-6 text-xl font-bold border-b border-gray-700 flex items-center gap-2">
			Panel Admin
		</div>

		<nav class="flex md:flex-col p-2 md:p-0">
			<button class="aside-button bg-primary text-white font-bold w-full">
				{$t.admin_button}
			</button>

			<button on:click={handleLogout} class="close_session_button">
				{$t.close_dash}
			</button>
		</nav>
	</aside>

	<main class="flex-1 p-4 md:p-8 h-screen overflow-y-auto">
		{#if loading}
			<div class="flex flex-col items-center justify-center h-full">
				<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
				<p class="mt-4 text-gray-600">{$t.admin_loading}</p>
			</div>
		{:else}
			<div class="max-w-7xl mx-auto">
				<header class="mb-8 flex justify-between items-center">
					<div>
						<h1 class="text-3xl font-bold text-gray-800">{$t.admin_recent}</h1>
						<p class="text-gray-500">Total: {quotes.length} {$t.admin_main}</p>
					</div>
					<div class="relative w-full md:w-96 ml-2">
						<input
							type="text"
							bind:value={searchQuery}
							placeholder={$t.admin_placeholder}
							class="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
						/>
					</div>
					<button on:click={fetchQuotes} class="btn-secondary text-sm px-4 py-2 ml-4">
						{$t.admin_refresh}
					</button>
				</header>

				<div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
					<div class="overflow-x-auto">
						<table class="w-full text-left text-sm text-gray-600">
							<thead class="bg-gray-50 text-gray-800 uppercase font-bold text-xs">
								<tr>
									<th class="px-6 py-4">{$t.admin_panel}</th> <th class="px-6 py-4">{$t.admin_panel4}</th>
									<th class="px-6 py-4">{$t.admin_panel5}</th>
									<th class="px-6 py-4">{$t.admin_panel6}</th>
									<th class="px-6 py-4 text-right">{$t.admin_panel7}</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-gray-100">
								{#each paginatedQuotes as quote (quote.id)}
									<tr class="hover:bg-gray-50 transition-colors">
										<td class="px-6 py-4 whitespace-nowrap">
											{formatDate(quote.createdAt)}
										</td>
										<td class="px-6 py-4">
											<div class="font-bold text-gray-900">{quote.firstName} {quote.lastName}</div>
											<div class="text-xs text-gray-400">ID: {quote.id.slice(0, 6)}...</div>
										</td>
										<td class="px-6 py-4">
											<div class="flex flex-col">
												<a href="mailto:{quote.email}" class="text-blue-600 hover:underline"
													>{quote.email}</a
												>
												<span class="text-xs">{quote.phone}</span>
											</div>
										</td>
										<td class="px-6 py-4">
											<span
												class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-1"
											>
												{quote.productType}
											</span>
											<div class="text-xs text-gray-500">
												{$t.admin_panel3}
												{quote.monthlyQuantity} | {$t.admin_panel2}
												{quote.avgWeight}lb
											</div>
										</td>
										<td class="px-6 py-4 text-right whitespace-nowrap">
											<button
												on:click={() => handleDelete(quote.id)}
												class="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded transition-colors font-medium"
												title="Delete"
											>
												{$t.admin_btndelete}
											</button>
										</td>
									</tr>
								{:else}
									<tr>
										<td colspan="5" class="px-6 py-12 text-center text-gray-400">
											{$t.admin_noquotespanel}
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
						{#if totalPages > 1}
							<div
								class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between"
							>
								<span class="text-xs text-gray-500">
									{$t.admin_page}
									{currentPage}
									{$t.admin_page2}
									{totalPages} ({filteredQuotes.length}
									{$t.admin_page3})
								</span>
								<div class="flex gap-2">
									<button
										class="px-3 py-1 bg-white border rounded text-xs disabled:opacity-50"
										on:click={() => currentPage--}
										disabled={currentPage === 1}>{$t.admin_page4}</button
									>
									<button
										class="px-3 py-1 bg-white border rounded text-xs disabled:opacity-50"
										on:click={() => currentPage++}
										disabled={currentPage === totalPages}>{$t.admin_page5}</button
									>
								</div>
							</div>
						{/if}
					</div>
				</div>
			</div>
		{/if}
	</main>
	<button on:click={handleLogout} class="md:hidden bg-red-600 text-white py-3 font-bold">
		{$t.close_dash}
	</button>
</div>
