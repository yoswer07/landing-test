<script lang="ts">
    import { Instagram, Twitter, Facebook, Rss } from '@lucide/svelte';

    const socialLinks = [
        { name: 'Instagram', href: '#instagram', icon: Instagram, color: 'text-pink-600' },
        { name: 'X', href: '#twitter', icon: Twitter, color: 'text-gray-900' },
        { name: 'Facebook', href: '#facebook', icon: Facebook, color: 'text-blue-600' },
    ];

    const currentYear = new Date().getFullYear(); 
</script>

<footer class="py-4 bg-secondary">
    <div class="container mx-auto px-6 max-w-7xl">
        <div class="flex flex-col sm:flex-row items-center justify-between text-sm text-white space-y-3 sm:space-y-0">
            
            <div class="text-center sm:text-left">
                Copyright © {currentYear} por 
                <span class="font-semibold text-white">3PX Logistics</span>
                - Diseñado por 
                <a href="https://ejemplo.com/yoswer-a" target="_blank" class="font-semibold text-gray-300 hover:text-primary transition duration-200">
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