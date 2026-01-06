<script lang="ts">
	import { showNotify } from '$lib/toastStore';
	import { onMount } from 'svelte';

	let auth: any;
	let db: any;
	let signInWithEmailAndPassword: any;
	let createUserWithEmailAndPassword: any;
	let doc: any;
	let setDoc: any;
	let getDoc: any;

	let email = '';
	let password = '';
	let isRegistering = false;
	let errorMessage = '';

	let isLoading = false;

	onMount(async () => {
		const firebaseModule = await import('../../lib/firebase');
		const authModule = await import('firebase/auth');
		const firestoreModule = await import('firebase/firestore');

		auth = firebaseModule.auth;
		db = firebaseModule.db;

		signInWithEmailAndPassword = authModule.signInWithEmailAndPassword;
		createUserWithEmailAndPassword = authModule.createUserWithEmailAndPassword;

		doc = firestoreModule.doc;
		setDoc = firestoreModule.setDoc;
		getDoc = firestoreModule.getDoc;
	});

	function toggleAuthMode() {
		isRegistering = !isRegistering;
		email = '';
		password = '';
		errorMessage = '';
	}

	async function saveUserToFirestore(user: any) {
		if (!db || !doc) return;

		const userRef = doc(db, 'users', user.uid);
		const userSnap = await getDoc(userRef);

		if (!userSnap.exists()) {
			await setDoc(userRef, {
				email: user.email,
				uid: user.uid,
				firstName: '', // Campo vacío inicial
				lastName: '', // Campo vacío inicial
				phone: '', // Campo vacío inicial
				createdAt: new Date(),
				role: 'client'
			});
		}
	}

	const handleEmailAuth = async () => {
		if (!auth || isLoading) return;
		isLoading = true;
		errorMessage = '';

		try {
			if (isRegistering) {
				const res = await createUserWithEmailAndPassword(auth, email, password);
				await saveUserToFirestore(res.user);
				showNotify('¡Cuenta creada con éxito!', 'success');
			} else {
				await signInWithEmailAndPassword(auth, email, password);
				showNotify('¡Bienvenido de nuevo!', 'success');
			}
			setTimeout(() => {
				window.location.href = '/dashboard';
			}, 1000);
		} catch (e: any) {
			console.error(e);
			if (e.code === 'auth/email-already-in-use') {
				errorMessage = 'Este correo ya está registrado.';
			} else if (
				e.code === 'auth/invalid-credential' ||
				e.code === 'auth/wrong-password' ||
				e.code === 'auth/user-not-found'
			) {
				errorMessage = 'Correo o contraseña incorrectos.';
			} else if (e.code === 'auth/invalid-email') {
				errorMessage = 'El formato del correo no es válido.';
			} else if (e.code === 'auth/weak-password') {
				errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
			} else {
				errorMessage = 'Ocurrió un error inesperado.';
			}
			showNotify(errorMessage, 'error');
			isLoading = false;
		}
	};
</script>

<div class="min-h-[70vh] flex items-center justify-center bg-gray-50 py-12 px-4">
	<div
		class="max-w-md w-full space-y-8 p-10 service-card border-primary"
	>
		<div class="text-center">
			<h2 class="text-3xl font-extrabold text-secondary">
				{isRegistering ? 'Crea tu cuenta' : 'Accede a tu cuenta'}
			</h2>
			<p class="mt-2 text-sm text-gray-600">
				{isRegistering ? 'Únete a 3PX Logistics' : 'Ingresa a tu panel de control'}
			</p>
		</div>

		<form class="mt-8 space-y-6" on:submit|preventDefault={handleEmailAuth}>
			<div class="rounded-md shadow-sm space-y-4">
				<input
					type="email"
					bind:value={email}
					disabled={isLoading}
					required
					placeholder="Correo electrónico"
					class="login-field"
				/>

				<input
					type="password"
					bind:value={password}
					disabled={isLoading}
					required
					placeholder="Contraseña"
					class="login-field"
				/>
			</div>

			<button
				type="submit"
				class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-secondary hover:bg-[#1a1c2e] focus:outline-none transition duration-200"
			>
				{#if isLoading}
					PROCESANDO...
				{:else}
					{isRegistering ? 'REGISTRARSE' : 'INICIAR SESIÓN'}
				{/if}
			</button>
		</form>

		<div class="text-center mt-4">
			<button
				type="button"
				on:click={toggleAuthMode}
				class="text-sm font-medium text-primary hover:underline transition duration-150"
			>
				{isRegistering
					? '¿Ya tienes cuenta? Inicia sesión'
					: '¿No tienes cuenta? Regístrate gratis'}
			</button>
		</div>
	</div>
</div>
