<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    default: () => null
  },
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const hasSecondary = computed(() => !!props.item?.secondaryImage)

const close = () => emit('close');
</script>

<template>
  <Teleport to="body">
    <div
      v-if="visible && item"
      class="popup"
      role="dialog"
      aria-modal="true"
      @click.self="close"
    >
      <div class="popup_container">
        <button class="popup_btn" type="button" @click="close" aria-label="關閉圖輯">
          ✕
        </button>
        <div class="popup_text">
          <p>{{ item.caption }}</p>
        </div>
        <div :class="['popup_img', { two: hasSecondary }]">
          <img :src="item.mainImage" :alt="item.caption" loading="lazy">
          <img
            v-if="hasSecondary"
            :src="item.secondaryImage"
            :alt="item.caption"
            loading="lazy"
          >
        </div>
      </div>
    </div>
  </Teleport>
  </template>

<style scoped lang="scss">
.popup {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 99;
  opacity: 1;
  visibility: visible;
  padding: 1.5rem;
}

.popup_container {
  width: min(1100px, 96vw);
  max-height: 90vh;
  background: #fff;
  border-radius: 20px;
  display: flex;
  gap: 1rem;
  padding: clamp(1rem, 1.5vw, 1.5rem);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
  position: relative;
  overflow: auto;
}

.popup_btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  border: none;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.popup_text {
  width: 38%;
  min-width: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: justify;
  font-size: 1rem;
  line-height: 1.7;
  color: #1a1a1a;
}

.popup_img {
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  justify-content: center;
  align-items: center
}

.popup_img img {
  width: fit-content;
  height: 100%;
  border-radius: 14px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);
}

.popup_img.two img {
  max-height: 34vh;
}

@media screen and (max-width: 768px) {
  .popup_container {
    padding: 3rem 2rem;
    flex-direction: column;
    align-items: center;
  }

  .popup_text,
  .popup_img {
    width: 100%;
  }

  .popup_img img {
    height: fit-content;
  }

  .popup_btn {
    top: 10px;
    right: 10px;
  }
}
</style>
