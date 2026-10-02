<script setup>
    import AOS from 'aos'
    import 'aos/dist/aos.css'

    import { getWindowWidth, getDivResize, getImgUrl, isMobileDevice } from '../utils/utils'
    import { ref, onMounted, onUnmounted, computed, watch } from 'vue'


    const props = defineProps({
        infoData: Object
    });

    const infoData = computed(() => props.infoData || {});

    const windowWidth = ref(0);
    const setDivResize = ref({});
    const currentSlide = ref(0);
    const autoSlideTimer = ref(null);
    const isMobile = ref(false);

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

    const kvPictureItemStyle = computed(() => {
        if (showMobileSlider.value) {
            return {
                width: '100%',
                height: 'auto',
                maxWidth: '60%',
                flex: '1 1 auto'
            };
        }

        if (!setDivResize.value?.width) {
            return {};
        }

        return {
            width: `${setDivResize.value.width / 6}px`,
            height: `${setDivResize.value.width / 9}px`
        };
    });

    const currentSlideImg = computed(() => kvSlides.value[currentSlide.value] || null);

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
        if (manual) {
            restartAutoSlide();
        }
    }

    function prevSlide(manual = false) {
        const total = kvSlides.value.length;
        if (total <= 1) return;
        currentSlide.value = (currentSlide.value - 1 + total) % total;
        if (manual) {
            restartAutoSlide();
        }
    }

    function startAutoSlide() {
        if (autoSlideTimer.value || kvSlides.value.length <= 1 || !showMobileSlider.value) {
            return;
        }
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
        setDivResize.value = getDivResize('.kv_area');

        isMobile.value = isMobileDevice();

        // console.log('setDivResize:', setDivResize.value.width);
        // console.log('setDivResize:', setDivResize.value.height);
    }

    onMounted(() => {
        AOS.init()
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
    <div :class="['kv_area z-30', { 'pc': windowWidth >= 1024 }, { 'mb': windowWidth <= 1024}]" :style="{minHeight: isMobile ? '667px' : ''}">
        <div class="kv_box z-50" :style="{ width: setDivResize.width + 'px', height: setDivResize.height + 'px' }" data-aos="fade-up" data-aos-delay="500" data-aos-duration="1000">
            <img class="kv_big_title z-50" src="../assets/image/main_img.png" alt="kv_big_title">
            <div class="big_title" :style="{color: infoData.titleColor, borderBottom: '4px solid ' + infoData.titleColor}">
                <h1 :style="{fontSize: (windowWidth <= 1024 ? windowWidth <= 768 ? setDivResize.width/8 : setDivResize.width/9 : setDivResize.width/14) + 'px'}" v-html="infoData.title"></h1>
            </div>
            <div class="subtittle z-50" :style="{color: infoData.subtitleColor,fontSize: (windowWidth <= 1024 ? windowWidth <= 768 ? setDivResize.width/25 : setDivResize.width/30 : setDivResize.width/40) + 'px'}">
                <p>{{ infoData.subtitle }}</p>
            </div>
            <div class="kv_picture_box z-50">
                <a class="kv_picture_header" href="#picture">
                    <div class="kv_picture_label" :style="{fontSize: (windowWidth <= 1024 ? windowWidth <= 768 ? setDivResize.width/25 : setDivResize.width/40 : setDivResize.width/50) + 'px', color: infoData.labelColor}">
                        <p>
                            {{ infoData.label }}
                        </p>
                        <img class="arrow_down" src="../assets/image/arrow.png" alt="arrow">
                    </div>
                </a>
                <div class="kv_picture_content" :class="{ 'is-slider': showMobileSlider }">
                    <!-- <button
                        v-if="showMobileSlider && kvSlides.length > 1"
                        class="kv_slider_button prev"
                        type="button"
                        @click="prevSlide(true)"
                        :disabled="kvSlides.length <= 1"
                        aria-label="上一張">
                        <span aria-hidden="true">‹</span>
                    </button> -->
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
                    <!-- <button
                        v-if="showMobileSlider && kvSlides.length > 1"
                        class="kv_slider_button next"
                        type="button"
                        @click="nextSlide(true)"
                        :disabled="kvSlides.length <= 1"
                        aria-label="下一張">
                        <span aria-hidden="true">›</span>
                    </button> -->
                </div>
            </div>
        </div>
        <div class="frame01_mb z-30"></div>
        <div class="frame02_mb z-30"></div>
        <img src="../assets/image/grass01.png" class="grass01 pc z-40 w-full absolute bottom-0" alt="grass01">
        <div class="frame01 z-30"></div>
        <div class="frame02 z-30"></div>
        <div class="frame03 frame03-1 z-20"></div>
        <div class="frame03 frame03-2 z-20"></div>
    </div>
</template>

<style scoped>
    .kv_area{
        position: relative;
        display: block;
        width: 100%;
        height: calc(100vh - 80px);
        background: url('../assets/image/bg.jpg') fixed center center no-repeat;
        background-size: cover;
        margin-top: 80px;
    }

    .kv_area.pc{
        min-height: 580px;
    }

    .kv_box{
        position: absolute;
        display: block;
        /* border: 1px solid #000; */
        left: 0;
        right: 0;
        top: 5%;
        bottom: 0;
        margin: auto;
    }

    .kv_big_title{
        position: absolute;
        display: block;
        width: 80%;
        left: 0;
        right: 0;
        top: -45%;
        margin: 0 auto;
        z-index: 4;
    }

    .big_title{
        position: absolute;
        display: block;
        width: fit-content;
        left: 0;
        right: 0;
        top: 10%;
        margin: auto;
        text-align: center;
        z-index: 5;
        font-weight: 700;
        letter-spacing: 10px;
        padding: 10px 30px 10px 30px;
        white-space: nowrap;
    }

     .big_title :deep(br){
            display: none;
        }

    .subtittle{
        position: absolute;
        display: block;
        width: 69%;
        left: 0;
        right: 0;
        top: 50%;
        margin: auto;
        text-align: center;
        z-index: 5;
        font-weight: 500;
        letter-spacing: 5px;
        padding: 10px 10px 10px 10px;
    }

    .kv_picture_box{
        position: absolute;
        display: block;
        width: fit-content;
        height: fit-content;
        left: 0;
        right: 0;
        top: 85%;
        margin: 0 auto;
    }

    .kv_picture_header{
        position: relative;
        display: block;
        width: fit-content;
        height: fit-content;
        margin: 0 auto;
        text-align: center;
    }

    .kv_picture_label{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: fit-content;
        padding: 5px 40px 5px 40px;
        border-radius: 50px;
        font-weight: 600;
        letter-spacing: 3px;
        background: #B0DB61;
        background: linear-gradient(-35deg, rgba(176, 219, 97, 1) 34%, rgba(110, 203, 142, 1) 100%);
    
    }

    .arrow_down{
        width: 30px;
        height: 30px;
        margin-left: 5px;
        animation: arrowMove 1.5s infinite;
    }
    @keyframes arrowMove {
        0% { transform: translateY(0); }
        50% { transform: translateY(5px); }
        100% { transform: translateY(0); }
    }

    .kv_picture_content{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: fit-content;
        height: fit-content;
        margin: 30px auto 0 auto;
        gap: 40px;
    }

    .kv_picture_content.is-slider{
        width: 100%;
        max-width: 420px;
        margin: 30px auto 0;
        gap: 0;
    }

    .kv_picture_track{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 40px;
    }

    .kv_picture_img{
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .kv_single{
        width: 100%;
    }

    .kv_slider_button{
        display: none;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        border: none;
        background: rgba(0, 0, 0, .45);
        color: #fff;
        font-size: 28px;
        line-height: 1;
        cursor: pointer;
        transition: background .2s ease;
    }

    .kv_slider_button:disabled{
        opacity: .4;
        cursor: default;
    }

    .kv_slider_button:not(:disabled):hover{
        background: rgba(0, 0, 0, .65);
    }

    .kv-fade-enter-active,
    .kv-fade-leave-active{
        transition: opacity .6s ease;
    }

    .kv-fade-enter-from,
    .kv-fade-leave-to{
        opacity: 0;
    }

    .kv_picture_item{
        position: relative;
        display: block;
        overflow: hidden;
        border-radius: 25px;
        border: 4px solid#B0DB61;
        background-color: #fff;
    }

    .kv_picture_item:hover{
        cursor: pointer;
        transform: scale(1.05);
        transition: .3s;
        box-shadow: 0 0 15px #B0DB61;
    }

    .frame01{
        position: absolute;
        display: block;
        left: 0;
        max-width: 250px;
        width: 20%;
        height: 100%;
        background: url("../assets/image/frame01.png") left center repeat-y;
        background-size: cover;
    }

    .frame02{
        position: absolute;
        display: block;
        right: 0;
        max-width: 250px;
        width: 20%;
        height: 100%;
        background: url("../assets/image/frame02.png") right center repeat-y;
        background-size: contain;
    }

    .frame03{
        position: absolute;
        display: block;
        width: 250px;
        width: 18%;
        height: 100%;
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

    .frame01_mb{
        display: none;
    }

    .frame02_mb{
        display: none;
    }



    @media screen and (max-width:1550px) {
        .kv_area{
            margin-top: 55px;
            height: calc(100vh - 55px);
        }
    }

    @media screen and (max-width:1280px) {
        /* .kv_box {
            top: -5%;
        } */
    }

    @media screen and (max-width:1024px) {

        .kv_area.mb{
            min-height: 1355px;
        }

        .kv_box {
            top: -9%;
        }

        .kv_big_title{
            content: url('../assets/image/main_phone.png') !important;
            width: 60%;
            max-width: none;
            top: -5%;
            margin: auto;
        }

        .big_title{
            top: 40%;
        }

        .big_title :deep(br){
            display: block;
        }

        .subtittle{
            top: 75%;
            width: 60%;
            letter-spacing: 0;
        }

        .kv_picture_box{
            top: 90%;
            width: 100%;
        }

        .kv_picture_content{
            width: 100%;
            max-width: 420px;
            margin: 30px auto 0;
            overflow: hidden;
            gap: 0;
        }

        .kv_picture_content.is-slider{
            position: relative;
        }

        .kv_picture_track{
            width: 100%;
            gap: 0;
        }

        .kv_picture_item{
            position: relative;
            flex: 0 0 100%;
        }

        .kv_slider_button{
            display: flex;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 2;
        }

        .kv_slider_button.prev{
            left: 12px;
        }

        .kv_slider_button.next{
            right: 12px;
        }

        .kv_picture_img{
            height: auto;
        }

        .kv_single{
            flex: 1 1 auto;
        }

        .kv_picture_item:hover{
            transform: none;
            box-shadow: none;
        }

        .frame01{
            display: none;
        }

        .frame02{
            display: none;
        }

        .frame03{
            display: none;
        }

        .frame01_mb{
            position: absolute;
            display: block;
            top: 0;
            width: 100%;
            height: 250px;
            background: url('../assets/image/frame01_mb.png') top center no-repeat;
            background-size: contain;
        }
        .frame02_mb{
            position: absolute;
            display: block;
            bottom: 0;
            width: 100%;
            height: 200px;
            background: url('../assets/image/frame02_mb.png') bottom center repeat-x;
            background-size: contain;
        }

    }

    @media screen and (max-width:820px) {
        .kv_area.mb{
            min-height: 1125px;
        }
    }

    @media screen and (max-width: 768px) {
        .kv_area.mb{
            min-height: 966px;
        }

        .kv_box {
            top: -12%;
        }

        .kv_big_title{
            width: 71%;
            top: -5%;
        }
        .big_title{
            top: 45%;
            line-height: 12vw;
            padding: 5px 10px 5px 10px;
        }
        .subtittle{
            top: 78%;
            width: 69%;
        }

        .kv_picture_box{
            top: 96%;
        }

        .kv_picture_label{
            padding: 5px 23px 5px 23px;
        }

        .kv_picture_content.is-slider{
            margin: 20px auto 0;
        }

        .arrow_down{
            width: 15px;
            height: 15px;
        }
    }

    @media screen and (max-width: 560px){
        
        .kv_big_title{
            top: -10%;
        }
        .big_title{
            top: 40%;
        }
        .subtittle{
            top: 75%;
            width: 75%;
        }
    }
</style>
