<script setup>
import AOS from 'aos'
import 'aos/dist/aos.css'
import { onMounted, ref } from 'vue'

import Header from './components/header.vue'
import Footer from './components/footer.vue'
import Kv from './components/kv.vue'
import Intro from './components/intro.vue'
import Intro2 from './components/intro2.vue'
import Picture from './components/picture.vue'
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

import infoData from './assets/json/info.json'

const popupItem = ref(null)
const isPopupVisible = ref(false)

const handlePopupOpen = (item) => {
  popupItem.value = item
  isPopupVisible.value = true
}

const handlePopupClose = () => {
  isPopupVisible.value = false
  popupItem.value = null
}

onMounted(() => {
  AOS.init()
});

</script>

<template>
    <Header :menu="infoData.menu" />
    <Gototop class="z-99" />
    <section id="kv" class="relative w-full overflow-hidden">
      <Kv :infoData="infoData.content[0]" />
    </section>
    <section id="intro" class="relative block w-full z-10">
      <Intro :infoData="infoData.content[1]" />
    </section>
    <section id="picture" class="relative z-10 w-full px-5 pb-[15%] sm:pb-[25%]">
      <Picture
        :infoData="infoData.content[2]"
        @open-popup="handlePopupOpen"
      />
      <img src="./assets/image/trees.png" class="absolute left-0 right-0 -bottom-[10%] w-full sm:-bottom-[15%] lg:-bottom-[15%] xl:-bottom-[25%] 2xl:-bottom-[35%]" data-aos="fade-up" data-aos-delay="0" data-aos-duration="1000" data-aos-anchor-placement="top-bottom" data-aos-offset="0" alt="trees">
    </section>
    <section id="intro2" class="relative z-0 w-full px-5 pt-[0rem] overflow-hidden lg:pt-[15rem] xl:pt-[20rem] 2xl:pt-[25rem]">    
      <Intro2 :infoData="infoData.content[3]" />
    </section>
    <section id="article1" class="relative w-full overflow-hidden">
      <Article1 :infoData="infoData.content[4]" />
    </section>
    <section id="article5" class="relative w-full overflow-hidden pb-[25%]">
      <article5 :infoData="infoData.content[5]" />
    </section>
    <section id="article4" class="relative w-full overflow-hidden">
      <Article4 :infoData="infoData.content[6]" />
    </section>
    <section id="article2" class="relative w-full overflow-hidden">
      <Article2 :infoData="infoData.content[7]" />
    </section>
    <section id="article3" class="relative w-full overflow-hidden pb-[25%]">
      <Article3 :infoData="infoData.content[8]" />
    </section>
    <section id="picture2" class="relative z-10 w-full overflow-hidden">
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

#intro{
    padding-top: 90px;
    background: url('./assets/image/material.png') center center no-repeat;
    background-size: cover;
    background-color: #126044;
}

#picture{
    background: url('./assets/image/material.png') center center no-repeat;
    background-size: cover;
    background-color: #126044;
}

#intro2{
    background: url('./assets/image/material.png') center center no-repeat;
    background-size: cover;
    background-color: #f9f6f2;
}

#article1{
    background: url('./assets/image/material.png') center center no-repeat;
    background-size: cover;
    background-color: #f9f6f2;
}

#article5{
    background: url('./assets/image/material.png') center center no-repeat;
    background-size: cover;
    background-color: #f9f6f2;
}

#article2{
    background: url('./assets/image/material.png') center center no-repeat;
    background-size: cover;
    background-color: #53968a;
}

#article3{
    background: url('./assets/image/material.png') center center no-repeat;
    background-size: cover;
    background-color: #53968a;
}

#article4{
    background: url('./assets/image/material.png') center center no-repeat;
    background-size: cover;
    background-color: #53968a;
}

#picture2{
    background: url('./assets/image/material.png') center center no-repeat;
    background-size: cover;
    background-color: #eadda7;
}

#history{
    background: url('./assets/image/material.png') center center no-repeat;
    background-size: cover;
    background-color: #f9f6f2;
}

#company{
    background-color: #fff;
}

#footer{
  background-color: #126044;
}

@media screen and (max-width: 1024px) {
    #intro{
        padding-top: 0;
    }
  
}
</style>
