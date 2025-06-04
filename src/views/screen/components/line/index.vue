<template>
  <div class="line_echarts">
    <div class="title">
        <p>未来30天游客量趋势图</p>
        <img src="../../images/dataScreen-title.png" alt=""></img>
    </div>

    <div ref="charts" class="charts"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import dayjs  from 'dayjs';
import { randomNum } from "@/utils/random";

// 引入echarts
import * as echarts from 'echarts';
// 获取echarts节点
let charts = ref()
onMounted(()=> {
  // 页面加载获取echarts类的实例
  let myCharts = echarts.init(charts.value)

  // 数据
  const datas = new Array(31).fill('').map(item=> {
    item = randomNum(1, 200000)
    return item
  })
  // 日期 30天
  const initDate = ()=> {
    const dateList = []
    let startDate = dayjs() // 开始时间 当天
    let endDate = startDate.add(30, "day") // 结束时间 30天后
    while (startDate.isBefore(endDate)) {
      let month = startDate.format('MM')
      let day = startDate.format('DD')
      dateList.push(`${month}/${day}`)
      startDate = startDate.add(1, "day")
    }
    return dateList
  }

  let options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        axisLine: {
          show: true,
          symbol: ["none", "arrow"],
          symbolOffset: [0, 30],
          lineStyle: {
            color: "#233653",
            shadowOffsetX: 20,
            shadowColor: "#233653"
          }
        },
        axisLabel: {
          color: "#7ec7ff",
          padding: 0,
          fontSize: 13,
          formatter: function (data: any) {
            return data;
          }
        },
        splitLine: { show: false, lineStyle: { color: "#192a44" } },
        axisTick: { show: false },
        data: initDate()
      }
    ],
    yAxis: {
      name: "(访问量)",
      nameTextStyle: {
        color: "#7ec7ff",
        fontSize: 14,
        padding: [0, 30, 0, 0]
      },
      minInterval: 1,
      splitNumber: 7,
      splitLine: {
        show: false,
        lineStyle: {
          color: "#223553"
        }
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#223553"
        }
      },
      axisLabel: {
        show: true,
        color: "#7ec7ff",
        padding: 0,
        formatter:function(value: any){
          if(Number(value)>=10000){
            value = Number(value)/10000+'w'
          }
          return value
        }
      },
      axisTick: {
        show: false
      },
    },
    series: [
      {
        name: '访问量',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(128, 255, 165)'
            },
            {
              offset: 1,
              color: 'rgb(1, 191, 236)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: datas
      },
    ]
  }
  // 设置实例的配置项
  myCharts.setOption(options)
})
</script>

<style lang="scss" scoped>
.line_echarts{
    background: url(../../images/line-bg.png) no-repeat;
    background-size: 100% 100%;
    .title {
        margin-left: 20px;
        p{
            color: white;
            font-size: 20px;
        }
    }

    .charts{
        height: 200px;
    }
}
</style>