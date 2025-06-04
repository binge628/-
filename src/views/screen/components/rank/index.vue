<template>
  <div class="rank_echarts">
    <div class="top">
      <p class="title">热门景区排行</p>
      <p class="bg"></p>
    </div>
    <div class="charts-title">
      <span>排名</span>
      <span>景区</span>
      <span>预约数量</span>
    </div>
    <div ref="charts" class="charts"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { ranking1, ranking2, ranking3, ranking4 } from "./ranking-icon.ts";

// 引入echarts
import * as echarts from 'echarts';
import 'echarts-liquidfill'
// 获取echarts节点
let charts = ref()
onMounted(()=> {
  // 页面加载获取echarts类的实例
  let myCharts = echarts.init(charts.value)
  const datas = [
    {
      value: 79999,
      name: "峨眉山",
      percentage: "80%",
      maxValue: 100000
    },
    {
      value: 59999,
      name: "稻城亚丁",
      percentage: "60%",
      maxValue: 100000
    },
    {
      value: 49999,
      name: "九寨沟",
      percentage: "50%",
      maxValue: 100000
    },
    {
      value: 39999,
      name: "万里长城",
      percentage: "40%",
      maxValue: 100000
    },
    {
      value: 29999,
      name: "北京故宫",
      percentage: "30%",
      maxValue: 100000
    }
  ];
  const colors = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];

  let options = {
    grid: {
      top: "5%",
      left: "7%",
      right: "4%",
      bottom: "1%",
      containLabel: true
    },
    xAxis: {
      type: "value",
      axisLine: {
        show: false,
        lineStyle: {
          color: "white"
        }
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false,
        fontSize: 16
      },
    },
    yAxis: [
      {
        show: true,
        data: datas.map((val:any) => val.name),
        type: 'category',
        inverse: true,
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: "#fff",
          formatter: (value:string)=> {
            let str = value.length>6?value.slice(0,6)+'...':value
            let index = datas.map((item:any) =>item.name).indexOf(value)+1
            return ['{'+(index>3?'lg':'lg'+index)+'|NO.'+index+'}', '{title|'+str+'}'].join(" ")
          },
          rich:{ // 设置条形图的label注释
            title: {
              width: 60,
              fontSize: 13,
              align: "center",
              padding: [0, 10, 0, 15]
            },
            lg1: {
              width: 60,
              backgroundColor: {
                image: ranking1
              },
              color: "#fff",
              align: "center",
              height: 20,
              fontSize: 13
            },
            lg2: {
              width: 60,
              backgroundColor: {
                image: ranking2
              },
              color: "#fff",
              align: "center",
              height: 20,
              fontSize: 13
            },
            lg3: {
              width: 60,
              backgroundColor: {
                image: ranking3
              },
              color: "#fff",
              align: "center",
              height: 20,
              fontSize: 13
            },
            lg: {
              width: 60,
              backgroundColor: {
                image: ranking4
              },
              color: "#fff",
              align: "center",
              height: 20,
              fontSize: 13
            },
          },
          triggerEvent: false
        },
      },
      {
        show: true,
        inverse: true,
        data: datas,
        axisLabel: {
          fontSize: 14,
          color: "#fff",
          margin: 20,
          formatter: (value:any) => {
            return value >= 10000 ? (value / 10000).toFixed(2) + "w" : value + "";
          }
        },
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        triggerEvent: false
      }
    ],
    dataset: {
      source: datas
    },
    
    series: [
      { // 中间的bar
        name: '条',
        type: 'bar',
        yAxisIndex: 0,
        data: datas,
        barWidth: 12,
        itemStyle:{
          borderRadius: 12,
          color: function(params: any){
            let num = colors.length
            return colors[params.dataIndex % num];
          }
        },
        label: {
          show:true,
          position: [12, 0],
          color: '#fff',
          lineHeight: 14,
          formatter: (params: any)=> {
            return params.data.percentage
          }
        }
      },
      { // 外面的边框 bar
        name: "框",
        type: 'bar',
        yAxisIndex: 1,
        barWidth: 18,
        data: datas.map((val) => {
          if (!val.maxValue) return 5;
          return val.maxValue;
        }),
        itemStyle: {
          color: "none",
          borderColor: "#00c1de",
          borderWidth: 1,
          borderRadius: 15
        },
        silent: true
      }
    ]
  };
  // 设置实例的配置项
  myCharts.setOption(options)
})
</script>

<style lang="scss" scoped>
.rank_echarts {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-rb.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 30px;
  .title{
      color: #fff;
      font-size: 20px;
  }
  .bg {
      width: 68px;
      height: 7px;
      margin-top: 10px;
      background: url('../../images/dataScreen-title.png');
  }

  .charts-title{
      display: flex;
      height: 36px;
      line-height: 36px;
      margin: 35px 10px 0;
      background: url('../../images/rankingChart-bg.png') no-repeat;
      background-size: 100% 100%;
      box-sizing: border-box;

      span {
      width: 68px;
      display: block;
      text-align: center;
      margin-left: 5px;
      color: #fdbc52;
      font-weight: 700;
      }
      span:last-child {
      margin-left: 60px;
      }
  }
  
  .charts{
      width: 100%;
      height: 260px;
  }
}
</style>