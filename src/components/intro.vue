<script setup>

    import AOS from 'aos'
    import 'aos/dist/aos.css'
    
    import { onMounted } from 'vue'

    
    import Title from './Title.vue'

    // import { getWindowWidth } from '../utils/utils'
    

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
        <div class="intro_box max-w-[980px] p-10 mx-auto">
            <div class="intro_text intro_text1 text-xl sm:text-2xl">
                <p class="text-white">{{infoData.text[0]}}</p>
            </div>
            <div class="intro_text intro_text2 text-xl sm:text-2xl">
                <p class="text-white">{{infoData.text[1]}}</p>
            </div>
        </div>
    </div>
    <img src="../assets/image/leaf.png" class="right_leaf" data-aos="fade-left" data-aos-delay="0" data-aos-duration="1000" />
    <img src="../assets/image/leaf.png" class="left_leaf" data-aos="fade-right" data-aos-delay="500" data-aos-duration="1000" />
</template>

<style scoped lang="scss">
    .intro_text{
        font-weight: 500;
        margin-bottom: 1.5rem;
        letter-spacing: 8px;
        text-align: justify;
        line-height: 35px;
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
        .intro_text{
            margin-bottom: 1.2rem;
            letter-spacing: 2px;
        }

        .right_leaf{
            display: none;
        }
        
    }
</style>