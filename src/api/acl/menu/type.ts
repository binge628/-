//数据类型定义
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}
//菜单数据与按钮数据的ts类型
export interface Permission {
    id?: number,
    createTime: string,
    updateTime: string,
    pid: number,
    name: string,
    code: string,
    toCode: string,
    type: number,
    status: string,
    level: number,
    children?: PermissionList,
    select: boolean
}
export type PermissionList = Permission[];
//菜单接口返回的数据类型
export interface PermissionResponseData extends ResponseData {
    data: PermissionList
}
//添加与修改菜单携带的参数的ts类型
export interface MenuParams {
    id?: number,//ID
    code: string,//权限数值
    level: number,//几级菜单
    name: string,//菜单名字
    pid: number,//菜单的ID
}