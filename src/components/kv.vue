<script setup>
    import AOS from 'aos'
    import 'aos/dist/aos.css'

    import { getWindowWidth, getDivResize, isMobileDevice } from '../utils/utils'
    import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

    const props = defineProps({
        infoData: Object,
        kvReady: {
            type: Boolean,
            default: true   // 沒有傳入時直接顯示（不做入場動畫）
        }
    });

    const infoData = computed(() => props.infoData || {});

    const windowWidth = ref(0);
    const setDivResize = ref({});
    const isMobile = ref(false);

    // 動畫狀態：''=立即顯示 | 'kv_pending'=隱藏等待 | 'kv_animate'=播放入場動畫
    const animClass = ref(props.kvReady ? '' : 'kv_pending')

    watch(() => props.kvReady, (ready) => {
        if (ready && animClass.value === 'kv_pending') {
            animClass.value = 'kv_animate'
        }
    })

    const scrollY = ref(0);

    function handleScroll() {
        scrollY.value = window.pageYOffset || document.documentElement.scrollTop || 0;
    }

    function handleResize() {
        windowWidth.value = getWindowWidth();
        setDivResize.value = getDivResize('.kv_area');
        isMobile.value = isMobileDevice();
    }

    onMounted(() => {
        AOS.init()
        handleResize();
        window.addEventListener('resize', handleResize);
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
    });

    onUnmounted(() => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
    });

</script>

