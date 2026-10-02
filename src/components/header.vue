<script setup>
    import { ref } from 'vue'

    // 定義一個狀態來控制選單的開啟或關閉
    const isMenuOpen = ref(false)

    // 切換選單的開啟狀態
    const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value;
    }

    const handleClick = () => {
        isMenuOpen.value = false;
    }

    defineProps(
        {
            menu: Array
        }
    );
</script>

<template>
    <header>
        <a href="https://www.businesstoday.com.tw/" class="btnet_logo_box btnet_logo_box1">
            <img src="../assets/image/btnet_logo.png" class="btnet_logo1" alt="btnet_logo">
        </a>
        <a href="https://esg.businesstoday.com.tw/" class="btnet_logo_box btnet_logo_box2">
            <img src="../assets/image/logos/esg-logo.png" class="btnet_logo1" alt="btnet_logo">
        </a>

        <nav :class="{ open: isMenuOpen }">
            <a
                v-for="(item, idx) in menu"
                :key="idx"
                :href="item.tagUrl"
                :class="['text-lg', item.tagClassName,'sm:text-xl','text-center']"
                @click="handleClick"
            >
                {{ item.tagName }}
            </a>
            <div class="social_logo_box_mb">
                 <a href="https://www.facebook.com/share.php?u=https://esg.businesstoday.com.tw/2025/cop30/" target="_blank" rel="noopener noreferrer">
                    <img src="../assets/image/logos/logo-fb.svg" class="social_logo facebook_logo" alt="facebook_logo">
                </a>
                <a href="https://social-plugins.line.me/lineit/share?url=https://esg.businesstoday.com.tw/2025/cop30/" target="_blank" rel="noopener noreferrer">
                    <img src="../assets/image/logos/logo-line.svg" class="social_logo line_logo" alt="line_logo">
                </a>
            </div>
        </nav>

        <div class="social_logo_box btnet_logo_box3">
            <a href="https://www.facebook.com/share.php?u=https://esg.businesstoday.com.tw/2025/cop30/" target="_blank" rel="noopener noreferrer">
                <img src="../assets/image/logos/logo-fb.svg" class="social_logo facebook_logo" alt="facebook_logo">
            </a>
            <a href="https://social-plugins.line.me/lineit/share?url=https://esg.businesstoday.com.tw/2025/cop30/" target="_blank" rel="noopener noreferrer">
                <img src="../assets/image/logos/logo-line.svg" class="social_logo line_logo" alt="line_logo">
            </a>
        </div>

        <div :class="['menu_icon', {open: isMenuOpen }]" @click="toggleMenu">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </header>
</template>

<style scoped>
    /* Header 基本樣式 */
    header {
        position: fixed;
        display: block;
        background-color: #fff;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        height: 80px;
        top: 0;
        width: 100%;
        left: 0;
        z-index: 99;
    }

    /* Logo 樣式 */
    .btnet_logo_box1 {
        position: absolute;
        display: block;
        width: 120px;
        height: 45px;
        top: 0;
        bottom: 0;
        margin: auto 0;
        z-index: 5;
        left: 25px;
    }
    .btnet_logo_box2{
        position: absolute;
        display: block;
        width: 150px;
        height: 45px;
        top: 0;
        bottom: 0;
        margin: auto 0;
        z-index: 4;
        left: 155px;
    }
    .btnet_logo_box3 {
        position: absolute;
        display: block;
        width: fit-content;
        height: 40px;
        z-index: 1;
        top: 0;
        bottom: 0;
        margin: auto 0;
        right: 25px;
    }

    .btnet_logo_box3.open{
        display: none;
    }

    .btnet_logo_box img {
        max-width: 100%;
        max-height: 100%;
    }

    .btnet_logo_box3 img {
        position: relative;
        display: inline-block;
        height: 100%;
        margin: 0 10px;
    }

    .social_logo:hover{
        cursor: pointer;
        transition: .3s;
        opacity: 0.7;
    }

    /* 漢堡選單圖示樣式 */
    .menu_icon {
        position: absolute;
        display: none;
        flex-direction: column;
        justify-content: space-between;
        width: 30px;
        height: 20px;
        cursor: pointer;
        top: 0;
        bottom: 0;
        margin: auto 0;
        right: 25px;
        z-index: 2;
    }

    .menu_icon span {
        display: block;
        height: 3px;
        background-color: #00738c;
        border-radius: 2px;
        /* transition: all 0.3s ease; */
    }

    /* 當選單開啟時，改變漢堡圖示的樣式 */
    .menu_icon span:nth-child(1) {
        transform-origin: center;
    }

    .menu_icon span:nth-child(3) {
        transform-origin: center;
    }

    .menu_icon:hover span {
        background-color: #00738c;
    }

    .menu_icon.open {
       right: 16px;
    }

    .menu_icon.open span:nth-child(1) {
        transform: rotate(45deg) translateY(12px);
    }

    .menu_icon.open span:nth-child(2) {
        opacity: 0;
    }

    .menu_icon.open span:nth-child(3) {
        transform: rotate(-45deg) translateY(-12px);
    }

    /* 選單樣式 */
    nav {
        position: relative;
        display: flex;
        flex-direction: row;
        background-color: #fff;
        float: right;
        margin-right: 150px;
        margin-top: 16px;
        height: fit-content;
        width: fit-content;
    }

    nav.open {
        display: flex;
    }

    nav > a {
        position: relative;
        display: block;
        text-decoration: none;
        color: #00738c;
        padding: 0.5rem 1rem;
    }

    nav > a::after{
        content:'';
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto 0;
        height: 40%;
        border-right: 1px solid #003642;
    }

    nav > .menu_history::after{
        display: none;
    }

    nav > a:hover {
        color: #003642;
    }

    .social_logo_box_mb{
        display: none;
    }

    @media screen and (max-width: 1500px) {
        header{
            height: 55px;
        }

        .btnet_logo_box1 {
            width: 84px;
            height: 33px;
            left: 25px;
        }
        .btnet_logo_box2 {
            width: 104px;
            height: 33px;
            left: 125px;
        }
        .btnet_logo_box3 {
            display: none;
        }

        .menu_icon{
            display: flex;
        }

        nav{
            display: none;
            flex-direction: column;
            width: 100%;
            height: calc(100vh - 55px);
            right: 0;
            top: 55px;
            margin: 0 auto;
            padding: 1rem 0;
            overflow: auto;
        }

        nav > a{
            padding: 1.2rem 0;
            border-bottom: 1px solid #d8d8d8;
        }

        nav > a::after{
            display: none;
        }

        nav > a:last-child{
            border-bottom: 0;
        }

        .social_logo_box_mb{
            display: block;
            padding: 1.2rem 0;
            border-bottom: 1px solid #d8d8d8;
            text-align: center;
        }

        .social_logo_box_mb{
            border-bottom: 0;
        }

        .social_logo_box_mb img{
            position: relative;
            display: inline-block;
            height: 35px;
            margin: 0 10px;
        }
    }
</style>