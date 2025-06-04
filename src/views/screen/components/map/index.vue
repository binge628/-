<template>
	<div class="chart-container">
		<div class="echart" ref="chartRef"></div>
	</div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
import chinaJson from './china.json'
const chartRef = ref()
const croods = ref([
	[
		[116.405285, 39.904989],
		[102.712251, 25.040609]
	],
	[
		[121.472644, 31.231706],
		[91.132212, 29.660361]
	],
	[
		[121.472644, 31.231706],
		[106.504962, 29.533155]
	],
	[
		[121.472644, 31.231706],
		[87.617733, 43.792818]
	]
])

onMounted(() => {
	// @ts-ignore
	echarts.registerMap('china', { geoJSON: chinaJson })
	const mychart = echarts.init(chartRef.value)
	mychart.setOption({
		geo: [
			{
				map: 'china',
				roam: false, //能否缩放或移动，可选值 true、false、'scale'、'move'
				zoom: 1.5,
				top: 200,
				nameMap: {
					台湾省: '中国台湾' // 别名映射
				},
				itemStyle: {
					areaColor: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [
							{
								offset: 0,
								color: '#04387e' // 0% 处的颜色
							},
							{
								offset: 1,
								color: '#031f41' // 100% 处的颜色
							}
						]
					},
					borderColor: '#3ff'
				},
				label: {
					show: true,
					color: '#fff'
				}
			}
		],
		series: [
			{
				type: 'lines', //航线的系列
				data: croods.value.map(crood => ({
					coords: [crood[0], crood[1]],
					// 统一的样式设置
					lineStyle: {
						color: '#3cf',
						width: 3, //尾迹线条宽度
						opacity: 0.2, //尾迹线条透明度
						curveness: 0.3 //尾迹线条曲直度
					}
				})),
				//开启动画特效
				effect: {
					show: true,
					symbol: 'arrow',
					color: '#bfa',
					symbolSize: 10
				}
			}
		]
	})
})
</script>

<style scoped lang="scss">
.chart-container {
	height: 100%;
	.echart {
		height: 100%;
	}
}
</style>
