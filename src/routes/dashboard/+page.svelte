<script lang="ts">
	import { onMount } from 'svelte';
	import { auth, db } from '../../lib/firebase';
	import { doc, getDoc, updateDoc, addDoc, collection } from 'firebase/firestore';
	import { onAuthStateChanged, signOut } from 'firebase/auth';
	import { updatePassword } from 'firebase/auth';
	import { showNotify } from '$lib/toastStore';

	// Importación centralizada desde $lib
	import { Profile, Settings, QuoteForm } from '$lib';

	let user: any = null;
	let userData: any = {};
	let loading = true;
	let activeTab = 'perfil';

	let formInfo = {
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		newPassword: '',
		confirmPassword: '',
		productType: '',
		monthlyQuantity: '1-50',
		services: [] as String[],
		avgWeight: '',
		avgSize: '',
		shippingType: 'Standard'
	};

	onMount(() => {
		onAuthStateChanged(auth, async (firebaseUser) => {
			if (firebaseUser) {
				user = firebaseUser;
				const docRef = doc(db, 'users', user.uid);
				const docSnap = await getDoc(docRef);

				if (docSnap.exists()) {
					userData = docSnap.data();
					formInfo = {
						...formInfo,
						...userData,
						email: user.email
					};
				}
				loading = false;
			} else {
				window.location.href = '/login';
			}
		});
	});

	async function handleUpdate() {
		try {
			const userRef = doc(db, 'users', user.uid);

			await updateDoc(userRef, {
				firstName: formInfo.firstName,
				lastName: formInfo.lastName,
				phone: formInfo.phone
			});

			if (formInfo.newPassword) {
				if (formInfo.newPassword === formInfo.confirmPassword) {
					await updatePassword(user, formInfo.newPassword);
					formInfo.newPassword = '';
					formInfo.confirmPassword = '';
				} else {
					showNotify('Las contraseñas no coinciden', 'error');
					return;
				}
			}

			userData = { ...formInfo };
			activeTab = 'perfil';
			showNotify('Información actualizada correctamente', 'success');
		} catch (e: any) {
			console.error(e);
			if (e.code === 'auth/requires-recent-login') {
				showNotify('Debe haber iniciado sesión recientemente para cambiar la contraseña.', 'error');
			} else {
				showNotify('Error al actualizar los datos.', 'error');
			}
		}
	}

	async function submitQuote() {
		const GOOGLE_SCRIPT_URL =
			import.meta.env.VITE_GOOGLE_SCRIPT_URL;

		try {
			await addDoc(collection(db, 'quotes'), { ...formInfo, createdAt: new Date() });

			const response = await fetch(GOOGLE_SCRIPT_URL, {
				method: 'POST',
				mode: 'no-cors',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formInfo)
			});

			sendWhatsApp(formatQuoteMessage());

			activeTab = 'perfil';

			showNotify('Cotización enviada', 'success');
		} catch (e) {
			console.error(e);
			showNotify('Error al conectar', 'error');
		}
	}

	const handleLogout = async () => {
		await signOut(auth);
		window.location.href = '/';
	};

	function formatQuoteMessage() {
		return `
        *Nueva Cotización de Envío* 
        --------------------------------
        *Cliente:* ${formInfo.firstName} ${formInfo.lastName}
        *Correo:* ${formInfo.email}
        *Teléfono:* ${formInfo.phone}

        *Detalles del Producto:*
        - Tipo: ${formInfo.productType}
        - Cantidad mensual: ${formInfo.monthlyQuantity}
        - Peso prom: ${formInfo.avgWeight} lb
        - Tamaño prom: ${formInfo.avgSize} in

        *Servicios:* ${formInfo.services.join(', ')}
        *Tipo de Envío:* ${formInfo.shippingType}
            `.trim();
	}

	function sendWhatsApp(message: string) {
		const phone = import.meta.env.VITE_WHATSAPP_NUMBER;
		const encodedMessage = encodeURIComponent(message);
		const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

		window.location.href = whatsappUrl;
	}
</script>

<div class="min-h-screen bg-gray-100 flex flex-col md:flex-row">
	<aside class="w-full md:w-58 bg-secondary/98 text-white shrink-0 shadow-xl">
		<div class="p-6 text-xl font-bold border-b border-gray-700 hidden md:block">Mi Panel</div>

		<nav class="flex md:flex-col p-2 md:p-0 overflow-x-auto md:overflow-x-visible">
			<button
				on:click={() => (activeTab = 'perfil')}
				class="aside-button {activeTab === 'perfil'
					? 'bg-primary text-white font-bold'
					: 'hover:bg-white/10'}">Mi Perfil</button
			>
			<button
				on:click={() => (activeTab = 'formulario')}
				class="aside-button {activeTab === 'formulario'
					? 'bg-primary text-white font-bold'
					: 'hover:bg-white/10'}"
			>
				Registrar Cotización
			</button>
			<button
				on:click={() => (activeTab = 'editar')}
				class="aside-button {activeTab === 'editar'
					? 'bg-primary text-white font-bold'
					: 'hover:bg-white/10'}"
			>
				Ajustes
			</button>

			<button
				on:click={handleLogout}
				class="cursor-pointer hidden md:block w-full text-left px-6 py-3 mt-auto text-red-400 hover:bg-red-500/10 border-t border-gray-700"
			>
				Cerrar Sesión
			</button>
		</nav>
	</aside>

	<main class="flex-1 p-4 md:p-8 h-screen overflow-y-auto">
		{#if loading}
			<div class="flex flex-col items-center justify-center h-full">
				<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
				<p class="mt-4 text-gray-600 font-medium">Cargando tu panel...</p>
			</div>
		{:else}
			<div class="max-w-4xl mx-auto pb-20">
				{#if activeTab === 'perfil'}
					<Profile {userData} email={user.email} />
				{:else if activeTab === 'editar'}
					<Settings bind:formInfo onUpdate={handleUpdate} />
				{:else if activeTab === 'formulario'}
					<QuoteForm bind:formInfo onSubmit={submitQuote} />
				{/if}
			</div>
		{/if}
	</main>

	<button on:click={handleLogout} class="md:hidden bg-red-600 text-white py-3 font-bold">
		Cerrar Sesión
	</button>
</div>
