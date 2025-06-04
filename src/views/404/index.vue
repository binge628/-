<template>
    <div class="box">
        <img src="../../assets/images/error_images/404.png" alt="">
        <button @click="goHome">首页</button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
let $router = useRouter();
const goHome = () => {
    $router.push('/');
}
</script>

<style scoped lang="scss">
.box {
    width: 100vw;
    height: 100vh;
    background: blue;
    display: flex;
    justify-content: center;
    button {
        width: 50px;
        height: 50px;
        color: white;
    }
    
}
</style>