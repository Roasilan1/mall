// 实现原理: 每次触发时间的时候，判断当前是否存在等待执行的延时函数
const throttle = function(func, timeout = 1000) {
    //锁 是否可以进入
    let lock = true;
    return function(...args) {
        //不可进入则返回
        if (!lock)
            return;
        //进入即上锁
        lock = true;
        setTimeout(() => {
            func.apply(this, args);
            // 执行完后解锁
            lock = false;
        }, timeout);
    }
}

export default throttle;