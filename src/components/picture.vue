<script setup>
import { computed, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import Title from './Title.vue'
import { getImgUrl } from '../utils/utils'

const emit = defineEmits(['open-popup'])

const props = defineProps({
  infoData: {
    type: Object,
    default: () => ({})
  }
});

const localGalleryImages = import.meta.glob('../assets/image/picture1/*', {
  eager: true,
  import: 'default'
})

const thumbsSwiper = ref(null)

const setThumbsSwiper = (swiperInstance) => {
  thumbsSwiper.value = swiperInstance
}

const activeThumbsSwiper = computed(() => {
  if (!thumbsSwiper.value || thumbsSwiper.value.destroyed) {
    return null
  }
  return thumbsSwiper.value
});

const mainModules = [Navigation, Thumbs, Autoplay]
const thumbModules = [FreeMode, Thumbs]

const a11yOptions = {
  prevSlideMessage: 'Previous slide',
  nextSlideMessage: 'Next slide'
}

const keyboardOptions = {
  enabled: true
}

const autoplayOptions = {
  delay: 6000,
  disableOnInteraction: false
}

const thumbBreakpoints = {
  768: {
    direction: 'vertical',
    slidesPerView: 3
  }
}

const defaultSlides = [
  {
    id: 1,
    caption: '',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1740&q=80',
    thumbImage:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=60'
  },
  {
    id: 2,
    caption: '',
    image:
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1740&q=80',
    thumbImage:
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=400&q=60'
  },
  {
    id: 3,
    caption: '',
    image:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1740&q=80',
    thumbImage:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&q=60'
  },
  {
    id: 4,
    caption: '',
    image:
      'https://images.unsplash.com/photo-1414609245224-afa02bfb3fda?auto=format&fit=crop&w=1740&q=80',
    thumbImage:
      'https://images.unsplash.com/photo-1414609245224-afa02bfb3fda?auto=format&fit=crop&w=400&q=60'
  },
  {
    id: 5,
    caption: '',
    image:
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1740&q=80',
    thumbImage:
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=60'
  },
  {
    id: 6,
    caption: '',
    image:
      'https://images.unsplash.com/photo-1675789652617-d84e3d201ef4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80',
    thumbImage:
      'https://images.unsplash.com/photo-1675789652617-d84e3d201ef4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80'
  }
];

const slides = computed(() => {
  const source =
    (props.infoData?.data && props.infoData.data.length && props.infoData.data) ||
    (props.infoData?.slides && props.infoData.slides.length && props.infoData.slides) ||
    defaultSlides

  return source.map((slide, index) => {
    const mainImagePath = slide.img ?? slide.image ?? ''
    const thumbImagePath = slide.thumbImage ?? mainImagePath
    const secondaryPath = slide.img2 ?? slide.secondaryImage ?? ''

    const mainImage = mainImagePath ? resolveImage(mainImagePath) : ''
    const thumbImage = thumbImagePath ? resolveImage(thumbImagePath) : mainImage
    const secondaryImage = secondaryPath ? resolveImage(secondaryPath) : ''

    return {
      id: slide.id ?? index,
      caption: slide.caption ?? slide.description ?? '',
      title: slide.title ?? '',
      description: slide.description ?? '',
      mainImage,
      thumbImage,
      secondaryImage,
      thumbLabel: slide.thumbLabel ?? slide.title ?? `Slide ${index + 1}`
    }
  })
});

const openPopup = (slide) => {
  if (!slide?.mainImage) return

  emit('open-popup', {
    caption: slide.caption ?? slide.description ?? '',
    mainImage: slide.mainImage,
    secondaryImage: slide.secondaryImage ?? ''
  })
}

function resolveImage(imagePath) {
  if (!imagePath) return ''
  if (/^https?:\/\//.test(imagePath) || imagePath.startsWith('data:')) {
    return imagePath
  }

  const normalized = imagePath.includes('/') ? imagePath : `picture1/${imagePath}`
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
</script>

<template>
    <div class="content_wrap">
        <Title :infoData="props.infoData" />
        <div class="picture_box max-w-[1366px] p-10 mx-auto bg-white">
           <!-- Slider main wrapper -->
            <div class="swiper-container-wrapper">
            <!-- Slider main container -->
            <Swiper
              class="gallery-top"
              :modules="mainModules"
              :spaceBetween="10"
              :loop="true"
              :autoplay="autoplayOptions"
              :navigation="true"
              :keyboard="keyboardOptions"
              :a11y="a11yOptions"
              :thumbs="{ swiper: activeThumbsSwiper }"
            >
              <SwiperSlide
                v-for="slide in slides"
                :key="slide.id"
                :class="{ 'has-image': !!slide.mainImage }"
                :style="slide.mainImage ? { backgroundImage: `url(${slide.mainImage})` } : undefined"
                @click="openPopup(slide)"
              >
                <div v-if="slide.caption || slide.title || slide.description" class="slide-content">
                  <div v-if="slide.caption" class="caption">{{ slide.caption }}</div>
                  <div v-if="!slide.caption && slide.title" class="title" v-html="slide.title" />
                  <div v-if="slide.description" class="description" v-html="slide.description" />
                  <span class="lightbox_hint">點擊查看大圖</span>
                </div>
              </SwiperSlide>
            </Swiper>
            <!-- Slider thumbnail container -->
            <Swiper
              class="gallery-thumbs"
              :modules="thumbModules"
              :spaceBetween="10"
              :slidesPerView="3"
              :freeMode="true"
              :loop="true"
              :watchSlidesProgress="true"
              :centeredSlides="true"
              :centeredSlidesBounds="true"
              :watchOverflow="true"
              :breakpoints="thumbBreakpoints"
              @swiper="setThumbsSwiper"
            >
              <SwiperSlide
                v-for="slide in slides"
                :key="`thumb-${slide.id}`"
                :class="{ 'has-image': !!slide.thumbImage }"
                :style="slide.thumbImage ? { backgroundImage: `url(${slide.thumbImage})` } : undefined"
              >
                <span v-if="!slide.thumbImage && slide.thumbLabel" class="thumb-label">
                  {{ slide.thumbLabel }}
                </span>
              </SwiperSlide>
            </Swiper>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    $breakpoint: 768px;
    
    .picture_box{
        border-radius: 30px;
    }

    .swiper-container-wrapper {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
        margin-left: auto;
        margin-right: auto;

        @media (min-width: $breakpoint) {
            flex-direction: row;
            min-height: 320px;
        }
    }

    .gallery-top{
        position: relative;
        width: 100%;
        height: 45vw;
        min-height: 120px;
        max-height: 620px;
        border-radius: 20px;
        overflow: hidden;

        @media (min-width: $breakpoint) {
            width: 80%;
            height: 45vw;
            max-height: 620px;
            margin-right: 10px;
        }

        :deep(.swiper-button-next),
        :deep(.swiper-button-prev){
            color: #fff;
        }

        :deep(.swiper-slide){
            position: relative;
            overflow: hidden;
            border-radius: 20px;
            text-align: center;
            background-size: cover;
            background-position: center;
            background-color: #fff;
            display: flex;
            flex-flow: column nowrap;
            justify-content: flex-end;
            align-items: stretch;
            padding: 20px;
            cursor: zoom-in;

            .slide-content{
                display: flex;
                flex-direction: column;
                gap: 0.35rem;
                justify-content: flex-end;
                max-width: 900px;
                width: 100%;
                margin: 0 auto;
                background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.75) 90%);
                color: #fff;
                border-radius: 16px;
                padding: 16px 18px;
                box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25);
            }

            .caption,
            .description,
            .title,
            .lightbox_hint {
                display: block;
                opacity: 0;
                transition: 0.5s ease 0.4s;
                text-align: left;
            }

            .caption{
                font-size: clamp(16px, 2vw, 20px);
                line-height: 1.6;
            }

            .lightbox_hint{
                font-size: 14px;
                letter-spacing: 1px;
                opacity: 0.8;
            }
        }

        :deep(.swiper-slide-active) {
            .caption,
            .description,
            .title,
            .lightbox_hint {
                opacity: 1;
            }
            .title {
                margin-bottom: 0.35rem;
                font-size: 24px;
                color: #fff;
                transition: opacity 0.5s ease 0.4s;
            }
            .description {
                font-size: 16px;
                color: #f0f0f0;
                transition: opacity 0.5s ease 0.55s;
            }
        }
    }

    .gallery-thumbs {
        width: 100%;
        height: 15vw;
        min-height: 70px;
        max-height: 620px;
        padding-top: 10px;

        @media (min-width: $breakpoint) {
            width: 20%;
            height: 45vw;
            max-height: 620px;
            padding: 0;
        }

        :deep(.swiper-wrapper) {
            flex-direction: row;

            @media (min-width: $breakpoint) {
                flex-direction: column;
            }
        }

        :deep(.swiper-slide) {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            width: 25%;
            height: 100%;
            opacity: 0.75;
            cursor: pointer;
            background-size: cover;
            background-position: center;
            background-color: #fff;
            padding: 0.5rem;
            text-align: center;
            font-weight: 600;
            border-radius: 14px;
            overflow: hidden;
            transition: opacity 0.3s ease, transform 0.3s ease;

            @media (min-width: $breakpoint) {
                flex-direction: column;
                width: 100%;
            }

            &:hover {
                opacity: 0.95;
            }
        }

        :deep(.swiper-slide-thumb-active) {
            opacity: 1;
        }
    }

    .thumb-label{
        display: block;
        width: 100%;
        font-size: 14px;
    }

    @media (max-width: 767px) {
        .gallery-top{
            height: 65vw;
            min-height: 220px;
        }

        .gallery-top :deep(.swiper-slide){
            padding: 5px;
        }

        .gallery-top :deep(.swiper-slide .slide-content){
            background: linear-gradient(180deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.1) 90%);
        }

        .gallery-top :deep(.swiper-slide .caption),
        .gallery-top :deep(.swiper-slide .description),
        .gallery-top :deep(.swiper-slide .title){
            opacity: 0;
            transition: none;
        }
    }

</style>
