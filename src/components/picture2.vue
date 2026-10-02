<script setup>
import AOS from 'aos'
import 'aos/dist/aos.css'
import { computed, onMounted } from 'vue'

import Title from './Title.vue'
import { getImgUrl } from '../utils/utils'

const localGalleryImages = import.meta.glob('../assets/image/picture2/*', {
  eager: true,
  import: 'default'
})

const props = defineProps({
  infoData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['open-popup'])

const introParagraphs = computed(() => props.infoData?.intro ?? [])

const galleryItems = computed(() => {
  const items = props.infoData?.data ?? []

  return items.map((item, index) => {
    const mainImage = resolveImage(item.img)
    const secondaryImage = item.img2 ? resolveImage(item.img2) : ''

    return {
      id: index,
      caption: item.caption ?? '',
      mainImage,
      secondaryImage
    }
  })
})

const openPopup = (index) => {
  const item = galleryItems.value[index]
  if (item) {
    emit('open-popup', item)
  }
}

function resolveImage(imagePath) {
  if (!imagePath) return ''
  if (/^https?:\/\//.test(imagePath) || imagePath.startsWith('data:')) {
    return imagePath
  }

  const normalized = imagePath.startsWith('picture2/') ? imagePath : `picture2/${imagePath}`
  const fileName = normalized.split('/').pop()
  const matchedKey = Object.keys(localGalleryImages).find((key) => key.endsWith(`/${fileName}`))

  if (matchedKey) {
    return localGalleryImages[matchedKey]
  }

  try {
    return getImgUrl(normalized)
  } catch (error) {
    return imagePath
  }
}

onMounted(() => {
  AOS.init()
});
</script>

<template>
  <div class="content_wrap">
    <Title :infoData="props.infoData" />
    <div
      class="picture2_box max-w-[1366px] mx-auto"
      data-aos="fade-up"
      data-aos-delay="0"
      data-aos-duration="1000"
    >
      <div class="picture2_inner">
        <div class="picture2_text" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">
          <p v-for="(paragraph, index) in introParagraphs" :key="index">
            {{ paragraph }}
          </p>
        </div>
        <div class="culture_box" data-aos="fade-up" data-aos-delay="150" data-aos-duration="1000">
          <div
            v-for="(item, index) in galleryItems"
            :key="item.id"
            class="culture"
            @click="openPopup(index)"
          >
            <img
              :src="item.mainImage"
              :alt="item.caption || `現場人物 ${index + 1}`"
              loading="lazy"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.picture2_box {
  position: relative;
  padding: clamp(1.5rem, 3vw, 3rem);
  border-radius: 32px;
  overflow: hidden;
}

.picture2_inner {
  position: relative;
  display: flex;
  gap: clamp(1.5rem, 2vw, 2.5rem);
  align-items: flex-start;
}

.picture2_text {
  width: 32%;
  min-width: 280px;
  background: rgba(255, 255, 255, 0.95);
  color: #1f1f1f;
  padding: clamp(1rem, 1.5vw, 1.5rem);
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 20px;
}

.picture2_text p + p {
  margin-top: 1rem;
}

.culture_box {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: clamp(0.75rem, 1.25vw, 1.25rem);
  width: 100%;
}

.culture {
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  aspect-ratio: 1 / 1;
  cursor: pointer;
}

.culture:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.28);
}

.culture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.35s ease;
}

.culture:hover img {
  transform: scale(1.05);
}

@media screen and (max-width: 1200px) {
  .picture2_text {
    position: static;
    width: 100%;
  }

  .picture2_inner {
    flex-direction: column;
  }

}

@media screen and (max-width: 768px) {
  .picture2_box {
    padding: 1.25rem;
  }

  .picture2_text {
    min-width: auto;
  }

  .culture {
    border-radius: 14px;
  }
}
</style>
