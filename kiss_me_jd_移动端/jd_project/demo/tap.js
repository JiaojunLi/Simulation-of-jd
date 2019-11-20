function tap(obj, callback) {
    let isMove = false;
    let startTime = 0;
    // 1 严格判断一下dom元素是否存在 并且是一个对象
    if (obj && typeof obj === 'object') {
        obj.addEventListener('touchstart', function() {
            isMove = false;
            // 当手指按下的时候 计时
            startTime = Date.now()
        })
        obj.addEventListener('touchmove', function() {
            isMove = true;

        })
        obj.addEventListener('touchend', function(e) {
            // console.log('手指离开屏幕啦');
            if (!isMove && (Date.now() - startTime) < 150) {
                // 这就是一个完整的点按事件
                // 调用回调函数
                (typeof callback == 'function') && callback.call(obj, e);
            }
        })

    }

}