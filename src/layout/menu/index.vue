<template>
    <template v-for="(item,index) in menuList" :key="item.path">
        <!-- 没有子路由 -->
        <template v-if="!item.children">
            <el-menu-item v-if="!item.meta.hidden" :index="item.path" @click="goRoute">
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </el-menu-item>
        </template>
        <!-- 有子路由但是只有一个子路由 -->
        <template v-if="item.children && item.children.length == 1">
            <el-menu-item v-if="!item.children[0].meta.hidden" :index="item.children[0].path" @click="goRoute">
                <el-icon>
                    <component :is="item.children[0].meta.icon"></component>
                </el-icon>
                <span>{{ item.children[0].meta.title }}</span>
            </el-menu-item>
        </template>
        <!-- 有子路由但是有多个 -->
        <el-sub-menu v-if="item.children && item.children.length>1" :index="item.path">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <Menu :menuList="item.children"></Menu>
        </el-sub-menu>
    </template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
//获取父组件传递过来的全部路由组件
defineProps(['menuList']);
//获取路由器对象
const router = useRouter();
//点击菜单的回调
const goRoute=(vc:any) => {
    //路由跳转
    router.push(vc.index);
}
</script>

<script lang="ts">
export default {
    name:'Menu'
}
</script>

<style scoped>

</style>