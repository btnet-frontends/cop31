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
        <div class="intro2_box max-w-[980px] p-6 sm:p-10 mx-auto" data-aos="fade-up" data-aos-delay="0" data-aos-duration="1000">
            <div class="intro2_card_container w-full p-6 sm:p-10">
                <!-- 選項切換 Tab 列，移入卡片內部上方 -->
                <div
                    v-if="tabs.length"
                    class="slider_box_head w-full mb-8 flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-lg sm:text-xl font-bold"
                >
                    <a
                        v-for="(tab, index) in tabs"
                        :key="`${tab.label}-${index}`"
                        href="#"
                        class="tab_btn py-2 px-5 transition-all duration-300"
                        :class="{ active: activeIndex === index }"
                        @click.prevent="goToSlide(index)"
                    >
                        <span>{{ tab.label }}</span>
                    </a>
                </div>

                <!-- 內容輪播區 -->
                <div v-if="tabs.length" class="slider_box_body w-full">
                    <Swiper class="mySwiper" @swiper="onSwiper" @slideChange="onSlideChange">
                        <SwiperSlide v-for="(tab, tabIndex) in tabs" :key="`slide-${tab.label}-${tabIndex}`">
                            <div class="flex flex-col gap-6 text-justify text-base sm:text-lg">
                                <div
                                    v-for="(item, itemIndex) in tab.content"
                                    :key="`content-${tabIndex}-${itemIndex}`"
                                    class="slider_text_box mb-6 last:mb-0"
                                >
                                    <div v-if="item.title" class="title_box w-fit mb-3 px-3 py-1">
                                        <span class="title">
                                            {{ item.title }}
                                        </span>
                                    </div>
                                    <p class="description leading-relaxed">{{ item.description }}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    // 白色底帶有 90% 透明度
    .intro2_card_container {
        background: rgba(255, 255, 255, 0.9);
        border-radius: 28px;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
    }

    .slider_box_head {
        background: transparent;
        white-space: nowrap;
    }

    // 選項未被選時：字色 1e5abc，背景透明
    .tab_btn {
        color: #1e5abc;
        border-radius: 9999px;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;

        &:hover {
            opacity: 0.85;
        }

        // 被選時：由左到右 0077c8 到 40e0d0，白字
        &.active {
            background: linear-gradient(to right, #0077c8, #40e0d0);
            color: #ffffff;
            box-shadow: 0 4px 14px rgba(0, 119, 200, 0.25);
        }
    }

    /*swiper*/
    .swiper {
        width: 100%;
        height: 100%;
    }

    .swiper-slide {
        padding: 5px;
    }

    .title_box {
        background: #40e0d0;
        display: inline-block;

        .title {
            color: #4d4d4d;
            font-weight: 700;
            letter-spacing: 1px;
        }
    }

    .description {
        color: #4d4d4d;
        letter-spacing: 0.5px;
        line-height: 1.8;
    }

    @media screen and (max-width: 640px) {
        .intro2_card_container {
            padding: 20px 16px;
            border-radius: 20px;
        }

        .slider_box_head {
            gap: 8px;
        }

        .tab_btn {
            font-size: 1rem;
            padding: 6px 14px;
        }
    }
</style>
