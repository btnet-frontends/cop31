<script setup>
    defineProps({
        footerInfo: Object
    });
</script>

<template>
    <div class="footer_area w-full">
        <div class="footer_box flex flex-col gap-10 w-fit mx-auto py-10 px-10 text-center items-center lg:gap-[10vw] lg:flex-row" style="color:#fff">
            <div class="item p-0 text-sm w-fit flex flex-col justify-center items-center lg:items-start lg:p-10">
                <p>{{ footerInfo.phone }}</p>
                <p>{{ footerInfo.time }}</p>
            </div>
            <div class="footer_right item p-5 text-sm w-fit flex flex-col justify-center items-center lg:items-start">
                <div><span class="text-lg">{{ footerInfo.esgWord }}</span>{{ footerInfo.member }}</div>
                <p>{{ footerInfo.text1 }}</p>
                <p>{{ footerInfo.text2 }}</p>
                <p>{{ footerInfo.copyright }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.footer_right{
    border-left: 1px solid #fff;
}

@media screen and (max-width: 1024px){
    .footer_right{
        border-left: none;
        border-top: 1px solid #fff;
    }
    
}
</style>