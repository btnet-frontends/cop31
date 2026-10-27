<script setup>
import LivePhotoGallery from '../assets/image/LivePhotoGallery.png'
import Introduction from '../assets/image/Introduction.png'
import Highlights from '../assets/image/Highlights.png'
import ExpertViews from '../assets/image/ExpertViews.png'
import ContextHistory from '../assets/image/ContextHistory.png'
import LiveDirect from '../assets/image/LiveDirect.png'
import History from '../assets/image/History.png'
import Effects from '../assets/image/Effects.png'
import ReportLnsights from '../assets/image/ReportLnsights.png'

const engImgMap = {
    'LivePhotoGallery.png': LivePhotoGallery,
    'Introduction.png': Introduction,
    'Highlights.png': Highlights,
    'ExpertViews.png': ExpertViews,
    'ContextHistory.png': ContextHistory,
    'LiveDirect.png': LiveDirect,
    'History.png': History,
    'Effects.png': Effects,
    'ReportLnsights.png': ReportLnsights,
}

defineProps(
    {
        infoData: Object
    }
);
</script>

<template>
    <div class="title_area w-full text-center pb-[35px] pl-[25px] pr-[25px]">
            <div class="title_box w-fit py-3 mx-auto">
                <h1 :style="{ color: infoData.titleColor || '#fff' }" class="title text-4xl sm:text-5xl">
                    <span class="dash dash-left">-</span>
                    <span class="title-text" v-html="infoData.title"></span>
                    <span class="dash dash-right">-</span>
                </h1>
                <p :class="['subtitle text-white mt-3 text-xl sm:text-2xl',infoData.title2 ? 'block' : 'hidden' ]">{{ infoData.title2 }}</p>
            </div>
            <img
                v-if="infoData.engImg && engImgMap[infoData.engImg]"
                :src="engImgMap[infoData.engImg]"
                class="eng_img mx-auto mt-1"
                alt="english title"
            />
            <p v-if="infoData.id==='picture2'&&infoData.subtitle" class="mt-2 text-md text-[#272727]">{{ infoData.subtitle }}</p>
    </div>
</template>

<style scoped>
    .title {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5em;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.35);
    }

    .dash {
        flex-shrink: 0;
        line-height: 1;
        align-self: center;
    }

    .title-text {
        text-align: center;
        line-height: 1.35;
    }

    /* 允許 big_title_br 在所有尺寸生效 */
    .title-text :deep(.big_title_br) {
        display: block;
    }

    /* 普通 <br>（不含 class）只在小螢幕顯示 */
    .title-text :deep(br:not(.big_title_br)) {
        display: none;
    }

    @media screen and (max-width: 640px) {
        .title-text :deep(br:not(.big_title_br)) {
            display: block;
        }
    }

    .subtitle{
        letter-spacing: 3px;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
    }

    .eng_img {
        max-width: 420px;
        width: 70%;
        opacity: 0.55;
        margin-top: -6px;
    }

    @media screen and (max-width: 640px){
        .eng_img {
            width: 80%;
        }
    }
</style>