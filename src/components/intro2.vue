<script setup>
import { computed, ref, watch, onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css';

import AOS from 'aos'
import 'aos/dist/aos.css'

import Title from './Title.vue';

 onMounted(() => {
    AOS.init()
});

const props = defineProps({
    infoData: {
        type: Object,
        default: () => ({}),
    },
});

const infoData = computed(() => props.infoData ?? {});

const swiperRef = ref(null);
const activeIndex = ref(0);

const tabs = computed(() => {
    const intro2 = infoData.value?.intro2;
    return Array.isArray(intro2) ? intro2 : [];
});

watch(tabs, (newTabs) => {
    if (!newTabs.length) {
        activeIndex.value = 0;
        return;
    }

    if (activeIndex.value >= newTabs.length) {
        activeIndex.value = 0;
        if (swiperRef.value) {
            swiperRef.value.slideTo(0, 0);
        }
    }
});

const onSwiper = (swiperInstance) => {
    swiperRef.value = swiperInstance;
    if (activeIndex.value) {
        swiperInstance.slideTo(activeIndex.value, 0);
    }
};

const onSlideChange = (swiperInstance) => {
    activeIndex.value = swiperInstance.activeIndex;
};

const goToSlide = (index) => {
    if (index === activeIndex.value) {
        return;
    }

    activeIndex.value = index;
    if (swiperRef.value) {
        swiperRef.value.slideTo(index);
    }
};
</script>

<template>
    <div class="content_wrap relative z-30">
        <Title :infoData="infoData" />
        <div class="intro2_box max-w-[1366px] p-6 sm:p-10 mx-auto" data-aos="fade-up" data-aos-delay="0" data-aos-duration="1000">
            <div
                v-if="tabs.length"
                class="slider_box_head max-w-[980px] mx-auto w-full mb-8 flex flex-col justify-between text-2xl gap-3 text-center rounded-4xl md:flex-row md:text-left"
            >
                <a
                    v-for="(tab, index) in tabs"
                    :key="`${tab.label}-${index}`"
                    href="#"
                    class="py-2 px-5"
                    :class="{ active: activeIndex === index }"
                    @click.prevent="goToSlide(index)"
                >
                    <p>{{ tab.label }}</p>
                </a>
            </div>
            <div v-if="tabs.length" class="slider_box_body w-full">
                <Swiper class="mySwiper" @swiper="onSwiper" @slideChange="onSlideChange">
                    <SwiperSlide v-for="(tab, tabIndex) in tabs" :key="`slide-${tab.label}-${tabIndex}`">
                        <div class="flex flex-col gap-8 p-6 sm:p-10 text-justify text-lg bg-white rounded-2xl sm:text-xl">
                            <div
                                v-for="(item, itemIndex) in tab.content"
                                :key="`content-${tabIndex}-${itemIndex}`"
                                class="slider_text_box mb-8 last:mb-0"
                            >
                                <div v-if="item.title" class="title_box w-fit mb-5 px-5 py-2">
                                    <p class="title" :style="item.titleColor ? { color: item.titleColor } : undefined">
                                        {{ item.title }}
                                    </p>
                                </div>
                                <p class="description leading-relaxed">{{ item.description }}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    </div>
    <div class="frame03 frame03-1 z-10"></div>
    <div class="frame03 frame03-2 z-10"></div>
</template>

<style scoped lang="scss">
    .frame03{
        position: absolute;
        display: block;
        width: 250px;
        width: 18%;
        height: 100%;
        top: 0;
    }

    .frame03-1{
        left: 0;
        background: url("../assets/image/frame03.png") left center repeat-y;
        background-size: contain;
        -moz-transform:scaleY(-1);
        -webkit-transform:scaleY(-1);
        -o-transform:scaleY(-1);
        transform:scaleY(-1);
    }

    .frame03-2{
        right: 0;
        background: url("../assets/image/frame03.png") right center repeat-y;
        background-size: contain;
        -moz-transform:scaleX(-1);
        -webkit-transform:scaleX(-1);
        -o-transform:scaleX(-1);
        transform:scaleX(-1);
    }

    .slider_box_head{
        color: #2f4f4f;
        white-space: nowrap;
        background-color: #e6e6e6;
        font-weight: 600;
    }

    .slider_box_head a.active{
        border-radius: 50px;
        background: #B0DB61;
        background: linear-gradient(-35deg, rgba(176, 219, 97, 1) 30%, rgba(110, 203, 142, 1) 100%);
    }

    /*swiper*/
    .swiper {
        width: 100%;
        height: 100%;
        
    }

    .swiper-slide {
        text-align: center;
        /* Center slide text vertically */
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
    }

    .swiper-slide > div{
        box-shadow: 0 0 5px rgba(0,0,0, 0.1);
    }

    .swiper-slide .title{
        color:#2f4f4f;
        letter-spacing: 3px;
    }

    .title_box{
        background: #B0DB61;
        background: linear-gradient(-35deg, rgba(176, 219, 97, 1) 30%, rgba(110, 203, 142, 1) 100%);
    }

    .swiper-slide .description{
        color:#2f4f4f;
        letter-spacing: 3px;
    }

    @media screen and (max-width: 1200px) {
        
    }
    @media screen and (max-width: 1024px) {
        .frame03{
            display: none;
        }
        
    }
</style>
