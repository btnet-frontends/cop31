<script setup>
    import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { Navigation } from 'swiper/modules';
    import 'swiper/css';
    import 'swiper/css/navigation';
    import { getImgUrl } from '../utils/utils';

    const props = defineProps({
        cardData: {
            type: [Array, Object],
            default: () => [],
        },
        variant: {
            type: String,
            default: 'horizontal', // 'horizontal' | 'vertical'
        },
        sliderId: {
            type: String,
            default: 'slider',
        },
    });

    const modules = [Navigation];
    const navigationOptions = computed(() => ({
        prevEl: `.${props.sliderId}-nav-prev`,
        nextEl: `.${props.sliderId}-nav-next`,
    }));

    const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 0);
    const isMobile = computed(() => windowWidth.value <= 768);

    const handleResize = () => {
        if (typeof window === 'undefined') return;
        windowWidth.value = window.innerWidth;
    };

    onMounted(() => {
        if (typeof window !== 'undefined') {
            windowWidth.value = window.innerWidth;
            window.addEventListener('resize', handleResize);
        }
    });

    onBeforeUnmount(() => {
        window.removeEventListener('resize', handleResize);
    });

    const slides = computed(() => {
        const list = Array.isArray(props.cardData)
            ? props.cardData
            : props.cardData
                ? [props.cardData]
                : [];

        return list.map((item, index) => {
            const source = item ?? {};
            const type = source.type ?? '';
            const title = source.title ?? '';
            const description = source.description ?? '';
            const url = source.url ?? '';
            const rawMobileImage = source.image ?? source.img ?? '';
            const rawDesktopImage = source.img2 ?? rawMobileImage;
            const chosenImage = isMobile.value ? rawMobileImage : rawDesktopImage;

            return {
                key: source.id ?? url ?? `${type || 'slide'}-${index}`,
                type,
                title,
                description,
                url,
                image: resolveImage(chosenImage),
                alt: source.alt ?? (title || 'article image'),
            };
        });
    });

    function resolveImage(image) {
        if (!image) return '';
        if (/^(https?:)?\/\//.test(image) || image.startsWith('data:')) {
            return image;
        }

        try {
            return getImgUrl(image);
        } catch (error) {
            return image;
        }
    }
</script>

<template>
    <div :class="['slider-wrapper', `slider--${variant}`]">
        <swiper
            class="mySwiper"
            :modules="modules"
            :navigation="navigationOptions"
            :loop="slides.length > 1"
        >
            <swiper-slide
                v-for="(slide, index) in slides"
                :key="slide.key ?? index"
            >
                <div class="slide-content">
                    <!-- 圖二垂直大卡片樣式 -->
                    <template v-if="variant === 'vertical'">
                        <a class="vertical-card" :href="slide.url || '#'" target="_blank" rel="noopener noreferrer">
                            <div v-if="slide.image" class="vertical-card__image">
                                <img :src="slide.image" :alt="slide.alt" loading="lazy" />
                            </div>
                            <div class="vertical-card__body">
                                <h3 v-if="slide.title" class="vertical-card__title" v-html="slide.title" />
                                <div class="vertical-card__line"></div>
                                <p v-if="slide.description" class="vertical-card__description" v-html="slide.description" />
                            </div>
                        </a>
                    </template>
                    <!-- 原本橫向大卡片樣式 -->
                    <template v-else>
                        <a :class="['card', slide.type === 'article3' ? 'type3' : '']" :href="slide.url || '#'">
                            <div v-if="slide.image" :class="['card__image', slide.type === 'article3' ? 'type3' : '']">
                                <img :src="slide.image" :alt="slide.alt" loading="lazy" />
                            </div>
                            <div class="card__body bg-white p-10 rounded-4xl">
                                <h3 v-if="slide.title" class="card__title" v-html="slide.title" />
                                <div class="line mt-1 mb-1"></div>
                                <p v-if="slide.description" class="card__description" v-html="slide.description" />
                                <a
                                    v-if="slide.url"
                                    class="card__action block w-[100%] mx-auto mt-5 sm:w-[68%]"
                                    :href="slide.url"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img src="../assets/image/more_article.png" class="w-full" alt="more_article">
                                </a>
                            </div>
                        </a>
                    </template>
                </div>
            </swiper-slide>
        </swiper>
        <div v-if="slides.length > 1" class="slider-nav z-10">
            <button
                type="button"
                :class="['slider-nav-button', `${sliderId}-nav-prev`, 'slider-nav-prev']"
                aria-label="上一則"
            >
                <span class="sr-only">上一則</span>
            </button>
            <button
                type="button"
                :class="['slider-nav-button', `${sliderId}-nav-next`, 'slider-nav-next']"
                aria-label="下一則"
            >
                <span class="sr-only">下一則</span>
            </button>
        </div>
        
    </div>
