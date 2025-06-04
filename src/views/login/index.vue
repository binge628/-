<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <!-- 登录的表单 -->
                <el-form class="login-from" :model="loginForm" :rules="rules" ref="loginForms">
                    <h1>Hello</h1>
                    <h2>欢迎来到尚硅谷甄选</h2>
                    <el-form-item prop="username">
                        <el-input
                         type="text" 
                         :prefix-icon="User" 
                         v-model="loginForm.username">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input 
                        type="password" 
                        :prefix-icon="Lock" 
                        v-model="loginForm.password" 
                        show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button 
                        :loading="loading"
                        class="login-btn" 
                        type="primary"
                        @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive,ref } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
//引入获取当前时间的函数
import {getTime} from '@/utils/time'
//引入用户相关的小仓库
import useUserStore  from "@/store/modules/user";
let useStore = useUserStore()
//获取el-form组件
let loginForms = ref();
//获取路由器
let $router = useRouter();
//获取路由对象
let $route = useRoute();
//定义变量控制按钮加载效果
let loading = ref(false);
//收集账号与密码的数据
let loginForm = reactive({ username: 'admin', password: '111111' })
//登录按钮回调
const login = async () => {
    //保证全部表单都校验通过再发请求
    await loginForms.value.validate();



    //加载效果：开始加载
    loading.value = true;
    try {
        //保证登录成功
        await useStore.userLogin(loginForm);
        //编程式导航跳转到展示数据首页
        //判断登录的时候，路由路径当中是否有query参数，如果有就往query参数跳转，没有跳转到首页
        // let redirect:any = $route.query.redirect;
        $router.push( '/');
        //登录成功提示消息
        ElNotification({
            type: 'success',
            message: '欢迎回来',
            title:`HI,${getTime()}好`
        });
        //登录成功加载效果消失
        loading.value = false;
    } catch (error) {
        //登录失败加载效果消失
        loading.value = false;
        //登录失败的提示信息
        ElNotification({
            type: 'error',
            message: (error as Error).message,
        })
    }

}
//自定义检验规则函数
const validatorUserName = (rule:any,value:any,callback:any)=>{
    //rule:既为检验规则对象
    //value:既为表单元素文本内容
    //函数：如果符合条件callBack放行通过
    //如果不符合条件callBack方法，注入错误提示消息
    if (value.length>=5) {
        callback();
    } else {
        callback(new Error('账户长度至少五位'));
    }
}

const validatorPassword = (rule:any,value:any,callback:any) => {
        if (value.length>=6) {
        callback();
    } else {
        callback(new Error('密码长度至少六位'));
    }
}
//定义表单校验需要配置对象
const rules = {
    //
    username: [
        // {required:true,min:6,max:10,message:'账户长度至少六位',trigger:'change'}
        {trigger:'change',validator:validatorUserName}
    ],
    password: [
        // {required:true,min:6,max:15,message:'密码长度至少六位',trigger:'change'}
        {trigger:'change',validator:validatorPassword}
    ]
}
</script>

<style scoped lang="scss">
.login_container{
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;
    .login-from{
        position: relative;
        top: 30vh;
        background: url('@/assets/images/login_form.png') no-repeat;
        background-size: cover;
        padding: 20px;
        margin: 0 20px;
        h1{
            font-size: 40px;
            color: #fff;
        }
        h2{
            font-size: 16px;
            color: #fff;
            margin: 10px 0;
        }
        .login-btn{
            width: 100%;
        }
    }
}
</style>