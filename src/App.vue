<script setup>
import AOS from 'aos'
import 'aos/dist/aos.css'
import { computed, onMounted, ref } from 'vue'

import Header from './components/header.vue'
import Footer from './components/footer.vue'
import Kv from './components/kv.vue'
import Intro from './components/intro.vue'
import Intro2 from './components/intro2.vue'
import Picture from './components/picture.vue'
import KvPicture from './components/KvPicture.vue'
import Article1 from './components/article1.vue'
import Article2 from './components/article2.vue'
import Article3 from './components/article3.vue'
import Article4 from './components/article4.vue'
import Article5 from './components/article5.vue'
import Picture2 from './components/picture2.vue'
import History from './components/history.vue'
import Company from './components/company.vue'
import GalleryPopup from './components/GalleryPopup.vue'

import Gototop from './components/Gototop.vue'
import SignUpFiexd from './components/SignUpFiexd.vue'
import VideoSplash from './components/VideoSplash.vue'

import infoData from './assets/json/info.json'

const popupItem = ref(null)
const isPopupVisible = ref(false)
const kvReady = ref(false)           // 影片結束後設為 true，觸發 KV 入場動畫

// 暫時隱藏已註解區塊在 Header 的選單項目
const displayMenu = computed(() => {
  const hiddenUrls = ['#article5', '#article3'];
  return (infoData.menu || []).filter(item => !hiddenUrls.includes(item.tagUrl));
});

const onSplashEnd = () => {
  kvReady.value = true
}

const handlePopupOpen = (item) => {
  popupItem.value = item
  isPopupVisible.value = true
}

const handlePopupClose = () => {
  isPopupVisible.value = false
  popupItem.value = null
}

onMounted(() => {
  AOS.init({
    offset: 50,        // 元素進入視窗 50px 內就觸發（預設 120）
    duration: 600,     // 動畫時長 600ms（預設 400，各元件設 1000）
    easing: 'ease-out',
    once: true,        // 每個元素只動畫一次
  })
});

</script>

<template>
    <VideoSplash @ended="onSplashEnd" />
    <Header :menu="displayMenu" />
    <Gototop class="z-99" />
    <section id="kv" class="relative w-full overflow-hidden">
      <Kv :infoData="infoData.content[0]" :kvReady="kvReady" />
    </section>
    <!-- 直擊土耳其安塔利亞現場區塊 -->
    <!-- <section id="kv-picture" class="relative w-full">
      <KvPicture :infoData="infoData.content[0]" />
    </section> -->
    <section id="intro" class="relative block w-full z-10">
      <Intro :infoData="infoData.content[1]" />
    </section>
    <!-- 現場實況圖輯區塊 -->
    <!-- <section id="picture" class="relative z-10 w-full px-5">
      <Picture
        :infoData="infoData.content[2]"
        @open-popup="handlePopupOpen"
      />
    </section> -->
    <section id="intro2" class="relative z-0 w-full px-5 overflow-hidden">    
      <Intro2 :infoData="infoData.content[3]" />
    </section>
    <section id="article1" class="relative w-full overflow-hidden">
      <Article1 :infoData="infoData.content[4]" />
    </section>
    <!-- COP 31專家觀點區塊 -->
    <!-- <section id="article5" class="relative w-full overflow-hidden">
      <article5 :infoData="infoData.content[5]" />
    </section> -->
    <!-- 關鍵報告解析區塊 -->
    <section id="article2" class="relative w-full overflow-hidden">
      <Article2 :infoData="infoData.content[7]" />
    </section>
    <!-- COP 31會議背景區塊 -->
    <section id="article4" class="relative w-full overflow-hidden">
      <Article4 :infoData="infoData.content[6]" />
    </section>
    <!-- 會議效應區塊 -->
    <!-- <section id="article3" class="relative w-full overflow-hidden">
      <Article3 :infoData="infoData.content[8]" />
    </section> -->
    <section id="picture2" class="relative z-10 w-full overflow-hidden" style="display:none">
      <Picture2
        :infoData="infoData.content[9]"
        @open-popup="handlePopupOpen"
      />
    </section>
    <section id="history" class="relative w-full overflow-hidden">
      <History :infoData="infoData.content[10]" />
    </section>
    <section id="company" class="relative w-full overflow-hidden">
      <Company :infoData="infoData.content[11]" />
    </section>
    <section id="footer" class="relative w-full overflow-hidden">
      <Footer :footerInfo="infoData.footer" />
    </section>

    <!-- <SignUpFiexd /> -->
    <GalleryPopup
      :item="popupItem"
      :visible="isPopupVisible"
      @close="handlePopupClose"
    />
</template>

<style scoped lang="scss">
#smooth-wrapper.is-smooth {
  position: fixed;
  inset: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

#smooth-content.is-smooth {
  position: relative;
  min-height: 100%;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

#kv-picture{
    background: url('./assets/image/blue_bg.jpg') center center / cover no-repeat;
}

#intro{
    padding-top: 90px;
    background: url('./assets/image/blue_bg.jpg') center center / cover no-repeat;
}

#picture{
    background: url('./assets/image/1_gb.jpg') center center / cover no-repeat;
}

#intro2{
    background: url('./assets/image/1_gb.jpg') center center / cover no-repeat;
}

#article1{
    background: url('./assets/image/blue_bg.jpg') center center / cover no-repeat;
}

#article5{
    background: url('./assets/image/blue_bg.jpg') center center / cover no-repeat;
}

#article4,
#article2,
#article3{
    background-image: url('./assets/image/2_bg.jpg');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #4382a8;
}

#picture2{
    background: url('./assets/image/material.png') center center no-repeat;
    background-size: cover;
    background-color: #eadda7;
}

#history{
    background: url('./assets/image/blue_bg.jpg') center center / cover no-repeat;
}

#company{
    background-color: #fff;
}

#footer{
  background: url('./assets/image/blue_bg.jpg') center center / cover no-repeat;
}

@media screen and (max-width: 1024px) {
    #intro{
        padding-top: 0;
    }
  
}
</style>
