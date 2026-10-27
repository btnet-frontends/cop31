<script setup>
    import { getWindowWidth, getImgUrl } from '../utils/utils'
    import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

    const props = defineProps({
        infoData: Object
    });

    const infoData = computed(() => props.infoData || {});

    const windowWidth = ref(0);
    const currentSlide = ref(0);
    const autoSlideTimer = ref(null);

    const showMobileSlider = computed(() => windowWidth.value <= 1024);
    const kvSlides = computed(() => {
        const data = infoData.value;
        const slides = [];
        if (data?.img1) slides.push(data.img1);
        if (data?.img2) slides.push(data.img2);
        if (data?.img3) slides.push(data.img3);
        return slides;
    });

    const desktopZClasses = ['z-40', 'z-30', 'z-20', 'z-10'];

    // 直接用 windowWidth 計算，等同原本抓 .kv_area（全寬）的效果
    const kvPictureItemStyle = computed(() => {
        if (showMobileSlider.value) {
            return {
                width: '100%',
                height: 'auto',
                maxWidth: '60%',
                flex: '1 1 auto'
            };
        }
        const w = windowWidth.value;
        return {
            width: `${w / 6}px`,
            height: `${w / 9}px`
        };
    });

    const currentSlideImg = computed(() => kvSlides.value[currentSlide.value] || null);

    const labelFontSize = computed(() => {
        const w = windowWidth.value;
        if (w <= 768) return (w / 25) + 'px';
        if (w <= 1024) return (w / 40) + 'px';
        return (w / 50) + 'px';
    });

    function getDesktopZClass(index) {
        return desktopZClasses[index] || desktopZClasses[desktopZClasses.length - 1];
    }

    function restartAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }

    function nextSlide(manual = false) {
        const total = kvSlides.value.length;
        if (total <= 1) return;
        currentSlide.value = (currentSlide.value + 1) % total;
        if (manual) restartAutoSlide();
    }

    function startAutoSlide() {
        if (autoSlideTimer.value || kvSlides.value.length <= 1 || !showMobileSlider.value) return;
        autoSlideTimer.value = setInterval(() => {
            nextSlide();
        }, 8000);
    }

    function stopAutoSlide() {
        if (autoSlideTimer.value) {
            clearInterval(autoSlideTimer.value);
            autoSlideTimer.value = null;
        }
    }

    function handleResize() {
        windowWidth.value = getWindowWidth();
    }

    onMounted(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
    });

    onUnmounted(() => {
        window.removeEventListener('resize', handleResize);
        stopAutoSlide();
    });

    watch(
        showMobileSlider,
        (isMobile) => {
            if (!isMobile) {
                currentSlide.value = 0;
                stopAutoSlide();
            } else {
                startAutoSlide();
            }
        },
        { immediate: true }
    );

    watch(
        () => kvSlides.value.length,
        (total) => {
            if (currentSlide.value >= total) {
                currentSlide.value = Math.max(total - 1, 0);
            }
            if (total <= 1) {
                stopAutoSlide();
            } else {
                startAutoSlide();
            }
        },
        { immediate: true }
    );
</script>

<template>
    <div class="kv_picture_section">
        <div class="kv_picture_box">
            <a class="kv_picture_header" href="#picture">
                <div class="kv_picture_label" :style="{ fontSize: labelFontSize, color: infoData.labelColor }">
                    <p>{{ infoData.label }}</p>
                    <img class="arrow_down" src="../assets/image/arrow.png" alt="arrow">
                </div>
            </a>
            <div class="kv_picture_content" :class="{ 'is-slider': showMobileSlider }">
                <a
                    v-if="showMobileSlider && currentSlideImg"
                    href="#picture"
                    class="kv_picture_item kv_single"
                    :style="kvPictureItemStyle">
                    <transition name="kv-fade" mode="out-in">
                        <img
                            v-if="currentSlideImg"
                            :key="`${currentSlide}-${currentSlideImg}`"
                            class="kv_picture_img"
                            :src="getImgUrl(currentSlideImg)"
                            alt="kv_picture_img" />
                    </transition>
                </a>
                <div v-if="!showMobileSlider" class="kv_picture_track">
                    <a
                        v-for="(img, index) in kvSlides"
                        :key="`${img}-${index}`"
                        href="#picture"
                        :class="['kv_picture_item', getDesktopZClass(index)]"
                        :style="kvPictureItemStyle">
                        <img class="kv_picture_img" :src="getImgUrl(img)" alt="kv_picture_img" />
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .kv_picture_section {
        position: relative;
        width: 100%;
        padding: 40px 20px 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .kv_picture_box {
        position: relative;
        display: block;
        width: fit-content;
        height: fit-content;
        margin: 0 auto;
    }

    .kv_picture_header {
        position: relative;
        display: block;
        width: fit-content;
        height: fit-content;
        margin: 0 auto;
        text-align: center;
    }

    .kv_picture_label {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: fit-content;
        padding: 5px 40px 5px 40px;
        border-radius: 50px;
        font-weight: 600;
        letter-spacing: 3px;
        background: #1e5abc;
    }

    .arrow_down {
        width: 30px;
        height: 30px;
        margin-left: 5px;
        animation: arrowMove 1.5s infinite;
    }

    @keyframes arrowMove {
        0%   { transform: translateY(0); }
        50%  { transform: translateY(5px); }
        100% { transform: translateY(0); }
    }

    .kv_picture_content {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: fit-content;
        height: fit-content;
        margin: 30px auto 0 auto;
        gap: 40px;
    }

    .kv_picture_content.is-slider {
        width: 100%;
        max-width: 420px;
        margin: 30px auto 0;
        gap: 0;
    }

    .kv_picture_track {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 40px;
    }

    .kv_picture_img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .kv_single {
        width: 100%;
    }

    .kv-fade-enter-active,
    .kv-fade-leave-active {
        transition: opacity .6s ease;
    }

    .kv-fade-enter-from,
    .kv-fade-leave-to {
        opacity: 0;
    }

    .kv_picture_item {
        position: relative;
        display: block;
        overflow: hidden;
        background-color: #fff;
    }

    .kv_picture_item::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgb(0, 170, 255) 0%, rgba(22, 135, 197, 0) 50%);
        pointer-events: none;
        z-index: 1;
    }

    .kv_picture_item:hover {
        cursor: pointer;
        transform: scale(1.05);
        transition: .3s;
        box-shadow: 0 0 15px #1e5abc;
    }

    /* ── 響應式 ── */
    @media screen and (max-width: 1024px) {
        .kv_picture_section {
            padding: 30px 16px 40px;
        }

        .kv_picture_box {
            width: 100%;
        }

        .kv_picture_content {
            width: 100%;
            max-width: 420px;
            margin: 30px auto 0;
            overflow: hidden;
            gap: 0;
        }

        .kv_picture_content.is-slider {
            position: relative;
        }

        .kv_picture_track {
            width: 100%;
            gap: 0;
        }

        .kv_picture_item {
            position: relative;
            flex: 0 0 100%;
        }

        .kv_picture_img {
            height: auto;
        }

        .kv_single {
            flex: 1 1 auto;
        }

        .kv_picture_item:hover {
            transform: none;
            box-shadow: none;
        }
    }

    @media screen and (max-width: 768px) {
        .kv_picture_section {
            padding: 20px 12px 30px;
        }

        .kv_picture_label {
            padding: 5px 23px 5px 23px;
        }

        .kv_picture_content.is-slider {
            margin: 20px auto 0;
        }

        .arrow_down {
            width: 15px;
            height: 15px;
        }
    }
</style>
