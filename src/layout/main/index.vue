<template>
    <!-- 路由组件出口的位置 -->
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <!-- 渲染layout一级路由组件的子路由 -->
            <component :is="Component" v-if="flag"/>
        </transition>
    </router-view>
</template>

<script setup lang="ts">
import { watch,ref,nextTick } from 'vue';
import useLayOutSettingStore from '@/store/modules/setting';
let layoutSettingStore = useLayOutSettingStore();

//控制当前组件是否销毁重建
let flag = ref(true);
//监听仓库内部数据是否发生变化，如果发生变化，说明用户点击过刷新按钮
watch(() => layoutSettingStore.refresh, () => {
    //点击刷新按钮：路由组件销毁
    flag.value = false;
    nextTick(() => {
        flag.value = true;
    })
})

</script>

<script lang="ts">
export default {
    name:'Main'
}
</script>

<style scoped>
.fade-enter-from{
    opacity: 0;
    transform: rotate(0deg);
}
.fade-enter-active{
    transition: all 1s;
}
.fade-enter-to{
    opacity: 1;
    transform: rotate(0deg);
}
</style>