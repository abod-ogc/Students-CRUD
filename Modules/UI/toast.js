export function toggleToast(message = "")
{
    const toast = document.createElement('div');
    toast.classList.add("toast");
    toast.textContent = message;
    document.body.insertBefore(toast, document.querySelector("script"));

    toast.offsetHeight;
    toast.style.transform = "translateX(0)";
    toast.style.opacity = "1";

    setTimeout(() => {
        
        toast.style.transform = "translateX(110%)";
        toast.style.opacity = "0";

        toast.addEventListener('transitionend', () => {
            toast.remove();
        }, { once: true });
    }, 4000);
}