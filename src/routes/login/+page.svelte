<script lang="ts">
	import { showNotify } from '$lib/toastStore';
	import { onMount } from 'svelte';
	import { t } from '$lib/langStore';

	let auth: any;
	let db: any;
	let signInWithEmailAndPassword: any;
	let createUserWithEmailAndPassword: any;
	let sendPasswordResetEmail: any;
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
		sendPasswordResetEmail = authModule.sendPasswordResetEmail;

		doc = firestoreModule.doc;
		setDoc = firestoreModule.setDoc;
		getDoc = firestoreModule.getDoc;
	});

    function isPasswordValid(pass: string) {
        const regex = /^(?=.*[0-9]).{8,}$/;
        return regex.test(pass);
    }

    async function handleForgotPassword() {
        if (!email) {
            showNotify($t.enter_email_error, 'error');
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            showNotify($t.recovery_sent_ok, 'success');
        } catch (e: any) {
            showNotify($t.error2_toast, 'error');
        }
    }

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
				firstName: '',
				lastName: '',
				phone: '',
				createdAt: new Date(),
				role: 'client'
			});
		}
	}

	const handleEmailAuth = async () => {
		if (!auth || isLoading) return;

		if (isRegistering && !isPasswordValid(password)) {
            showNotify($t.pass_requirements, 'error');
            return;
        }

		isLoading = true;
		errorMessage = '';

		try {
			if (isRegistering) {
				const res = await createUserWithEmailAndPassword(auth, email, password);
				await saveUserToFirestore(res.user);
				showNotify($t.suss_toast, 'success');
			} else {
				await signInWithEmailAndPassword(auth, email, password);
				showNotify($t.welcome_toast, 'success');
			}
			setTimeout(() => {
				window.location.href = '/dashboard';
			}, 1000);
		} catch (e: any) {
			console.error(e);
			if (e.code === 'auth/email-already-in-use') {
				errorMessage = $t.reg_toast;
			} else if (
				e.code === 'auth/invalid-credential' ||
				e.code === 'auth/wrong-password' ||
				e.code === 'auth/user-not-found'
			) {
				errorMessage = $t.erroracc_toast;
			} else if (e.code === 'auth/invalid-email') {
				errorMessage = $t.formar_toast;
			} else if (e.code === 'auth/weak-password') {
				errorMessage = $t.low_toast;
			} else {
				errorMessage = $t.error2_toast;
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
				{isRegistering ? $t.acc_login : $t.acces_login}
			</h2>
			<p class="mt-2 text-sm text-gray-600">
				{isRegistering ? $t.join_login : $t.in_login}
			</p>
		</div>

		<form class="mt-8 space-y-6" on:submit|preventDefault={handleEmailAuth}>
			<div class="rounded-md shadow-sm space-y-4">
				<input
					type="email"
					bind:value={email}
					disabled={isLoading}
					required
					placeholder={$t.email_quote}
					class="login-field"
				/>

				<input
					type="password"
					bind:value={password}
					disabled={isLoading}
					required
					placeholder={$t.pass_login}
					class="login-field"
				/>
			</div>

			{#if !isRegistering}
                <div class="flex justify-end">
                    <button 
                        type="button" 
                        on:click={handleForgotPassword}
                        class="text-xs text-primary hover:underline cursor-pointer"
                    >
                        {$t.forgot_pass}
                    </button>
                </div>
            {/if}

			<button
				type="submit"
				class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-secondary hover:bg-[#1a1c2e] focus:outline-none transition duration-200"
			>
				{#if isLoading}
					{$t.process_login}
				{:else}
					{isRegistering ? $t.regis_login : $t.login_login}
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
					? $t.msg_login
					: $t.msg2_login}
			</button>
		</div>
	</div>
</div>
