<script setup>
    import AOS from 'aos'
    import 'aos/dist/aos.css'
    import { onMounted } from 'vue';

    import Title from './Title.vue'
    import Slider from './slider.vue';


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
        <Title :infoData="infoData" />
        <div class="article2_box max-w-[1366px] px-3 py-8 sm:px-6 md:px-8 lg:p-10 mx-auto" data-aos="fade-up" data-aos-delay="0" data-aos-duration="1000">
           <div class="swiper_area">
                <Slider :cardData="infoData.articles" variant="vertical" sliderId="article2-slider" />
           </div>
           <a
                href="https://esg.businesstoday.com.tw/group_search/article?keywords=COP30觀點"
                class="more_btn block w-[80%] mt-10 ml-auto mr-auto overflow-hidden sm:w-[20rem]"
            >
                <img class="more_btn_img mx-auto" src="../assets/image/more_btn.png" alt="more_btn">
            </a>
        </div>
    </div>
</template>

<style scoped lang="scss">
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
</style>