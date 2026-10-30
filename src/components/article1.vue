<script setup>
import AOS from 'aos'
import 'aos/dist/aos.css'
import { computed, onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import Title from './Title.vue';
import Card from './card.vue';

const props = defineProps({
    infoData: {
        type: Object,
        default: () => ({}),
    },
});

onMounted(() => {
    AOS.init()
});

const articles = computed(() => {
    const list = props.infoData?.articles;
    return Array.isArray(list) ? list : [];
});

const sliderNamespace = computed(() => props.infoData?.id ?? 'article-slider');

const modules = [Navigation];

const navigationOptions = computed(() => ({
    prevEl: `.${sliderNamespace.value}-nav-prev`,
    nextEl: `.${sliderNamespace.value}-nav-next`,
}));

const breakpoints = {
    0: { slidesPerView: 1, spaceBetween: 16 },
    768: { slidesPerView: 2, spaceBetween: 24 },
    1024: { slidesPerView: 3, spaceBetween: 32 },
};
</script>

<template>
    <div class="content_wrap z-30">
        <Title :infoData="props.infoData" />
        <div class="article1_box max-w-[1366px] px-4 py-8 sm:px-6 md:px-8 lg:p-10 mx-auto" data-aos="fade-up" data-aos-delay="0" data-aos-duration="1000">
            <div v-if="articles.length === 1" class="single-article-wrap">
                <div class="single-card-box">
                    <Card :cardData="articles[0]" />
                </div>
            </div>

            <div v-else-if="articles.length > 1" class="article-slider">
                <Swiper
                    class="article-swiper"
                    :modules="modules"
                    :navigation="navigationOptions"
                    :breakpoints="breakpoints"
                    :spaceBetween="16"
                    :slidesPerView="1"
                    :loop="articles.length > 3"
                    :centerInsufficientSlides="true"
                >
                    <SwiperSlide
                        v-for="(article, index) in articles"
                        :key="article.id ?? `${article.title ?? 'article'}-${index}`"
                    >
                        <Card :cardData="article" />
                    </SwiperSlide>
                </Swiper>
                <div v-if="articles.length > 3" class="slider-nav z-20">
                    <button
                        type="button"
                        :class="['slider-nav-button', `${sliderNamespace}-nav-prev`]"
                        aria-label="上一則"
                    >
                        <span class="sr-only">上一則</span>
                    </button>
                    <button
                        type="button"
                        :class="['slider-nav-button', `${sliderNamespace}-nav-next`]"
                        aria-label="下一則"
                    >
                        <span class="sr-only">下一則</span>
                    </button>
                </div>
            </div>
            <a
                href="https://esg.businesstoday.com.tw/group_search/article?keywords=COP30直擊"
                class="more_btn block w-[80%] mt-10 ml-auto mr-auto overflow-hidden sm:w-[20rem]"
            >
                <img class="more_btn_img mx-auto" src="../assets/image/more_btn.png" alt="more_btn">
            </a>
        </div>
    </div>

</template>

<style scoped lang="scss">

    .single-article-wrap {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 2.5rem;
    }

    .single-card-box {
        width: 100%;
        max-width: 380px;

        :deep(.card) {
            width: 100%;
        }
    }

    .article-slider {
        position: relative;
        width: 100%;
    }

    .article-swiper {
        width: 85%;
        height: 100%;
        padding-bottom: 2.5rem;
    }

    .swiper-slide {
        display: flex;
        justify-content: center;
        align-items: stretch;
    }

    .more_btn{
        filter: drop-shadow(0 12px 24px rgba(0, 115, 140, 0.25));
    }

    .more_btn:hover{
        transition: .3s;
        transform: scale(1.1);
        filter: drop-shadow(0 16px 32px rgba(0, 115, 140, 0.35));
    }

    @media screen and (max-width: 1200px) {
        
    }
    @media screen and (max-width: 1024px) {
        
    }

    @media screen and (max-width: 640px) {
        
    }

    .slider-nav {
        position: absolute;
        inset: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        pointer-events: none;
        padding: 0 2rem;
    }

    .slider-nav-button {
        pointer-events: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3rem;
        height: 3rem;
        border-radius: 9999px;
        background-color: #ffffff;
        border: none;
        cursor: pointer;
        transition: background-color 0.2s ease, transform 0.2s ease;
        box-shadow: 0 20px 40px rgba(0, 115, 140, 0.2);
    }

    .slider-nav-button::before {
        content: '';
        display: inline-block;
        width: 0.625rem;
        height: 0.625rem;
        border: solid #00738c;
        border-width: 0 2px 2px 0;
    }

    .slider-nav-button:first-of-type::before {
        transform: rotate(135deg);
    }

    .slider-nav-button:last-of-type::before {
        transform: rotate(-45deg);
    }

    .slider-nav-button:hover {
        background-color: #fff;
        transform: scale(1.05);
    }

    .slider-nav-button.swiper-button-disabled {
        opacity: 0.35;
        cursor: default;
        transform: none;
    }

    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }

    @media screen and (max-width: 1024px) {
        .slider-nav {
            padding: 0 1.5rem;
        }
    }

    @media screen and (max-width: 640px) {
        .slider-nav {
            padding: 0 0rem;
        }
    }
</style>
