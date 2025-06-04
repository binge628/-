<template>
  <div class="year_echarts">
    <div class="top">
      <p class="title">年度游客量对比</p>
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
  const gradientColors = ["rgba(254, 219, 101,0.1)", "rgba(0, 122, 254,0.1)", "rgba(255, 75, 122, 0.1)"];
  const annualData = [
    {
      label: new Date().getFullYear() - 2 + "年",
      value: ["184", "90", "120", "0", "30", "100", "80", "40", "20", "510", "350", "180"]
    },
    {
      label: new Date().getFullYear() - 1 + "年",
      value: ["118", "509", "366", "162", "380", "123", "321", "158", "352", "474", "154", "22"]
    },
    {
      label: new Date().getFullYear() + "年",
      value: ["548", "259", "113", "90", "69", "512", "23", "49", "28", "420", "313", "156"]
    }
  ];
  const datas = {
    data: annualData,
    unit: annualData.map(val => val.label),
    columns: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    colors: ["#FFA600", "#007AFE", "#FF4B7A"]
  };
  
  let options = {
    color: datas.colors,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'none'
      },
    },
    legend: { // 图例组件
      right: '2%',
      top: '0%',
      itemWidth: 15,
      itemHeight: 6,
      align: "auto",
      icon: "rect",
      itemGap: 15,
      textStyle: {
        color: "#ebebf0"
      }
    },
    grid: { // 绘图区域 
      top: "20%",
      left: "40",
      right: "4%",
      bottom: "15%"
    },
    xAxis: [
      {
        name: "(月份)",
        type: 'category',
        boundaryGap: false,
        axisTick: {
          show: false
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: "#233653"
          }
        },
        axisLabel: {
          color: "#7ec7ff",
          padding: 0,
          fontSize: 12,
          formatter: function (data: any) {
            return data;
          }
        },
        splitLine: { // grid区域中的分隔线
          show: false,
          lineStyle: {
            color: "#192a44"
          }
        },
        axisPointer: { // tooltip中的第一行的显示
          label: {
            formatter: function (params: any) {
              return (
                'Precipitation  ' +
                params.value +
                (params.seriesData.length ? '：' + params.seriesData[0].data : '')
              );
            }
          }
        },
        data: datas.columns
      },
    ],
    yAxis: {
      name: "(人数)",
      nameTextStyle: {
        color: "#D6DFEA",
        fontSize: 12,
        padding: [0, 30, 0, 0]
      },
      minInterval: 1,
      splitNumber: 5,
      splitLine: {
        show: false,
        lineStyle: {
          color: "#192a44"
        }
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#233653"
        }
      },
      axisLabel: {
        show: true,
        color: "#B9D6D6",
        padding: 0
      },
      axisTick: {
        show: false
      },
    },
    series: datas.data.map((val:any, index:number) => { // 数据部分
      return {
        name: val.label,
        type: "line",
        symbol: "circle",
        showSymbol: false,
        smooth: true,
        lineStyle: {
          width: 1,
          color: datas.colors[index],
          borderColor: datas.colors[index]
        },
        itemStyle: {
          color: datas.colors[index],
          borderColor: "#646ace",
          borderWidth: 2
        },
        tooltip: {
          show: true
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: datas.colors[index]
              },
              {
                offset: 1,
                color: gradientColors[index]
              }
            ],
            global: false
          },
          shadowColor: "rgba(25,163,223, 0.3)",
          shadowBlur: 20
        },
        data: val.value
      };
    })
  }
  // 设置实例的配置项
  myCharts.setOption(options)
})
</script>

<style lang="scss" scoped>
.year_echarts{
  background: url(../../images/dataScreen-main-rc.png) no-repeat;
  background-size: 100% 100%;
  margin: 20px 0px;
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

  .charts{
    margin-top: 30px;
    width: 100%;
    height: 240px;
  }
}
</style>