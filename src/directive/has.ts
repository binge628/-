import pinia from '@/store'
import useUserStore from '@/store/modules/user'
let userStore = useUserStore(pinia)
export const isHasButton = (app: any) => {
    //全局自定义指令：实现按钮的权限
    app.directive('has', {
        //代表使用这个全局自定义指令的DOM|逐渐挂载完毕的时候会执行一次
        mounted(el: any, options: any) {
            //自定义指令右侧的数值:如果在用户信息buttons数组当中没有
            //从DOM树上干掉
            console.log(userStore.buttons)
            if (!userStore.buttons.includes(options.value)) {
                el.parentNode.removeChild(el)
            }
        },
    })
}