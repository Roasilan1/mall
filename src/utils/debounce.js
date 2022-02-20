// * 实现原理 : 每次触发事件时设置一个延时调用方法，并且取消之前的延时调用方法。（每次触发事件时都取消之前的延时调用方法）
// *  @params fun 传入的防抖函数(callback) delay 等待时间
// *  */
const debounce = (func, delay = 500) => {
    let timer = null;
    //因为最外层是箭头函数 所以这边必须用普通函数，否则this为undefined
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    }
}

export default debounce;