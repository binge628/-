//SKU模块的接口
import request from '@/utils/request'
import type { SkuResponseData, SkuInfoData } from './type'
enum API {
    //获取已有的商品的数据-SKU
    SKU_URL = '/admin/product/list/',
    //上架
    SALE_URL = '/admin/product/onSale/',
    //下架
    CANCELSALE_URL = '/admin/product/cancelSale/',
    //获取商品详情的接口
    SKUINFO_URL = '/admin/product/getSkuInfo/',
    //删除已有的商品的接口
    DELETESKU_URL = '/admin/product/deleteSku/'
}
//获取商品SKU的请求
export const reqSkuList = (page: number, limit: number) => request.get<any, SkuResponseData>(API.SKU_URL + `${page}/${limit}`)
//已有商品上架的请求
export const reqSaleSku = (skuId: number) => request.get<any, any>(API.SALE_URL + skuId);
//已有商品下架的请求
export const reqCancelSale = (skuId: number) => request.get<any, any>(API.CANCELSALE_URL + skuId)
//获取商品详情的请求
export const reqSkuInfo = (skuId: number) => request.get<any, SkuInfoData>(API.SKUINFO_URL + skuId)
//删除已有的商品的的请求
export const reqRemoveSku = (skuId: number) => request.get<any, any>(API.DELETESKU_URL + skuId);