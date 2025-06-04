<template>
    <div class="tourist_echarts">
        <div class="top">
            <p class="title">实时游客统计</p>
            <p class="bg"></p>
            <p class="right">可预约总量<span>99999</span>人</p>
        </div>
        <div class="number">
            <span v-for="(item, index) in people" :key="index">{{ item }}</span>
        </div>
        <!-- 盒子将来echarts展示图形图标的节点 -->
        <div class="charts" ref="charts">123</div>
    </div>
</template>

<script setup lang="ts">
//水球图拓展插件
import 'echarts-liquidfill'
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue';
let people = ref('215908人');


//获取节点
let charts = ref();
onMounted(()=>{
  // 页面加载获取echarts类的实例
  let myCharts = echarts.init(charts.value)
  let options = {
    // 标题组件
    title:[ 
      {
        text: (0.5 * 100).toFixed(0) + "%",
        left: "49%",
        top: "30%",
        textAlign: "center",
        textStyle: {
          fontSize: "16",
          fontWeight: "normal",
          color: "#ffffff",
          align: "center",
          textBorderColor: "rgba(0, 0, 0, 0)",
          textShadowColor: "#000",
          textShadowBlur: 0,
          textShadowOffsetX: 0,
          textShadowOffsetY: 1
        }
      },
      {
        text: "预约量",
        left: "49%",
        top: "20%",
        textAlign: "center",
        textStyle: {
          fontSize: "15",
          fontWeight: "normal",
          color: "#ffffff",
          align: "center",
          textBorderColor: "rgba(0, 0, 0, 0)",
          textShadowColor: "#000",
          textShadowBlur: 0,
          textShadowOffsetX: 0,
          textShadowOffsetY: 1
        }
      }
    ],
    
    // 系列：决定你用什么样子的图形展示
    series: [
      {
        type: 'liquidFill', // 类型 水球图
        color: ['#2ed9ab', '#25b8b9', '#20a5b7'],
        data: [0.5, 0.5, 0.5], // 数据
        animationDuration: 2000, // 动画时长
        radius: '95%', // 大小
        itemStyle: { // 数据的样式
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "#35FAB6" },
              { offset: 1, color: "rgba(40, 209, 247,0.3)" }
            ],
            global: false
          }
        },
        outline: { // 外边框
          borderDistance: 10,
          itemStyle: {
            borderWidth: 5,
            borderColor: "#31d8d5",
            shadowBlur: 20,
            shadowColor: "#50c1a7"
          }
        },
        label: {
          show: false
        },
        backgroundStyle: { // 背景样式
          borderWidth: 1,
          color: {
            type: "radial",
            x: 0.5,
            y: 0.5,
            r: 0.5,
            colorStops: [
              { offset: 0, color: "#0D2648" },
              { offset: 0.8, color: "#0D2648" },
              { offset: 1, color: "#228E7D" }
            ],
            global: false
          }
        }
      },
      { // 一个饼图 用来优化样式
        type: "pie",
        radius: ["90%", "90%"],
        center: ["50%", "50%"],
        z: 1,
        label: { show: false },
        silent: true,
        itemStyle: {
          borderWidth: 2,
          borderType: [8, 10],
          borderDashOffset: 15,
          borderColor: "#31d8d5",
          color: "#11144e",
          borderCap: "round"
        },
        data: [100]
      },
    ]
  }
  // 设置实例的配置项
myCharts.setOption(options)
});
</script>

<style scoped lang="scss">
.tourist_echarts {
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    background-size: 100% 100%;
    margin-top: 30px;

    .top {
        margin-left: 20px;

        .title {
            color: white;
            font-size: 20px;

        }

        .bg {
            width: 68px;
            height: 7px;
            background: url(../../images/dataScreen-title.png) no-repeat;
            background-size: 100% 100%;
            margin-top: 10px;
        }

        .right {
            float: right;
            color: white;
            font-size: 20px;

            span {
                color: yellowgreen;
            }
        }
    }

    .number {
        padding: 10px;
        margin-top: 30px;
        display: flex;
        span {
            flex: 1;
            height: 40px;
            text-align: center;
            line-height: 40px;
            background: url(../../images/total.png) no-repeat;
            background-size: 100% 100%;
            font-size: 30px;
            color: #29fcff;
        }
    }

    .charts {
        width: 100%;
        height: 270px;
    }
}
</style>