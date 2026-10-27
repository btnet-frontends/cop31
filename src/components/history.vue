<script setup>
    import AOS from 'aos'
    import 'aos/dist/aos.css'
    import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
    import * as echarts from 'echarts';
    import Title from './Title.vue'
    import { getImgUrl,getWindowWidth } from '../utils/utils.js';

    const props = defineProps(
        {
            infoData: {
                type: Object,
                default: () => ({})
            }
        }
    );

    const chartRef = ref(null);
    const windowWidth = ref(0);
    let chartInstance = null;

    const getChartData = () => {
        const source = Array.isArray(props.infoData?.chart) ? props.infoData.chart : [];
        const cleaned = source
            .filter(item => typeof item?.value === 'number' && item.value > 0)
            .map(item => ({
                value: item.value,
                name: item.topic || item.name || '未命名'
            }));

        if (cleaned.length) {
            return cleaned;
        }

        return [
            //這是未設定的預設資料
            { value: 40, name: '北美' },
            { value: 32, name: '歐洲' },
            { value: 18, name: '亞洲' },
            { value: 10, name: '其他' }
        ];
    };

    const renderChart = () => {
        if (!chartRef.value) {
            return;
        }

        if (!chartInstance) {
            chartInstance = echarts.init(chartRef.value);
        }

        chartInstance.setOption({
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c}({d}%)'
            },
            legend: {
                orient: 'horizontal',
                bottom: 0,
                left: 'center',
                padding: [100, 0, 0, 0],
                textStyle: {
                    color: '#444'
                }
            },
            series: [
                {
                    name: 'COP 30',
                    type: 'pie',
                    radius: [ windowWidth.value <= 768 ? '10%' : '40%', windowWidth.value <= 768 ? '25%' : '65%'],
                    center: ['50%', '45%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 6,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: true,
                        formatter: '{b}\n{d}%'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 16,
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: true
                    },
                    data: getChartData()
                }
            ]
        });
    };

    const resizeHandler = () => {
        windowWidth.value = getWindowWidth();
        if (chartInstance) {
            chartInstance.resize();
        }
    };

    onMounted(() => {
        windowWidth.value = getWindowWidth();
        AOS.init()
        window.addEventListener('resize', resizeHandler);
        renderChart();
    });

    watch(
        () => props.infoData?.chart,
        () => {
            if (chartInstance || chartRef.value) {
                renderChart();
            }
        },
        { deep: true }
    );

    onBeforeUnmount(() => {
        window.removeEventListener('resize', resizeHandler);
        if (chartInstance) {
            chartInstance.dispose();
            chartInstance = null;
        }
    });
</script>

<template>
    <div class="content_wrap">
        <Title :infoData="infoData" />
        <div class="history_box max-w-[1366px] p-10 mx-auto" data-aos="fade-up" data-aos-delay="0" data-aos-duration="1000">
            <div class="history_info_area flex gap-5 flex-col items-center lg:flex-row">
                <div class="history_info p-5 w-full text-xl text-justify lg:w-[50%]">
                    <p class="mb-5">{{ infoData.intro[0] }}</p>
                    <p class="mb-5">{{ infoData.intro[1] }}</p>
                    <p class="mb-5">{{ infoData.intro[2] }}</p>
                    <p>{{ infoData.intro[3] }}</p>
                </div>
                <div class="chart_area w-full lg:w-[50%] bg-white rounded-4xl p-5">
                    <h2 class="chart_word_title mt-2 mb-5 mx-auto text-2xl">2025年新增能源需求的來源</h2>
                    <div ref="chartRef" class="history_chart"></div>
                    <p class="chart_word2 text-sm mt-5 text-right">資料來源：IEA 2026 全球能源回顧</p>
                </div>
            </div>
            <div class="cop_history mt-15 flex flex-col gap-10 lg:flex-row w-full">
                <a class="item flex-1 w-full" :href="infoData.All_COP[0].url">
                    <img class="w-full h-auto object-cover" :src="getImgUrl(infoData.All_COP[0].img)" alt="history_cop">
                </a> 
                <a class="item flex-1 w-full" :href="infoData.All_COP[1].url">
                    <img class="w-full h-auto object-cover" :src="getImgUrl(infoData.All_COP[1].img)" alt="history_cop">
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .cop_history {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .cop_history .item {
        flex: 1 1 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border-radius: 35px;

        img {
            width: 100%;
            height: auto;
            display: block;
            object-fit: cover;
        }
    }

    .cop_history .item:hover{
        opacity: .8;
    }

    .history_info{
        color: #b8fff6;
        letter-spacing: 3px;
    }
    .history_chart {
        width: 100%;
        height: 20vw;
    }

    .chart_word_title{
        color: #00738c;
        width: fit-content;
        border-bottom: 1px solid #00738c;
    }
    .chart_word{
        color: #305379;
    }
    .chart_word2{
        color: #305379;
    }

    @media screen and (max-width: 1680px) {
        .history_chart {
            height: 30vw;
        }
    }
    @media screen and (max-width: 1024px) {
       .history_chart {
            height: 55vw;
        }
        
    }

    @media screen and (max-width: 768px) {
        .history_chart {
            height: 90vw;
        }
       
    }
</style>
