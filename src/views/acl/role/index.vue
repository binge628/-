<template>
    <el-card style="height: 80px;">
        <el-form :inline="true" class="form">
            <el-form-item label="职位名称">
                <el-input placeholder="请你输入职位名称" v-model="keyword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default" :disabled="keyword?false:true" @click="search">搜索</el-button>
                <el-button @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin: 10px 0px;">
        <el-button type="primary" size="default" @click="addRole" v-has="`btn.Role.add`">添加职位</el-button>
        <el-table border style="margin: 10px 0px;" :data="allRole">
            <el-table-column type="index" label="#" align="center"></el-table-column>
            <el-table-column label="id" align="center" prop="id"></el-table-column>
            <el-table-column label="角色名称" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
            <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" align="center" width="300px">
                <template #="{row,$index}">
                    <el-button type="primary" size="small" icon="User" @click="setPermission(row)" v-has="`btn.Role.assgin`">分配权限</el-button>
                    <el-button type="success" size="small" icon="Edit" @click="updateRole(row)" v-has="`btn.Role.update`">编辑</el-button>
                    <el-popconfirm :title="`你确定删除${row.roleName}吗？`" width="260px" @confirm="removeRole(row.id)" v-has="`btn.Role.remove`">
                        <template #reference>
                            <el-button type="danger" size="small" icon="Delete">删除</el-button>  
                        </template>
                    </el-popconfirm>       
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30,40]"
                    :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total"
                    @current-change="getHasRole" @size-change="handler"/>
    </el-card>
    <!-- 添加职位与更新已有职位的结构:对话框 -->
    <el-dialog v-model="dialogVisible" :title="RoleParams.id?'更新职位':'添加职位'">
        <el-form :model="RoleParams" :rules="rules" ref="form">
            <el-form-item label="职位名称" prop="roleName">
                <el-input placeholder="请你输入职位名称" v-model="RoleParams.roleName"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button type="primary" size="default" @click="dialogVisible=false">取消</el-button>
            <el-button type="success" size="default" @click="save">确定</el-button>
        </template>
    </el-dialog>
    <!-- 抽屉组件：分配职位的菜单权限与按钮的权限 -->
    <el-drawer v-model="drawer">
        <template #header>
        <h4>分配权限</h4>
        </template>
        <template #default>
            <!-- 树形控件 -->
            <el-tree
                ref="tree"
                style="max-width: 600px"
                :data="menuArr"
                show-checkbox
                node-key="id"
                default-expand-all
                :default-checked-keys="selectArr"
                :props="defaultProps"
            />
        </template>
        <template #footer>
        <div style="flex: auto">
            <el-button @click="drawer=false">取消</el-button>
            <el-button type="primary" @click="confirmSelect">确定</el-button>
        </div>
        </template>
    </el-drawer>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting';
