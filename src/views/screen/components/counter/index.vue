<template>
  <div class="counter_echarts">
    <div class="top">
      <p class="title">预约渠道数据统计</p>
      <p class="bg"></p>
    </div>
    <div ref="charts" class="charts"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

// 引入echarts
import * as echarts from 'echarts';
import 'echarts-liquidfill'
// 获取echarts节点
let charts = ref()
onMounted(()=> {
  // 页面加载获取echarts类的实例
  let myCharts = echarts.init(charts.value)
  const datas = [
    { value: 40, name: "智慧文旅平台", percentage: "40%" },
    { value: 10, name: "携程", percentage: "10%" },
    { value: 20, name: "飞猪", percentage: "20%" },
    { value: 30, name: "其他渠道", percentage: "30%" }
  ];
  const colors = ["#0E7CE2", "#FF8352", "#E271DE", "#F8456B", "#00FFFF", "#4AEAB0"]
  
  let options = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: 'middle',
      left: '2%',
      icon: 'circle',
      orient: 'vertical',
      align: "auto",
      itemWidth: 10,
      itemGap: 20,
      textStyle:{
        color:'#fff',
      },
      data: datas.map((val:any) => val.name),
      formatter: function(params:any){
        let text = ''
        datas.forEach((item:any) => {
          if(item.name == params) text = item.name+' --- '+item.percentage
        })
        return text
      }
    },
    series: [
      { // 彩色的圆环 展示数据
        type: 'pie',
        color: colors,
        radius: ['60%', '85%'],
        center: ["68%", "45%"],
        padAngle: 5,
        itemStyle: {
          borderColor: "#031845",
          borderWidth: 10,
          // borderRadius: 10
        },
        label: {
          show: false,
        },
        labelLine: {
          show: false
        },
        data: datas
      },
      { // 中间的白色3/4半圆环
        type: "pie",
        radius: ["20%", "28%"],
        center: ["68%", "45%"],
        color: ["#ffffff", "red"],
        startAngle: 105,
        data: [
          {
            value: 30,
            name: "",
            itemStyle: {
              color: "transparent"
            }
          },
          {
            value: 5,
            name: "",
            itemStyle: {
              color: "transparent"
            }
          },
          {
            value: 65,
            name: "ddd",
            itemStyle: {
              color: "#ffffff"
            }
          }
        ],
        silent: true,
        labelLine: {
          show: false
        },
        label: {
          show: false
        }
      },
      { // 中间1/4的扇形图
        type: "pie",
        radius: [0, "30%"],
        center: ["68%", "45%"],
        startAngle: 90,
        data: [
          {
            value: 25,
            name: "1",
            itemStyle: {
              color: "transparent",
              borderWidth: 4,
              borderColor: "#ffffff"
            }
          },
          {
            value: 75,
            name: "2",
            itemStyle: {
              color: "transparent"
            }
          }
        ],
        selectedOffset: 10,
        silent: true,
        labelLine: {
          show: false
        },
        label: {
          show: false
        }
      },
      { // 最外圈 蓝色的圆弧
        type: "pie",
        radius: ["96%", "97%"],
        center: ["68%", "45%"],
        color: ["#007afe", "transparent", "#007afe", "transparent", "#007afe", "transparent"],
        data: [
          { value: 17, name: "11" },
          { value: 17, name: "22" },
          { value: 17, name: "33" },
          { value: 17, name: "44" },
          { value: 17, name: "55" },
          { value: 17, name: "66" }
        ],
        silent: true,
        labelLine: { show: false },
        label: { show: false }
      },
      { // 中间 虚线圆弧部分
        type: "pie",
        zlevel: 0,
        silent: true,
        radius: ["45%", "46%"],
        center: ["68%", "45%"],
        z: 10,
        label: { show: false },
        labelLine: { show: false },
        data: new Array(150).fill("").map((_val: string, index: number) => {
          if (index % 3 === 0) {
            return {
              name: (index + 1).toString(),
              value: 10,
              itemStyle: {
                color: "#fff",
                borderWidth: 0,
                borderColor: "rgba(0,0,0,0)"
              }
            };
          } else {
            return {
              name: (index + 1).toString(),
              value: 25,
              itemStyle: {
                color: "rgba(0,0,0,0)",
                borderWidth: 0,
                borderColor: "rgba(0,0,0,0)"
              }
            };
          }
        })
      },
      { // 虚线圆弧和彩色主环中间的 部分的圆弧
        type: "pie",
        zlevel: 0,
        silent: true,
        radius: ["58%", "60%"],
        center: ["68%", "45%"],
        z: 10,
        startAngle: 90,
        label: { show: false },
        color: ["red", "blue", "red", "blue"],
        labelLine: { show: false },
        data: [
          {
            name: "r1",
            value: 25,
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: "rgba(51,149,191,0.5)" },
                  { offset: 1, color: "rgba(51,149,191,0)" }
                ],
                global: false
              }
            }
          },
          {
            name: "r2",
            value: 25,
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: "rgba(0,0,0,0)" },
                  { offset: 1, color: "rgba(51,149,191,0.5)" }
                ],
                global: false
              }
            }
          },
          {
            name: "r3",
            value: 25,
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: "rgba(51,149,191,0)" },
                  { offset: 1, color: "rgba(51,149,191,0.5)" }
                ],
                global: false
              }
            }
          },
          {
            name: "r4",
            value: 25,
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: "rgba(51,149,191,0.5)" },
                  { offset: 1, color: "rgba(0,0,0,0)" }
                ],
                global: false
              }
            }
          }
        ]
      }
    ]
  }
  // 设置实例的配置项
  myCharts.setOption(options)
})
</script>

<style lang="scss" scoped>
.counter_echarts{
  background: url(../../images/dataScreen-main-rc.png) no-repeat;
  background-size: 100% 100%;
  .top{  
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
  }

  .charts{
    width: 100%;
    height: 240px;
  }
}
</style>