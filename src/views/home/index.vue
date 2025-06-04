<template>
    <el-card>
        <div class="box">
            <el-image :src="userStore.avatar" class="avatar"></el-image>
            <div class="bottom">
                <h3 class="description">{{getTime()}}好呀{{ userStore.username }}</h3>
                <p class="title">{{ title }}</p>
            </div>
        </div>
    </el-card>
    <div class="bottoms">
        <svg-icon name="welcome" width="500px" height="500px"></svg-icon>
    </div>
</template>

<script setup lang="ts">
//引入用户相关的仓库，获取当前用户的头像、昵称
import useUserStore from '@/store/modules/user';
import { getTime } from '@/utils/time';
import setting from '@/setting';
//获取存储用户信息的仓库对象
let userStore = useUserStore();
let title = setting.title;
</script>

<style scoped lang="scss">
.box{
    display: flex;
    .avatar{
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
    .bottom{
        margin-left: 20px;
        .description{
            font-size: 20px;
            font-weight: 800;
            margin-top: 20px;
        }
        .title{
            font-style: italic;
            color: pink;
            margin-top: 15px;
        }
    }
}
.bottoms{
    display: flex;
    justify-content: center;
}
</style>