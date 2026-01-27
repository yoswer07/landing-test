<script lang="ts">
    export let formInfo: any;
    export let onUpdate: () => void;
    import { t } from '$lib/langStore';
</script>

<div class="bg-white rounded-xl shadow-md p-8">
    <h2 class="text-xl font-bold mb-6 text-secondary">{$t.title_setting}</h2>
    
    <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label for="name" class="input-name">{$t.name_quote}</label>
                <input id="name" type="text" bind:value={formInfo.firstName} 
                    class="input-field" />
            </div>
            <div>
                <label for="lastName" class="input-name">{$t.lastname_quote}</label>
                <input id="lastName" type="text" bind:value={formInfo.lastName} 
                    class="input-field" />
            </div>
            <div class="md:col-span-2">
                <label for="phone" class="input-name">{$t.phone_quote}</label>
                <input id="phone" type="tel" bind:value={formInfo.phone} placeholder="+1 000 000 000"
                    class="input-field" />
            </div>
        </div>

        <hr class="border-gray-100" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="md:col-span-2">
                <h3 class="text-md font-bold text-gray-700">{$t.pass_setting}</h3>
                <p class="text-xs text-gray-400">{$t.passquote_setting}</p>
            </div>
            <div>
                <label for="newPassword" class="input-name">{$t.newpass_setting}</label>
                <input id="newPassword" type="password" bind:value={formInfo.newPassword} placeholder="••••••••"
                    class="input-field" />
            </div>
            <div>
                <label for="repeatPassword" class="input-name">{$t.confirmpass_setting}</label>
                <input id="repeatPassword" type="password" bind:value={formInfo.confirmPassword} placeholder="••••••••"
                    class="input-field" />
            </div>
        </div>

        <div class="pt-4">
            <button on:click={onUpdate} 
                class="btn-secondary">
                {$t.btn_setting}
            </button>
        </div>
    </div>
</div>