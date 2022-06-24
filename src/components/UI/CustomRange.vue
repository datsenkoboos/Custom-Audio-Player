<template>
    <div
        ref="range"
        class="custom-range"
        @mousedown.prevent="thumbHandler"
    >
        <div
            ref="beforethumb"
            class="beforethumb"
        ></div>
        <div
            ref="thumb"
            class="thumb"
        >
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
const emit = defineEmits(['changeValue', ])
const props = defineProps({
    max: Number,
    value: Number,
    mode: String,
})
// elements
const range = ref(null)
const thumb = ref(null)
const beforethumb = ref(null)
// range value
const value = ref(props.value)
let movePrice
onMounted(() => {
    // range margins
    range.value.style.marginInline = (thumb.value.offsetWidth / 2) + 'px'
    // default thumb position
    thumb.value.style.left = -(thumb.value.offsetWidth / 2) + 'px'
    // movePrice initialization
    movePrice = +( props.max / range.value.clientWidth).toFixed(2)
})
watch(() => props.value, (newValue, oldValue) => {
    // react to props.value change
    if (newValue === oldValue) return
    if (newValue > props.max) {
        emit('changeValue', value.value = 0)
        moveThumb(null, value.value)
        return
    }
    moveThumb(null, newValue)
})
function changeValue(thumbPos) {
    let newValue = (thumbPos * movePrice).toFixed(0)
    if (newValue > props.max) newValue = props.max
    value.value = newValue
    // live mode = submit value on every move/change
    if (props.mode === 'live') emit('changeValue', value.value)
}
function moveThumb(event, value) {
    // updating movePrice to handle resize and zoom on the page
    movePrice = +( props.max / range.value.clientWidth).toFixed(2)
    if (value !== undefined) {
        // props value change
        beforethumb.value.style.width = Math.ceil(value / movePrice) + 'px'
        thumb.value.style.left = Math.ceil(value / movePrice) - (thumb.value.offsetWidth / 2) + 'px'
        return
    }
    let newLeft = event.clientX - range.value.getBoundingClientRect().left - ( thumb.value.offsetWidth / 2 );
    let rightEdge = range.value.clientWidth - (thumb.value.offsetWidth / 2);
    //left side limitation
    if ( newLeft < -(thumb.value.offsetWidth / 2) ) {
        newLeft = -(thumb.value.offsetWidth / 2);
    }
    // right side limitation
    if ( newLeft > rightEdge ) {
        newLeft = rightEdge;
    }
    beforethumb.value.style.width = newLeft + (thumb.value.offsetWidth / 2) + 'px'
    thumb.value.style.left = newLeft + 'px'
    changeValue(newLeft + (thumb.value.offsetWidth / 2))
}
function thumbHandler(event) {
    // click
    moveThumb(event)
    document.addEventListener('mousemove', moveThumb);
    document.addEventListener('mouseup', onMouseUp);
    // remove event listeners
    function onMouseUp() {
        // confirm range value
        emit('changeValue', value.value)
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', moveThumb);
    }
}
</script>

<style lang="scss">
.custom-range {
    position: relative;

    cursor: pointer;

    height: 10px;
    width: 100%;
    box-sizing: border-box;

    border-radius: 10px;
    border: 1px solid #e5e8eb;

    display: flex;
    align-items: center;
    .beforethumb {
        height: 10px;
        width: 0;

        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;

        background: #7945FC;
    }
    .thumb {
        position: absolute;

        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: #7945FC;
    }
}
</style>