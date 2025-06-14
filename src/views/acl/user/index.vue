<template>
  <el-card style="height: 80px;">
    <el-form :inline="true" class="form">
        <el-form-item label="用户名:">
            <el-input placeholder="请你输入搜索用户名" v-model="keyword"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="default" :diabled="keyword?false:true" @click="search">搜索</el-button>
            <el-button @click="reset">重置</el-button>
        </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0px;">
    <el-button type="primary" size="default" @click="addUser" v-has="`btn.User.add`">添加用户</el-button>
    <el-button type="danger" size="default" :disabled="selectIdArr.length?false:true" @click="deleteSelectUser" v-has="`btn.User.remove`">批量删除</el-button>
    <!-- table展示用户信息 -->
    <el-table row-key="id" @selection-change="selectChange" style="margin: 10px 0px;" border :data="userArr">
        <el-table-column type="selection" align="center" reserve-selection></el-table-column>
        <el-table-column type="index" label="#" align="center"></el-table-column>
        <el-table-column label="id" align="center" prop="id"></el-table-column>
        <el-table-column label="用户名字" align="center" prop="username" show-overflow-tooltip></el-table-column>
        <el-table-column label="用户名称" align="center" prop="name" show-overflow-tooltip></el-table-column>
        <el-table-column label="用户角色" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
        <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
        <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="300px" align="center">
            <template #="{row,$index}">
                <el-button type="primary" size="small" icon="User" @click="setRole(row)" v-has="`btn.User.assgin`">分配角色</el-button>
                <el-button type="success" size="small" icon="Edit" @click="updateUser(row)" v-has="`btn.User.update`">编辑</el-button>
                <el-popconfirm :title="`你确定要删除${row.username}吗？`" width="260px" @confirm="deleteUser(row.id)" v-has="`btn.User.remove`">
                    <template #reference>
                        <el-button type="danger" size="small" icon="Delete">删除</el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[5, 7, 9]"
                :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total"
                @current-change="getHasUser" @size-change="handler"/>
  </el-card>
  <!-- 抽屉结构：完成添加新的用户账号|更新已有的账号信息 -->
  <el-drawer v-model="drawer">
    <!-- 头部标题：将来文字内容应该动态的 -->
    <template #header>
        <h4>{{ userParams.id?'更新用户':'添加用户' }}</h4>
    </template>
    <!-- 身体部分 -->
    <template #default>
        <el-form :model="userParams" :rules="rules" ref="formRef">
            <el-form-item label="用户姓名" prop="username">
                <el-input placeholder="请填写用户名字" v-model="userParams.username"></el-input>
            </el-form-item>
            <el-form-item label="用户昵称" prop="name"> 
                <el-input placeholder="请填写用户昵称" v-model="userParams.name"></el-input>
            </el-form-item>
            <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
                <el-input placeholder="请填写用户密码" v-model="userParams.password"></el-input>
            </el-form-item>
        </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </div>
    </template>
  </el-drawer>
  <!-- 抽屉结构：用户某一个已有的账号进行职位分配 -->
  <el-drawer v-model="drawer1">
        <template #header>
        <h4>分配角色用户</h4>
        </template>
        <template #default>
            <el-form >
                <el-form-item label="用户姓名">
                    <el-input :disabled="true" v-model="userParams.username"></el-input>
                </el-form-item>
                <el-form-item label="角色列表">
                    <el-checkbox @change="handleCheckAllChange" v-model="checkAll" :indeterminate="isIndeterminate">全选</el-checkbox>
                    <el-checkbox-group v-model="userRole" @change="handleCheckedAllRoleChange">
                        <el-checkbox v-for="(role,index) in allRole" :key="index" :label="role" :value="role">
                        {{ role.roleName }}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
        <div style="flex: auto">
            <el-button @click="drawer1=false">取消</el-button>
            <el-button type="primary" @click="confirmClick">确定</el-button>
        </div>
        </template>
  </el-drawer>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting';
