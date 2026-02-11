<script lang="ts">
    import {Music2, Facebook } from '@lucide/svelte';
    import { t } from '$lib/langStore';

    const socialLinks = [
        // { name: 'Instagram', href: '#instagram', icon: Instagram, color: 'text-pink-600' },
        { name: 'Tiktok', href: 'https://www.tiktok.com/@3plxpress1', icon: Music2, color: 'text-gray-900' },
        { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61587586032189', icon: Facebook, color: 'text-blue-600' },
    ];

    const currentYear = new Date().getFullYear(); 
</script>

<footer class="py-4 bg-secondary">
    <div class="container mx-auto px-6 max-w-7xl">
        <div class="flex flex-col sm:flex-row items-center justify-between text-sm text-white space-y-3 sm:space-y-0">
            
            <div class="text-center sm:text-left">
                Copyright © {currentYear} {$t.by_footer} 
                <span class="font-semibold text-white">3PL Xpress</span>
                - {$t.design_footer} 
                <a href="https:www.github.com/yoswer07" target="_blank" class="font-semibold text-gray-300 hover:text-primary transition duration-200">
                    Yoswer A
                </a>
            </div>

            <div class="flex space-x-4">
                {#each socialLinks as link}
                    <a 
                        href={link.href} 
                        aria-label={link.name} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="text-gray-300 hover:text-primary transition duration-200"
                    >
                        <svelte:component this={link.icon} class="w-6 h-6" />
                    </a>
                {/each}
            </div>

        </div>
    </div>
</footer>