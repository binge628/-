<template>
    <div class="sex_echarts">
        <div class="title">
            <p>男女比例</p>
            <img src="../../images/dataScreen-title.png" alt=""></img>
        </div>
        <div class="sex">
            <div class="man">
                <p>男士</p>
                <img src="../../images/man.png" alt=""></img>
            </div>
            <div class="women">
                <p>女士</p>
                <img src="../../images/woman.png" alt=""></img>
            </div>
        </div>
        <div class="rate">
            <p>男士58%</p>
            <p>女士42%</p>
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
//获取图形图标的DOM节点
let charts = ref();
onMounted(() => {
    //初始化echarts实例
    let myCharts = echarts.init(charts.value);
    //设置配置项
    myCharts.setOption({
        //组件标题
        title: {
            text: '男女比例',//主标题
            textStyle: {//主标题颜色
                color: 'skyblue'
            },
            left: '40%'
        },
        //x|y
        xAxis: {
            show: false,
            min: 0,
            max: 100,
        },
        yAxis: {
            show: false,
            type:'category'
        },
        series: [
            {
                type: 'bar',
                data: [58],
                barWidth: 20,
                z: 100,
                itemStyle: {
                    color: 'skyblue',
                    borderRadius: 20,
                }
            },
            {
                type: 'bar',
                data: [100],
                barWidth: 20,
                //调整女士柱条位置
                barGap: '-100%',
                itemStyle: {
                    color: 'pink',
                    borderRadius: 20,
                }
            }
        ],
        grid: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
    })
})
</script>

<style scoped lang="scss">
.sex_echarts {
    width: 100%;
    height: 100%;
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    background-size: 100% 100%;
    margin: 20px 0;
    .title {
        margin-left: 20px;
        p{
            color: white;
            font-size: 20px;
        }
    }
    .sex {
        display: flex;
        justify-content: space-evenly;
        .man {
            margin: 20px;
            width: 100px;
            height: 100px;
            background: url(../../images/man-bg.png) no-repeat;
            background-size: 100% 100%;
            text-align: center;
            p {
                margin-bottom: 10px;
            }
        }
        .women {
            margin: 20px;
            width: 100px;
            height: 100px;
            background: url(../../images/woman-bg.png) no-repeat;
            background-size: 100% 100%;
            text-align: center;
            p {
                margin-bottom: 10px;
            }
        }
    }
    .rate {
        display: flex;
        justify-content: space-between;
        color: white;
    }
    .charts {
        height: 100px;
    }
}
</style>