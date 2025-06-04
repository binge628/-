<template>
    <div class="top">
        <div class="left">
            <button class="lbtn" @click="goHome">首页</button>
        </div>
        <div class="center">
            <div class="title">智慧旅游可视化大数据展示平台</div>
        </div>
        <div class="right">
            <button class="rbtn">统计报告</button>
            <span class="time">当前时间:{{ currentTime }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
//获取路由器对象
let $router = useRouter();
//存储当前时间或者使用插件moment
let currentTime = ref<string>('');
 
const updateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 月份是从0开始计数的，所以要加1
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // 将获取到的值格式化为指定的字符串格式
  currentTime.value = `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
};
//组件挂载完毕更新当前的事件
onMounted(() => {
  updateTime(); // 初始更新时间
  const intervalId = setInterval(updateTime, 1000); // 每秒更新一次时间
 
  // 清理定时器
  onUnmounted(() => {
    clearInterval(intervalId);
  });
});
//点击首页按钮回到首页
const goHome = () => {
    $router.push('/home')
}
</script>

<style scoped lang="scss">
.top {
    width: 100%;
    height: 100%;
    display: flex;
    .left {
        flex: 1;
        background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
        background-size: cover;
        .lbtn {
            width: 150px;
            height: 40px;
            float: right;
            background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
            background-size: 100% 100%;
            text-align: center;
            line-height: 40px;
            font-size: 20px;
            color: #29fcff;
        }
    }
    .center{
        flex: 2;
        .title {
            width: 100%;
            height: 74px;
            background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
            background-size: 100% 100%;
            text-align: center;
            line-height: 74px;
            font-size: 40px;
            color: #29fcff;
        }
    }
    .right {
        flex: 1;
        background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
        background-size: cover;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .rbtn {
            width: 150px;
            height: 40px;
            float: left;
            background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
            background-size: 100% 100%;
            text-align: center;
            line-height: 40px;
            font-size: 20px;
            color: #29fcff;
        }
        .time {
            color: #29fcff;
            margin-right: 25px; 
            font-size: 18px;
        }
    }
}
</style>