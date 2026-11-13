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
    768: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 3, spaceBetween: 24 },
};
</script>

<template>
    <div class="content_wrap">
        <Title :infoData="infoData" />
        <div class="article2_box max-w-[1366px] px-3 py-8 sm:px-6 md:px-8 lg:p-10 mx-auto" data-aos="fade-up" data-aos-delay="0" data-aos-duration="1000">
           <div v-if="articles.length" class="article-slider">
                <div class="unified-slider-box" :class="{ 'no-nav': articles.length <= 3 }">
                    <Swiper
                        class="article-swiper"
                        :modules="modules"
                        :navigation="navigationOptions"
                        :breakpoints="breakpoints"
                        :spaceBetween="24"
                        :slidesPerView="1"
                        :loop="articles.length > 3"
                    >
                        <SwiperSlide
                            v-for="(article, index) in articles"
                            :key="article.id ?? `${article.title ?? 'article'}-${index}`"
                        >
                            <Card :cardData="article" :transparent="true" />
                        </SwiperSlide>
                    </Swiper>
                </div>
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
                href="https://esg.businesstoday.com.tw/group_search/article?keywords=COP31背景"
                class="more_btn block w-[80%] mt-10 ml-auto mr-auto overflow-hidden sm:w-[20rem]"
            >
                <img class="more_btn_img mx-auto" src="../assets/image/more_btn.png" alt="more_btn">
            </a>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .article-slider {
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .unified-slider-box {
        width: calc(100% - 7.5rem);
        max-width: 1200px;
        margin: 0 auto;
        background-color: rgba(255, 255, 255, 0.9);
        border-radius: 28px;
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        padding: 30px 24px 34px;
        position: relative;
        z-index: 10;
        overflow: hidden;

        &.no-nav {
            width: 100%;
        }

        :deep(.card) {
            background: transparent;
            box-shadow: none;
            padding: 0;
            border-radius: 0;

            &:hover {
                transform: none;
                box-shadow: none;

                .card__image img {
                    transform: scale(1.05);
                }
            }

            .card__body {
                padding: 16px 2px 0;
            }
        }
    }

    .article-swiper {
        width: 100%;
        height: 100%;
        padding-bottom: 0;
    }

    .swiper-slide {
        display: flex;
        justify-content: center;
        align-items: stretch;
        height: auto;
    }

    .more_btn {
        filter: drop-shadow(0 12px 24px rgba(0, 115, 140, 0.25));
    }

    .more_btn:hover {
        transition: .3s;
        transform: scale(1.05);
        filter: drop-shadow(0 16px 32px rgba(0, 115, 140, 0.35));
    }

    .slider-nav {
        position: absolute;
        inset: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        pointer-events: none;
        padding: 0 0.75rem;
        z-index: 20;
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
        transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        box-shadow: 0 12px 28px rgba(0, 115, 140, 0.25);
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
        .unified-slider-box {
            width: calc(100% - 6.5rem);
            padding: 24px 20px 28px;
            border-radius: 24px;

            &.no-nav {
                width: 100%;
            }
        }

        .slider-nav {
            padding: 0 0.5rem;
        }
    }

    @media screen and (max-width: 768px) {
        .unified-slider-box {
            width: calc(100% - 4.5rem);
            padding: 20px 16px 24px;
            border-radius: 20px;

            &.no-nav {
                width: 100%;
            }
        }

        .slider-nav {
            padding: 0 0.25rem;
        }

        .slider-nav-button {
            width: 2.25rem;
            height: 2.25rem;
        }

        .slider-nav-button::before {
            width: 0.5rem;
            height: 0.5rem;
        }
    }

    @media screen and (max-width: 480px) {
        .unified-slider-box {
            width: calc(100% - 3.6rem);
            padding: 16px 12px 20px;
            border-radius: 16px;

            &.no-nav {
                width: 100%;
            }
        }

        .slider-nav {
            padding: 0 0rem;
        }

        .slider-nav-button {
            width: 2rem;
            height: 2rem;
        }

        .slider-nav-button::before {
            width: 0.45rem;
            height: 0.45rem;
        }
    }
</style>