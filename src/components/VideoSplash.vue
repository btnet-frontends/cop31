<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['ended'])

const videoRef = ref(null)
const visible  = ref(true)
let finished   = false

function finish() {
    if (finished) return
    finished = true
    visible.value = false                 
    setTimeout(() => emit('ended'), 900)  
}

onMounted(() => {
    const video = videoRef.value
    if (!video) { finish(); return }

    const promise = video.play()
    if (promise !== undefined) {
        promise.catch(() => finish())    
    }
})
</script>

<template>
    <Transition name="splash">
        <div v-if="visible" class="splash_wrap" aria-hidden="true">
            <video
                ref="videoRef"
                class="splash_video"
                muted
                playsinline
                preload="auto"
                @ended="finish"
                @error="finish"
            >
                <source src="../assets/image/taipei-antalya-flight.mp4" type="video/mp4" />
            </video>
        </div>
    </Transition>
</template>

<style scoped>
.splash_wrap {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: #000;
}

.splash_video {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* Leave transition */
.splash-leave-active {
    transition: opacity 0.9s ease;
}
.splash-leave-to {
    opacity: 0;
}
</style>
