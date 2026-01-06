export function smoothScroll(node: HTMLAnchorElement) {
    function handleClick(event: Event) {
        const targetId = node.getAttribute('href');

        if (targetId && targetId.startsWith('#')) {
            event.preventDefault();
            
            const targetElement = document.getElementById(targetId.substring(1));

            if (targetElement) {

                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
                window.history.pushState(null, '', targetId);
            }
        }
    }

    node.addEventListener('click', handleClick);

    return {
        destroy() {
            node.removeEventListener('click', handleClick);
        }
    };
}