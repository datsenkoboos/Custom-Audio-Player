import { ref, onMounted, onUnmounted } from 'vue';

// arg - bound where mobile version starts
export default function useResize(bound) {
    const mobile = ref(false)
    
    function update() {
        mobile.value = window.innerWidth < bound
    }
    update()
    onMounted(() => {
        window.addEventListener('resize', update);
    })
    onUnmounted(() => {
        window.removeEventListener('resize', update);
    })
    // mobile state
    return mobile 
}   