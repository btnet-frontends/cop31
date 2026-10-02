<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const show = ref(false)

function handleScroll() {
  show.value = window.scrollY > 200
}

function goToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
});
</script>

<template>
  <button
    v-if="show"
    @click="goToTop"
    class="fixed bottom-8 w-[105px] h-[105px] right-[0px] z-50 rounded-full text-xl font-bold transition sm:right-[30px] sm:w-[105px] sm:h-[105px]"
    aria-label="回到頂部"
  >
    <img src="../assets/image/go_to_top.png" alt="arrow_up" class="arrow_up" />
  </button>
</template>

<style scoped>
button {
  cursor: pointer;
}

button:hover{
  opacity: 0.8;
}

.arrow_up{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 100%;
}
</style>