<template>
    <div :class="['kv_area z-30', animClass, { 'pc': windowWidth >= 1024 }, { 'mb': windowWidth <= 1024}]" :style="{minHeight: isMobile ? '667px' : ''}">
        <div class="kv_box z-50" :style="{ width: setDivResize.width + 'px', height: setDivResize.height + 'px' }">
            <div class="kv_head z-50">
                <img class="kv_big_title" src="../assets/image/main_img.png" alt="kv_big_title">

                <div class="kv_info" :style="{'--gap': (windowWidth <= 768 ? setDivResize.width/16 : windowWidth <= 1024 ? setDivResize.width/30 : setDivResize.width/50) + 'px'}">
                    <div class="big_title">
                        <h1 :style="{fontSize: (windowWidth <= 1024 ? windowWidth <= 768 ? setDivResize.width/8 : setDivResize.width/9 : setDivResize.width/18) + 'px'}" v-html="infoData.title"></h1>
                    </div>
                    <div class="kv_subtitle_row">
                        <div class="subtittle" :style="{fontSize: (windowWidth <= 1024 ? windowWidth <= 768 ? setDivResize.width/32 : setDivResize.width/38 : setDivResize.width/55) + 'px'}">
                            <p>全球用電需求持續增加，極端天氣也頻頻考驗城市韌性</p>
                            <p>COP31聚焦全球電氣化、廢棄物減半等6大目標</p>
                            <p>如何加速能源轉型、提升城市韌性？</p>
                        </div>
                        <img class="kv_map" src="../assets/image/map_kv.svg" alt="map" :style="{width: (windowWidth <= 768 ? setDivResize.width/2.2 : windowWidth <= 1024 ? setDivResize.width/3 : setDivResize.width/5) + 'px'}">
                    </div>
                </div>
            </div>


        </div>
        <img src="../assets/image/city.png" class="kv_city" alt="city">
        <img
            src="../assets/image/tower.png"
            class="kv_tower"
            alt="tower"
            :style="{ transform: `translate3d(0, ${scrollY * 0.75}px, 0)` }"
        />
        <img src="../assets/image/grass01.png" class="grass01 pc z-40 w-full absolute bottom-0" alt="grass01">

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
        left: 0;
        right: 0;
        top: 5%;
        bottom: 0;
        margin: auto;
    }

    .kv_head{
        position: absolute;
        display: block;
        width: 68%;
        left: 0;
        right: 0;
        top: -45%;
        margin: 0 auto;
    }

    .kv_big_title{
        display: block;
        width: 100%;
        height: auto;
    }

    .kv_info{
        --gap: 20px;                 
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        text-align: right;
        padding-right: 10%;          
    }

    .big_title{
        color: #fff;
        font-weight: 700;
        letter-spacing: 10px;
        margin-top: var(--gap);
        margin-right: -10px;        
        white-space: nowrap;
        text-shadow: 0 0 20px #00114f;
    }

    .big_title h1{
        line-height: 1;             
    }

    .big_title :deep(br){
        display: none;
    }

    .kv_subtitle_row{
        position: relative;        
        margin-top: var(--gap);
    }


    .kv_map{
        position: absolute;
        right: calc(100% - 1.5em);
        top: 50%;
        transform: translateY(-50%);
        height: auto;
        z-index: 0;
        pointer-events: none;
    }

    .subtittle{
        position: relative;
        z-index: 1;
        color: #52ffe6;
        font-weight: 500;
        letter-spacing: 2px;
        line-height: 1.6;
        text-align: right;
        text-shadow: 0 0 4px #000;
    }

    .subtittle p{
        white-space: nowrap;        
    }

    .kv_city{
        position: absolute;
        display: block;
        left: 0;
        bottom: 0;
        width: 100%;
        height: auto;
        max-height: 100%;           
        object-fit: contain;
        object-position: center bottom;
        z-index: 35;              
        pointer-events: none;
    }

    .kv_tower{
        position: absolute;
        display: block;
        left: 16%;
        bottom: -10%;
        transform-origin: center bottom;
        width: auto;
        height: 100%;
        z-index: 38;
        pointer-events: none;
        will-change: transform;
    }





    @media screen and (max-width:1550px) {
        .kv_area{
            margin-top: 55px;
            height: calc(100vh - 55px);
        }
    }

    @media screen and (max-width:1024px) {

        .kv_area.mb{
            min-height: 900px;
        }

        .kv_box {
            top: -9%;
        }

        .kv_head{
            width: 60%;
            top: -5%;
        }

        .kv_big_title{
            content: url('../assets/image/main_phone.png') !important;
            max-width: none;
        }

        .kv_city{
            content: url('../assets/image/city_mb.png') !important;
        }

        .kv_info{
            align-items: center;
            text-align: center;
            padding-right: 0;
        }

        .big_title{
            margin-right: -10px;
        }

        .big_title :deep(br){
            display: block;
        }

        .subtittle{
            text-align: center;
            letter-spacing: 0;
        }

        .subtittle p{
            white-space: normal;
        }

        .kv_map{
            position: static;
            display: block;
            transform: none;
            margin: var(--gap) auto 0;
        }

        .kv_tower{
            height: 60%;
            left: 5%;
            bottom: 0;
        }
    }

    @media screen and (max-width:820px) {
        .kv_area.mb{
            min-height: 1125px;
        }
    }

    @media screen and (max-width: 768px) {
        .kv_area.mb{
            min-height: 700px;
        }

        .kv_box {
            top: -12%;
        }

        .kv_head{
            width: 71%;
            top: -5%;
        }

        .big_title{
            line-height: 12vw;
            letter-spacing: 5px;
            margin-right: -5px;
        }

        .kv_tower{
            height: 48%;
            left: 2%;
            bottom: 0;
        }
    }

    @media screen and (max-width: 560px){

        .kv_head{
            top: -10%;
        }
    }


    @keyframes kvFadeUp {
        from { opacity: 0; transform: translateY(28px); }
        to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes kvFadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    .kv_area.kv_pending .kv_city,
    .kv_area.kv_pending .grass01,
    .kv_area.kv_pending .kv_tower,
    .kv_area.kv_pending .kv_big_title,
    .kv_area.kv_pending .big_title,
    .kv_area.kv_pending .subtittle p,
    .kv_area.kv_pending .kv_map {
        opacity: 0;
    }

    .kv_area.kv_animate .kv_city      { animation: kvFadeIn 0.8s ease 0.0s  both; }
    .kv_area.kv_animate .grass01      { animation: kvFadeIn 0.8s ease 0.0s both; }
    .kv_area.kv_animate .kv_tower     { animation: kvFadeIn 0.8s ease 0.4s both; }
    .kv_area.kv_animate .kv_big_title { animation: kvFadeUp 1.0s ease 0.3s  both; }
    .kv_area.kv_animate .big_title    { animation: kvFadeUp 0.9s ease 0.9s  both; }
    .kv_area.kv_animate .subtittle p  { animation: kvFadeUp 0.8s ease 1.4s both; }
    .kv_area.kv_animate .kv_map       { animation: kvFadeIn 0.8s ease 1.4s both; }
</style>
