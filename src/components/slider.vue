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
    });

    const modules = [Navigation];
    const navigationOptions = {
        prevEl: '.slider-nav-prev',
        nextEl: '.slider-nav-next',
    };

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
    <div class="slider-wrapper">
        <swiper
            class="mySwiper"
            :modules="modules"
            :navigation="navigationOptions"
            loop
        >
            <swiper-slide
                v-for="(slide, index) in slides"
                :key="slide.key ?? index"
            >
                <div class="slide-content">
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
                </div>
            </swiper-slide>
        </swiper>
        <div class="slider-nav z-10">
            <button type="button" class="slider-nav-button slider-nav-prev" aria-label="上一則">
                <span class="sr-only">上一則</span>
            </button>
            <button type="button" class="slider-nav-button slider-nav-next" aria-label="下一則">
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

    .card__image.type3{
        border: 4px solid #b0db61;
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
        color: #00738c;
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
        background-color: #b0db61;
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
</style>
