<script setup>
import { computed } from 'vue';
import { getImgUrl } from '../utils/utils';

const props = defineProps({
    cardData: {
        type: Object,
        default: null,
    },
});

const resolvedCard = computed(() => {
    const source = props.cardData ?? {};
    const type = source.type ?? '';
    const title = source.title ?? '';
    const description = source.description ?? '';
    const url = source.url ?? '';
    const rawImage = source.image ?? source.img ?? '';

    return {
        title,
        type,
        description,
        url,
        image: resolveImage(rawImage),
        alt: source.alt ?? title ?? 'article image',
    };
});

function resolveImage(image) {
    if (!image) return '';
    if (/^(https?:)?\/\//.test(image) || image.startsWith('data:')) {
        return image;
    }

    try {
        return getImgUrl(image);
    } catch (error) {
        return image;
    }
}
</script>

<template>
    <a :class="['card',resolvedCard.type==='article1' ? 'type1' : 'type2']" :href="resolvedCard.url">
        <div v-if="resolvedCard.image" :class="['card__image',resolvedCard.type==='article1' ? 'type1' : 'type2']">
            <img :src="resolvedCard.image" :alt="resolvedCard.alt" loading="lazy" />
        </div>
        <div class="card__body">
            <h3 v-if="resolvedCard.title" class="card__title" v-html="resolvedCard.title" />
            <div class="line mt-1 mb-1"></div>
            <p v-if="resolvedCard.description" class="card__description" v-html="resolvedCard.description" />
        </div>
        <a
            v-if="resolvedCard.url"
            class="card__action w-[75%] mx-auto mt-5"
            :href="resolvedCard.url"
            target="_blank"
            rel="noopener noreferrer"
        >
            <img src="../assets/image/more_article.png" class="w-full" alt="more_article">
        </a>
    </a>
</template>

<style scoped lang="scss">
.card {
    display: flex;
    flex-direction: column;
    height: 100%;
    border-radius: 24px;
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    padding: 15px;

    &:hover {
        transform: translateY(-4px);

        .card__image{
            img{
                transition: 1s ease;
                transform: scale(1.08);
            }
        }
    }
}

.card.type2{
    background: #ffffff;
    box-shadow: 0 20px 40px rgba(0, 115, 140, 0.08);
    border: 4px solid #b0db61;
}

.card__image {
    position: relative;
    width: 100%;
    aspect-ratio: 3 / 2;
    background: #f0f4f5;
    overflow: hidden;
    border-radius: 30px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.card__image.type1{
    border: 4px solid #b0db61;
}


.card__body {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 24px 24px 0;
    flex: 1 1 auto;
    color: #2f4f4f;
    text-align: justify;

    .line{
        border: 1px dashed #2f4f4f;
    }
}

.card__title {
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.4;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    color: #00738c;
}

.card__description {
    font-size: 1.0625rem;
    line-height: 1.7;
    margin: 0;
    color: #2f4f4f;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
}

.card__action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.2s ease;

    &:hover {
        opacity: 0.9;
    }

}

@media screen and (max-width: 1024px) {
    .card__body {
        padding: 20px 20px 0;
        text-align: left;
    }

    .card__title{
        font-size: 1.25rem;
    }
    .card__description{
        font-size: 1rem;
    }

}
</style>