import { ref, onMounted, reactive,nextTick } from 'vue'
//请求方法
import { reqAllRole,reqAddOrUpdateRole,reqAllMenuList,reqSetPermission,reqRemoveRole } from '@/api/acl/role'; 
import type { MenuResponseData, Records,RoleResponseData,RoleData, MenuData, MenuList } from '@/api/acl/role/type';
import { ElMessage } from 'element-plus';
let pageNo = ref<number>(1);
let pageSize = ref<number>(10);
//职位总个数
let total = ref<number>(0);
//搜索角色关键字
let keyword = ref<string>('');
//存储全部已有的职位
let allRole = ref<Records>([]);
//获取模版setting仓库
let settingStore = useLayoutSettingStore();
//控制对话框的显示与隐藏
let dialogVisible = ref<boolean>(false);
//控制抽屉显示与隐藏
let drawer = ref<boolean>(false);
//收集新增岗位数据
let RoleParams = reactive<RoleData>({
    roleName:''
})
//准备一个数组：数组用于存储勾选的节点的ID(四级的)
let selectArr = ref<number[]>([]);
//定义数组存储用户权限的数据
let menuArr = ref<MenuList>([])
//获取form组件实例
let form = ref<any>();
//获取tree组件实例
let tree = ref<any>();
//组件挂载完毕
onMounted(() => {
    //获取职位请求
    getHasRole();
})
const getHasRole = async (pager = 1) => {
    //更新当前页码
    pageNo.value = pager;
    let result: RoleResponseData = await reqAllRole(pageNo.value, pageSize.value, keyword.value)
    if (result.code == 200) {
        allRole.value = result.data.records;
        total.value = result.data.total;
    }
}
//分页器下拉菜单的自定义事件的回调
const handler = () => {
    getHasRole();
}
//搜索按钮的回调
const search = () => {
    //根据关键字再次发请求
    getHasRole();
    //清空关键字
    keyword.value = '';
}
//重置按钮的回调
const reset = () => {
    settingStore.refresh = !settingStore.refresh;
}
//添加职位按钮的回调
const addRole = () => {
    //对话框显示
    dialogVisible.value = true;
    //清空数据
    Object.assign(RoleParams, {
        roleName: '',
        id:0
    });
    //清空上一次表单检验错误结果
    nextTick(() => {
        form.value.clearValidate();
    })
}
//编辑按钮的回调
const updateRole = (row: RoleData) => {
    //对话框显示
    dialogVisible.value = true;
    //存储已有的职位---带有ID的
    Object.assign(RoleParams, row);
}
//自定义检验规则的回调
const validatorRoleName = (rule: any, value: any, callBack:any) => {
    if (value.trim().length >= 2) {
        callBack();
    } else {
        callBack(new Error('职位名称至少两位'));
    }
}
//职位校验规则
const rules = {
    roleName: [{
        required: true,
        trigger: 'blur',
        validator:validatorRoleName
    }]
}
//确定按钮的回调
const save = async() => {
    //表单校验结果，结果通过在发请求，结果没有通过不应该在发生请求
    await form.value.validate();
    //添加职位|更新职位的请求
    let result = await reqAddOrUpdateRole(RoleParams);
    if (result.code == 200) {
        //提示信息
        ElMessage({
            type: 'success',
            message: RoleParams.id ? '职位更新成功' : '职位添加成功'
        })
        //对话框显示
        dialogVisible.value = false;
        //重新获取表单
        getHasRole(RoleParams.id?pageNo.value:1);
    } else {
        ElMessage({
            type: 'error',
            message: RoleParams.id ? '职位更新失败' : '职位添加失败'
        })
    }
}
//分配权限按钮的回调
const setPermission = async(row: RoleData) => {
    //抽屉显示
    drawer.value = true;
    //收集当前要分类权限的职位的数据
    Object.assign(RoleParams, row);
    //根据职位获取权限的数据
    let result: MenuResponseData = await reqAllMenuList((RoleParams.id as number));
    if (result.code == 200) {
        menuArr.value = result.data;
        selectArr.value = filterSelectArr(menuArr.value, []);
    }
}

const defaultProps = {
  children: 'children',
  label: 'name',
}
const filterSelectArr = (allData: any, initArr: any) => {
    allData.forEach((item:any) => {
        if (item.select && item.level==4) {
            initArr.push(item.id)
        }
        if (item.children && item.children.length > 0) {
            filterSelectArr(item.children, initArr)
        }
    })
    return initArr;
}
//抽屉确定按钮的回调
const confirmSelect = async () => {
    //职位的ID
    const roleId = (RoleParams.id as number);
    //选中节点的ID
    let arr = tree.value.getCheckedKeys();
    //半选的ID
    let arr1 = tree.value.getHalfCheckedKeys(); 
    let permissionId = arr.concat(arr1)
    //下发的权限
    let result:any = await reqSetPermission(roleId, permissionId);
    if (result.code == 200) {
        //抽屉关闭
        drawer.value = false;
        //提示信息
        ElMessage({
            type: 'success',
            message: '权限分配成功'
        })
        //浏览器自动刷新一次,（应该判断一下是否改的是自己的，而不是直接刷新？？？）
    }
}
//删除按钮的回调
const removeRole = async(id:number) => {
    let result:any = await reqRemoveRole(id);
    if (result.code == 200) {
        //提示信息
        ElMessage({
            type: 'success',
            message: '职位删除成功'
        })
        getHasRole(allRole.value.length>1?pageNo.value:pageNo.value-1);
    } else {
        //提示信息
        ElMessage({
            type: 'error',
            message: '职位删除失败'
        })
    }
}
</script>

<style scoped>
.form{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
}
</style>