import { ref, onMounted,reactive,nextTick } from 'vue';
import { reqUserInfo,reqAddOrUpdateUser,reqAllRole,reqSetUserRole,reqRemoveUser,reqSelectUser } from '@/api/acl/user';
import { UserResponseData, Records, User, AllRoleResponseData,AllRole,SetRoleData } from '@/api/acl/user/type';
import { ElMessage } from 'element-plus';
//默认页码
let pageNo = ref<number>(1);
//一页展示几条数据
let pageSize = ref<number>(5);
//用户总个数
let total = ref<number>(0);
//存储全部用户的数组
let userArr = ref<Records>([]);
//定义响应式数据控制抽屉的显示与隐藏
let drawer = ref<boolean>(false);
//控制分配角色抽屉的显示与隐藏
let drawer1 = ref<boolean>(false);
//收集用户信息的响应式数据
let userParams = reactive<User>({
    username: '',
    name: '',
    password:''
})
//获取form组件实例
let formRef = ref<any>();
//存储全部职位的数据
let allRole = ref<AllRole>([]);
//当前用户已有的职位
let userRole = ref<AllRole>([]);
//准备一个数组存储批量删除的用户的ID
let selectIdArr = ref<User[]>([]);
//定义响应式数据：收集用户输入进来的关键字
let keyword = ref<string>('');
//获取模版setting仓库
let settingStore = useLayoutSettingStore();
//组件挂载完毕
onMounted(() => {
    getHasUser();
})
//获取全部已有的用户信息
const getHasUser = async(pager = 1) => {
    //收集当前页码
    pageNo.value = pager;
    let result: UserResponseData = await reqUserInfo(pageNo.value, pageSize.value,keyword.value);
    if (result.code == 200) {
        total.value = result.data.total;
        userArr.value = result.data.records;
    }
}
//分页器下拉菜单的自定义事件的回调
const handler = () => {
    getHasUser();
}
//添加用户按钮的回调
const addUser = () => {
    //抽屉显示
    drawer.value = true;
    //清空数据
    Object.assign(userParams, {
        id:0,
        username: '',
        name: '',
        password:''
    })
    //清除上一次的错误的提示信息
    nextTick(() => {
        formRef.value.clearValidate();
     })
}
//更新已有的用户按钮的回调
//row:即为已有用户的账号信息
const updateUser = (row:User) => {
    //抽屉显示
    drawer.value = true;
    //存储收集已有的账号信息
    Object.assign(userParams, row);
    //清除上一次的错误的提示信息
    nextTick(() => {
        formRef.value.clearValidate();
     })
}
//保存按钮的回调
const save = async () => {
    //点击保存按钮的时候，务必需要保证表单全部符合条件才能发请求
    await formRef.value.validate();
    //保存按钮：添加新的用户|更新已有的用户账号信息
    let result: any = await reqAddOrUpdateUser(userParams);
    //添加或者更新成功
    if (result.code == 200) {
        //关闭抽屉
        drawer.value = false;
        //提示信息
        ElMessage({
            type: 'success',
            message: userParams.id?'更新成功':'添加成功'
        });
        //获取最新的全部账号的信息???????
        getHasUser(userParams.id ? pageNo.value : 1);
        //浏览器自动刷新一次,（应该判断一下是否改的是自己的，而不是直接刷新？？？）
        window.location.reload();
    } else {
        //关闭抽屉
        drawer.value = false;
        //提示消息
        ElMessage({
            type: 'error',
            message: userParams.id?'更新失败':'添加失败'
        });
    }
}
//取消按钮的回调
const cancel = () => {
    //抽屉隐藏
    drawer.value = false;
}
//检验用户名字回调函数
const validatorUsername = (rule:any,value:any,callBack:any) => {
    //用户名字|昵称，长度至少五位
    if (value.trim().length >= 5) {
        callBack();
    } else {
        callBack(new Error('用户名字至少五位'))
    }
}
//检验用户名称回调函数
const validatorName = (rule:any,value:any,callBack:any) => {
    //用户名字|昵称，长度至少五位
    if (value.trim().length >= 5) {
        callBack();
    } else {
        callBack(new Error('用户名称至少五位'))
    }
}
//检验用户密码回调函数
const validatorPassword = (rule:any,value:any,callBack:any) => {
    //用户密码，长度至少六位
    if (value.trim().length >= 6) {
        callBack();
    } else {
        callBack(new Error('用户密码至少六位'))
    }
}
//表单检验的规则对象
const rules = {
    //用户名字
    username: [{ required: true, trigger: 'blur', validator: validatorUsername }],
    //用户昵称
    name: [{ required: true, trigger: 'blur', validator: validatorName }],
    //用户密码
    password: [{ required: true, trigger: 'blur', validator: validatorPassword }],
}
//分配角色按钮的回调
const setRole = async (row: User) => {
    //存储已有的用户信息
    Object.assign(userParams, row);
    //获取全部的职位的数据与当前用户已有的职位的数据
    let result: AllRoleResponseData = await reqAllRole((userParams.id as number))
    if (result.code == 200) {
        //存储全部的职位
        allRole.value = result.data.allRolesList;
        //存储当前用户已有的职位
        userRole.value = result.data.assignRoles;
        //显示分配角色抽屉
        drawer1.value = true;
    }
}
//收集顶部复选框全选数据
const checkAll = ref<boolean>(false);
//设置不确定状态，仅负责样式控制
const isIndeterminate = ref<boolean>(true)
//顶部的全部复选框的change事件
const handleCheckAllChange = (val: boolean) => {
    //val:true(全选)|false(全不选)
    userRole.value = val ? allRole.value : []
    //不确定的样式(确定样式)
    isIndeterminate.value = false;
}
//顶部全部的复选框的change事件
const handleCheckedAllRoleChange = (value:string[]) => {
    //顶部复选框的勾选数据
    //代表：勾选上的项目个数与全部的职位个数相等,顶部的复选框勾选上
    checkAll.value = value.length == allRole.value.length;
    //不确定的样式
    isIndeterminate.value = value.length > 0 && value.length < allRole.value.length
}
//确定按钮的回调（分配职位)
const confirmClick = async() => {
    //收集参数
    let data: SetRoleData = {
        userId: (userParams.id as number),
        roleIdList: userRole.value.map(item => {
            return (item.id as number)
        })
    }
    //分配用户的职位
    let result: any = await reqSetUserRole(data);
    if (result.code == 200) {
        //提示信息
        ElMessage({
            type: 'success',
            message:'分配职位成功'
        })
        //关闭抽屉
        drawer1.value = false;
        //获取更新完毕用户的信息
        getHasUser(pageNo.value);
    }
}
//删除某一个用户
const deleteUser = async(userId:number) => {
    let result: any = await reqRemoveUser(userId);
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message:'删除成功'
        })
        getHasUser(userArr.value.length>0?pageNo.value:pageNo.value-1);
    }
}
//table复选框勾选时触发的事件
const selectChange = (value:any) => {
    selectIdArr.value = value;
}
//批量删除按钮的回调
const deleteSelectUser = async () => {
    alert('是否批量删除?');
    //整理批量删除的参数
    let idList:any = selectIdArr.value.map(item => {
        return item.id 
    })
    //批量删除的请求
    let result: any = await reqSelectUser(idList);
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message:'删除成功'
        })
        getHasUser(userArr.value.length>0?pageNo.value:pageNo.value-1);
    } else {
        ElMessage({
            type: 'error',
            message:'删除失败'
        })
    }
}
//搜素按钮的回调
const search = () => {
    //根据关键字获取相应的用户数据
    getHasUser();
    //清空关键字
    keyword.value = '';
}
//重置按钮
const reset = () => {
    settingStore.refresh = !settingStore.refresh;
}
</script>

<style scoped>
.form{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>