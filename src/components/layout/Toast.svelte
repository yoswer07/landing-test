<script lang="ts">
    import { toast } from '$lib/toastStore';
	import { CircleCheck, CircleX } from '@lucide/svelte';
    import { fly } from 'svelte/transition';
</script>

{#if $toast.show}
    <div 
        transition:fly={{ y: 100, duration: 500 }}
        class="fixed bottom-10 left-1/2 -translate-x-1/2 z-100 w-[90%] max-w-md"
    >
        <div class="
            {$toast.type === 'error' ? 'bg-red-600' : 'bg-secondary'} 
            text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center justify-between">
            <div class="flex items-center gap-3">
                {#if $toast.type === 'error'}
                    <CircleX size={24} class="text-white" strokeWidth={2.5} />
                {:else}
                    <CircleCheck size={24} class="text-primary" strokeWidth={2.5} />
                {/if}
                <p class="text-m font-medium">{$toast.message}</p>
            </div>
            <button 
                on:click={() => toast.update(s => ({...s, show: false}))} 
                class="text-white/50 hover:text-white text-xl ml-4"
            >
                &times;
            </button>
        </div>
    </div>
{/if}