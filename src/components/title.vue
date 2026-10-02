<script setup>
    defineProps(
        {
            infoData: Object
        }
    );
</script>

<template>
    <div class="title_area w-full text-center pb-[35px] pl-[25px] pr-[25px]">
            <div :class="['title_box w-fit py-3 mx-auto',infoData.titleType === 2 ? 'type2 pl-10 pr-10 sm:pl-8 sm:pr-8' : '']">
                <h1 :style="{ color: infoData.titleColor}" class="title text-4xl sm:text-5xl" v-html="infoData.title"></h1>
                <p :class="['subtitle text-white mt-3 text-xl sm:text-2xl',infoData.title2 ? 'block' : 'hidden' ]">{{ infoData.title2 }}</p>
            </div>

            <p v-if="infoData.id==='picture2'&&infoData.subtitle" class="mt-2 text-md text-[#272727]">{{ infoData.subtitle }}</p>
    </div>
</template>

<style scoped>
    .title_box :deep(br){
        display: none;
    }

    .subtitle{
        letter-spacing: 3px;
    }

    .title_box.type2{
        border-radius: 50px;
        background: #B0DB61;
        background: linear-gradient(-35deg, rgba(176, 219, 97, 1) 34%, rgba(110, 203, 142, 1) 100%);
    }

    .title_box.type2 h1{
        text-shadow: 0 0 10px rgba(0, 0, 0, .3);
    }

    @media screen and (max-width: 768px) {
        .title{
            line-height: 4rem;
        }
    }

    @media screen and (max-width: 640px){
        .title{
            line-height: 3rem;
        }

        .title_box :deep(br){
            display: block;
        }
    }
</style>