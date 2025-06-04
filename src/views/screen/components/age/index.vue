<template>
  <div class="age_echarts">
    <div class="title">
        <p>男女比例</p>
        <img src="../../images/dataScreen-title.png" alt=""></img>
    </div>
    <div ref="charts" class="charts"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
// 引入echarts
import * as echarts from 'echarts';
let charts = ref()

onMounted(()=>{
  let myCharts = echarts.init(charts.value)
  let datas = [
    { value: 200, name: "10岁以下", percentage: "16%" },
    { value: 110, name: "10 - 18岁", percentage: "8%" },
    { value: 150, name: "18 - 30岁", percentage: "12%" },
    { value: 310, name: "30 - 40岁", percentage: "24%" },
    { value: 250, name: "40 - 60岁", percentage: "20%" },
    { value: 260, name: "60岁以上", percentage: "20%" }
  ];
  const colors = ["#F6C95C", "#EF7D33", "#1F9393", "#184EA1", "#81C8EF", "#9270CA"]
  let options = {
    color: colors,
    tooltip: { // 悬浮时的提示框
      show: true,
      trigger: "item",
      formatter: "{b} <br/>占比：{d}%"
    },
    legend: { // 右侧数据的显示
      orient: "vertical",
      top: '5%',
      right: "20px",
      itemGap: 15,
      itemWidth: 14,
      textStyle: { color: "#fff" },
      formatter: function (name:string) {
        let text = ''
        datas.forEach(item => {
          if(item.name == name) text = '  '+name+ '  ' + item.percentage
        })
        return text
      },
    },
    series: [ // 圆环部分
      {
        name: '年龄比例',
        type: 'pie',
        selectedMode: "single",
        radius: ['40%', '80%'],
        center: ["35%", "50%"],
        startAngle: 60, // 数据起始点
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          shadowColor: "rgba(0, 0, 0, 0.2)",
          shadowBlur: 10
        },
        label: { // 数据展示
          position: "inside",
          show: true,
          color: '#fff',
          fontSize: 16,
          formatter: function(params:any){
            return params.data.percentage
          },
        },
        emphasis: { // 鼠标hover后数据的放大效果
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        data: datas.map((val, index) => {
          return {
            value: val.value,
            name: val.name,
            percentage: val.percentage,
            itemStyle: {
              borderWidth: 10,
              shadowBlur: 20,
              borderColor: colors[index],
              borderRadius: 10
            }
          };
        })
      },
    ]
  }
  myCharts.setOption(options)
})
</script>

<style lang="scss" scoped>
.age_echarts{
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    background-size: 100% 100%;

    .title {
        margin-left: 20px;
        p{
            color: white;
            font-size: 20px;
        }
    }

    .charts{
        width: 100%;
        height: 210px;
        margin-top: 20px;
    }
}
</style>