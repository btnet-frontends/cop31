<script setup>

    defineProps(
        {
            infoData: Object
        }
    );


</script>

<template>
     <div class="content_wrap">
        <div class="company_box max-w-[1366px] p-10 mx-auto">
            <div class="logo_box w-fit flex flex-col gap-10 mx-auto items-center sm:flex-row sm:gap-5">
                <div class="logo_title text-xl">
                    <p>{{ infoData.title }}</p>
                </div>
                <div class="logo_group w-fit h-fit">
                    <img class="h-[50px]" src="../assets/image/logos/visionproject-logo.svg" alt="願景工程">
                </div>
            </div>
        </div>
     </div>
</template>

<style scoped lang="scss">
    .logo_title{
        color: #008d6a;
        letter-spacing: 3px;
    }

    @media screen and (max-width: 1200px) {
        
    }
    @media screen and (max-width: 1024px) {
       
        
    }
</style>