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
    <div class="content_wrap z-30">
        <Title :infoData="infoData" />
        <div class="article2_box max-w-[1366px] p-10 mx-auto" data-aos="fade-up" data-aos-delay="0" data-aos-duration="1000">
           <div class="swiper_area">
                <Slider :cardData="infoData.articles" />
           </div>
           <a
                href="https://esg.businesstoday.com.tw/group_search/article?keywords=COP31分析"
                class="more_btn block w-[80%] mt-10 ml-auto mr-auto overflow-hidden sm:w-[20rem]"
            >
                <img class="more_btn_img mx-auto" src="../assets/image/more_btn.png" alt="more_btn">
            </a>
        </div>
    </div>


    <!-- <img src="../assets/image/grass02.png" class="absolute w-full -bottom-[1px] z-20" alt="grass02" data-aos="fade-up" data-aos-delay="0" data-aos-duration="1000" data-aos-anchor-placement="top-bottom" data-aos-offset="0"> -->
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