<script lang="ts">
    export let formInfo: any;
    export let onUpdate: () => void;
</script>

<div class="bg-white rounded-xl shadow-md p-8">
    <h2 class="text-xl font-bold mb-6 text-secondary">Ajustes de Cuenta</h2>
    
    <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label for="name" class="input-name">Nombre</label>
                <input id="name" type="text" bind:value={formInfo.firstName} 
                    class="input-field" />
            </div>
            <div>
                <label for="lastName" class="input-name">Apellido</label>
                <input id="lastName" type="text" bind:value={formInfo.lastName} 
                    class="input-field" />
            </div>
            <div class="md:col-span-2">
                <label for="phone" class="input-name">Número de Teléfono</label>
                <input id="phone" type="tel" bind:value={formInfo.phone} placeholder="+1 000 000 000"
                    class="input-field" />
            </div>
        </div>

        <hr class="border-gray-100" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="md:col-span-2">
                <h3 class="text-md font-bold text-gray-700">Cambiar Contraseña</h3>
                <p class="text-xs text-gray-400">Deja estos campos vacíos si no deseas cambiarla.</p>
            </div>
            <div>
                <label for="newPassword" class="input-name">Nueva Contraseña</label>
                <input id="newPassword" type="password" bind:value={formInfo.newPassword} placeholder="••••••••"
                    class="input-field" />
            </div>
            <div>
                <label for="repeatPassword" class="input-name">Confirmar Contraseña</label>
                <input id="repeatPassword" type="password" bind:value={formInfo.confirmPassword} placeholder="••••••••"
                    class="input-field" />
            </div>
        </div>

        <div class="pt-4">
            <button on:click={onUpdate} 
                class="btn-secondary">
                Guardar Cambios
            </button>
        </div>
    </div>
</div>