</template>

<style scoped lang="scss">
    .card {
        display: flex;
        flex-direction: column;
        height: 100%;
        border-radius: 24px;
        overflow: hidden;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        padding: 15px;
    }

    .card__image {
        position: relative;
        width: 70%;
        aspect-ratio: 3 / 2;
        background: #f0f4f5;
        overflow: hidden;
        border-radius: 30px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }




    .card__body {
        position: absolute;
        display: flex;
        flex-direction: column;
        width: 40%;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto 0;
        height: fit-content;
        gap: 16px;
        flex: 1 1 auto;
        color: #2f4f4f;
        text-align: justify;

        .line{
            border: 1px dashed #2f4f4f;
        }
    }

    .card__title {
        font-size: 1.5rem;
        font-weight: 700;
        line-height: 1.4;
        margin: 0;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
        color: #239dca;
    }

    .card__description {
        font-size: 1.0625rem;
        line-height: 1.7;
        margin: 0;
        color: #2f4f4f;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
    }

    .card__action {
        
        transition: opacity 0.2s ease;

        &:hover {
            opacity: 0.9;
        }

    }



    /*swiper*/
    .swiper {
        width: 85%;
        height: 100%;
    }

    .swiper-slide {
        /* Center slide text vertically */
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .swiper-slide img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .slider-wrapper {
        position: relative;
        width: 100%;
    }

    .slider-nav {
        position: absolute;
        inset: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 4rem;
        pointer-events: none;
        height: 100%;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        top: inherit;
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
        box-shadow: 0 28px 48px rgba(0, 115, 140, 0.12);
    }

    .slider-nav-button::before {
        content: '';
        display: inline-block;
        width: 0.625rem;
        height: 0.625rem;
        border: solid #00738c;
        border-width: 0 2px 2px 0;
    }

    .slider-nav-prev::before {
        transform: rotate(135deg);
    }

    .slider-nav-next::before {
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

    @media screen and (max-width: 1200px) {
        
    }
    @media screen and (max-width: 1024px) {
        .card__image{
            width: 100%;
        }
        .card__body {
            position: relative;
            padding: 20px;
            margin: 0 auto;
            width: 80%;
            margin-top: -2rem;
            text-align: left;
        }
        .card__title{
            font-size: 1.25rem;
        }
        .card__description{
            font-size: 1rem;
        }

        /* swiper */
        .swiper {
            width: 100%;
            height: 100%;
        }
        .slider-nav{
            height: 70%;
            margin: 0 auto;
            padding: 0 1%;
        }
    }

    /* ============================================================
       垂直大卡片模式（圖二樣式）
    ============================================================ */
    .slider--vertical {
        max-width: 860px;
        margin: 0 auto;
        position: relative;
        width: 100%;

        .mySwiper {
            width: calc(100% - 7.5rem);
            max-width: 720px;
            margin: 0 auto;
            overflow: hidden;
            padding: 10px 0 24px 0;
        }

        .slide-content {
            width: 100%;
            display: flex;
            justify-content: center;
        }

        .slider-nav {
            position: absolute;
            inset: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            pointer-events: none;
            padding: 0 0.5rem;
            width: 100%;
            height: 100%;
            top: 0;
            bottom: 0;
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
            box-shadow: 0 12px 28px rgba(0, 115, 140, 0.22);
            z-index: 20;

            &::before {
                content: '';
                display: inline-block;
                width: 0.625rem;
                height: 0.625rem;
                border: solid #00738c;
                border-width: 0 2px 2px 0;
            }

            &:first-of-type::before {
                transform: rotate(135deg);
            }

            &:last-of-type::before {
                transform: rotate(-45deg);
            }

            &:hover {
                background-color: #fff;
                transform: scale(1.06);
                box-shadow: 0 16px 36px rgba(0, 115, 140, 0.32);
            }

            &.swiper-button-disabled {
                opacity: 0.35;
                cursor: default;
                transform: none;
            }
        }
    }

    .vertical-card {
        display: flex;
        flex-direction: column;
        width: 100%;
        background: #ffffff;
        border-radius: 28px;
        overflow: hidden;
        box-shadow: none;
        text-decoration: none;
        cursor: pointer;

        &:hover {
            .vertical-card__image img {
                transform: scale(1.06);
            }
        }
    }

    .vertical-card__image {
        position: relative;
        width: 100%;
        aspect-ratio: 16 / 10;
        overflow: hidden;
        background: #e2e8f0;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
    }

    .vertical-card__body {
        padding: 28px 32px 32px;
        display: flex;
        flex-direction: column;
        background: #ffffff;
        text-align: left;
    }

    .vertical-card__title {
        font-size: 1.375rem;
        font-weight: 700;
        line-height: 1.45;
        color: #239dca;
        margin: 0;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
    }

    .vertical-card__line {
        border-top: 1px dashed #94a3b8;
        margin: 16px 0 14px 0;
        width: 100%;
    }

    .vertical-card__description {
        font-size: 0.95rem;
        line-height: 1.75;
        color: #334155;
        margin: 0;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
        text-align: justify;
    }

    @media screen and (max-width: 1024px) {
        .slider--vertical {
            max-width: 720px;

            .mySwiper {
                width: calc(100% - 6.5rem);
            }

            .slider-nav {
                padding: 0 0.25rem;
                height: 100%;
            }
        }
    }

    @media screen and (max-width: 768px) {
        .slider--vertical {
            max-width: 100%;

            .mySwiper {
                width: calc(100% - 4.5rem);
            }

            .slider-nav {
                padding: 0 0.15rem;
                height: 100%;
            }

            .slider-nav-button {
                width: 2.25rem;
                height: 2.25rem;

                &::before {
                    width: 0.5rem;
                    height: 0.5rem;
                }
            }
        }

        .vertical-card {
            border-radius: 20px;
        }

        .vertical-card__body {
            padding: 22px 18px 24px;
        }

        .vertical-card__title {
            font-size: 1.15rem;
            line-height: 1.4;
        }

        .vertical-card__line {
            margin: 12px 0 10px 0;
        }

        .vertical-card__description {
            font-size: 0.875rem;
            line-height: 1.6;
            -webkit-line-clamp: 3;
        }
    }

    @media screen and (max-width: 480px) {
        .slider--vertical {
            .mySwiper {
                width: calc(100% - 3.8rem);
            }

            .slider-nav {
                padding: 0 0rem;
            }

            .slider-nav-button {
                width: 2rem;
                height: 2rem;

                &::before {
                    width: 0.45rem;
                    height: 0.45rem;
                }
            }
        }

        .vertical-card {
            border-radius: 16px;
        }

        .vertical-card__body {
            padding: 16px 14px 18px;
        }

        .vertical-card__title {
            font-size: 1.05rem;
        }
    }
</style>
