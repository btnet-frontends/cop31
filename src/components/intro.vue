<script setup>

    import AOS from 'aos'
    import 'aos/dist/aos.css'
    
    import { onMounted } from 'vue'

    import Title from './Title.vue'
    import introEn from '../assets/image/LiveDirect.png'

    defineProps(
        {
            infoData: Object
        }
    );

    onMounted(() => {
        AOS.init()
    });

</script>

<template>
    <div class="content_wrap">
        <!-- 最上方英文標題圖 -->
        <img :src="introEn" alt="Live & Direct" class="intro_en" />

        <Title :infoData="infoData" />

        <div class="intro_box max-w-[980px] px-10 pt-6 pb-10 mx-auto">
            <div
                v-for="(item, index) in infoData.text"
                :key="index"
                class="intro_text"
            >
                <p>{{ item }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .intro_en{
        display: block;
        margin: 0 auto;
        width: 100%;
        max-width: 420px;
        padding-top: 1rem;
    }

    .intro_text{
        font-size: 1.125rem;      // 約 18px,小字
        font-weight: 400;
        color: #b8fff6;
        margin-bottom: 3rem;      // 段落之間空一大段
        letter-spacing: 3px;
        text-align: justify;
        line-height: 2;

        &:last-child{
            margin-bottom: 0;
        }
    }

    .right_leaf{
        position: absolute;
        display: block;
        z-index: 2;
        right: 2%;
        top: 5%;
        width: 15%;
        transform: rotate(180deg);
    }
    .left_leaf{
        position: absolute;
        display: block;
        z-index: 2;
        left: 2%;
        bottom: 35%;
        transform: rotate(180deg);
        width: 15%;
    }

    @media screen and (max-width: 1366px) {
        .left_leaf{
            display: none;
        }
    }
    @media screen and (max-width: 1024px) {
        .intro_en{
            max-width: 300px;
        }
        .intro_text{
            font-size: 1rem;
            margin-bottom: 2rem;
            letter-spacing: 1px;
        }
        .right_leaf{
            display: none;
        }
    }
</style>