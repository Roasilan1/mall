import request from "./axios";
import mockRequest from "./mock";

// 对请求的接口实现统一管理
export const getBaseCategoryList = () => request.get("/product/getBaseCategoryList");
export const getBanners = () => mockRequest.get("/banners");
export const getFloors = () => mockRequest.get("/floors");
export const searchGoods = (params) => request.post("/list", params);
export const getDetail = (goodid) => request.get(`/item/${goodid}`);
export const addTocart = (skuId, skuNum) => request.post(`/cart/addToCart/${skuId}/${skuNum}`);
//获取购物车列表
export const cartList = () => request.get("/cart/cartList");

//切换购物车选中状态
export const checkCart = (skuID, isChecked) => request.get(`/cart/checkCart/${skuID}/${isChecked}`)
    //删除购物车商品
export const deleteCart = (skuId) => request.delete(`/cart/deleteCart/${skuId}`);

export const login = (phone, password) => request.post(`/user/passport/login`, { phone, password });
//获取用户信息   验证token
export const getUserInfo = () => request.get("/user/passport/auth/getUserInfo");
//登出
export const logout = () => request.get("/user/passport/logout");
//模拟获取手机发送验证码
export const getCode = (phone) => request.get(`/user/passport/sendCode/${phone}`);
//用户注册
export const register = (phone, password, code) => request.post(`/user/passport/register`, { phone, password, code });
//获取用户地址信息
export const getAddressList = () => request.get(`/user/userAddress/auth/findUserAddressList`);
//订单提交页面获取订单信息
export const getOrderInfo = () => request.get(`/order/auth/trade`);
//提交订单
export const submitOrder = (tradeNo, params) => request.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`, params);

//获取订单支付信息
export const createNative = (orderId) => request.get(`/payment/weixin/createNative/${orderId}`);

//获取支付状态
export const payStatus = (orderId) => request.get(`/payment/weixin/queryPayStatus/${orderId}`);

//获取订单列表/
export const getOrdersList = (page, limit) => request.get(`/order/auth/${page}/${limit}`);