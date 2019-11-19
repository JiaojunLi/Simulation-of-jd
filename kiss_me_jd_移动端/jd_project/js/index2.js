// 首页的动态效果
/**
 * 功能1 ：头部搜索区域背景变化 层级变化
 随着滚动 通过js调整搜索区域的定位层级 z-index 要高于所有的内容（轮播图图片） 
 随着滚动 加上红色背景 有一个逐渐加深显现出来的过程 （定个临界值 到达这个临界值的时候 背景全部显现）

功能2:轮播图区域要实现无缝滚动

功能3: 商品列表区域 左右两个盒子来回滑动

功能4: 倒计时
功能5: 商品列表的滑动效果
功能6: 京东快报文字向上滚动 
功能7： 返回顶部

通过js对象的管理方式 来实现功能模块化  
// 移动端的几个常用的touch事件

*/
// onload   DOMContentLoaded 
// addEventListener() 
window.addEventListener('load', function() {

    fe1302.searchBgFunc();
    fe1302.downTime();
    fe1302.lunbo();

});

var fe1302 = {
    tools: {
        zero: function(n) {
            return n < 10 ? "0" + n : n;
        }
    },
    // 功能1:
    searchBgFunc: function() {
        // 随着滚动 通过js调整搜索区域的定位层级 z-index 要高于所有的内容（轮播图图片） 
        // 随着滚动 加上红色背景 有一个逐渐加深显现出来的过程 （定个临界值 到达这个临界值的时候 背景全部显现）
        var oHeader = document.querySelector('header');
        // 临界值 定位 banner的高度
        var oBanner = document.querySelector('.banner');

        var iH = oBanner.offsetHeight;
        // 滚动scroll 
        window.addEventListener('scroll', function() {
            // 垂直滚动的位置
            var iTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (iTop > 1) {
                oHeader.style.zIndex = 4;
            } else {
                oHeader.style.zIndex = 2;
            }
            oHeader.style.backgroundColor = 'rgba(228,49,48,' + (iTop / iH) + ')';
        });

    },
    downTime: function() {
        // 给定一个总的倒计时的时间 3个小时
        var iTime = 60 * 60 * 3;

        var aDiv = document.querySelectorAll(".time>div");
        console.log(aDiv);
        var that = this;
        core();

        function core() {
            // 转换为小时  分钟  和 秒
            var hour = parseInt(iTime / 3600); // 整小时数
            var minutes = parseInt(iTime % 3600 / 60); // 整分钟数
            var seconds = iTime % 60;

            aDiv[0].innerHTML = that.tools.zero(hour);
            aDiv[1].innerHTML = that.tools.zero(minutes);
            aDiv[2].innerHTML = that.tools.zero(seconds);
        }


        // 开一个定时器 call apply bind  箭头函数  存一下可以改
        // var that = this;
        var timer = setInterval(() => {
            iTime--;
            if (iTime < 0) {
                clearInterval(timer);
                iTime = 0;
                return this.downTime();
            }
            core();
        }, 1000);

    },
    lunbo: function() {
        /**
         * 1 轮播图 自动走起来 （定时器）
         * 2 手指在轮播图上面进行滑动 轮播图也应该跟着滑动 （touch事件）
         * 3 手指滑动完毕之后 要进行滑动过的距离判断  如果比如大于 整个屏幕的1/3宽 滑过去 否则 小于 吸附回去
         * 4 手指滑动完毕之后 要判断方向 如果向右滑动 看前一张 如果向左滑动 要看后一张
         */

        // 初始化的准备工作  无缝轮播
        let lunbo = document.querySelector('.lunbo');
        let iW = lunbo.children[0].offsetWidth;
        let navs = document.querySelectorAll('ol.nav_con>li');
        // 克隆一份 第一张一样的li 并把这个li放到最后位置
        // 克隆一份 最后一个li  并把这个li放到第一个li的前面
        var firstLi = lunbo.children[0].cloneNode(true);
        var lastLi = lunbo.children[lunbo.children.length - 1].cloneNode(true);
        lunbo.appendChild(firstLi);
        lunbo.insertBefore(lastLi, lunbo.children[0]);
        console.log(iW);
        // 全局变量用来控制滑动到第几张了 
        let num = 1;
        // 位移调整好  css3  tranform:translateX
        lunbo.style.transform = 'translateX(' + (-iW * num) + 'px)';
        // 兼容一下旧版的webkit内核浏览器  safari  谷歌 ...  火狐 欧朋 
        lunbo.style.webkitTransform = 'translateX(' + (-iW * num) + 'px)';

        // 导航小方块调整一下
        document.querySelector('ol.nav_con>li.active').classList.remove('active');
        navs[num - 1].classList.add('active');

        let timer = setInterval(function() {
            num++;
            // 位移调整好  css3  tranform:translateX
            lunbo.style.transform = 'translateX(' + (-iW * num) + 'px)';
            // 兼容一下旧版的webkit内核浏览器  safari  谷歌 ...  火狐 欧朋 
            lunbo.style.webkitTransform = 'translateX(' + (-iW * num) + 'px)';
            // 添加过渡时间
            lunbo.style.transition = 'all 0.3s';
            lunbo.style.webkitTransition = 'all 0.3s';

            // transitionend 过渡完毕之后触发该时间
        }, 2000);


        lunbo.addEventListener('transitionend', function() {
            // console.log('过渡完成啦');
            // console.log(num);

            // 右边界的判断
            if (num >= (navs.length + 1)) {
                num = 1;
                // 位移调整好  css3  tranform:translateX
                lunbo.style.transform = 'translateX(' + (-iW * num) + 'px)';
                // 兼容一下旧版的webkit内核浏览器  safari  谷歌 ...  火狐 欧朋 
                lunbo.style.webkitTransform = 'translateX(' + (-iW * num) + 'px)';
                // 去掉过渡时间  立即回到第一张的位置

                lunbo.style.transition = 'none';
                lunbo.style.webkitTransition = 'none';
            }
            // 左边界判断
            if (num <= 0) {
                num = navs.length;
                // 位移调整好  css3  tranform:translateX
                lunbo.style.transform = 'translateX(' + (-iW * num) + 'px)';
                // 兼容一下旧版的webkit内核浏览器  safari  谷歌 ...  火狐 欧朋 
                lunbo.style.webkitTransform = 'translateX(' + (-iW * num) + 'px)';
                // 去掉过渡时间  立即回到第一张的位置
                lunbo.style.transition = 'none';
                lunbo.style.webkitTransition = 'none';
            }
            // 导航小方块调整一下
            document.querySelector('ol.nav_con>li.active').classList.remove('active');
            navs[num - 1].classList.add('active');

        });

        // 手指touch操作
        // 设置几个初始化的变量
        let startX = 0;
        let moveX = 0;
        let disX = 0;
        let isMove = false; // (优化)

        lunbo.addEventListener('touchstart', function(e) {
            // 手指按下的时候 应该停止自动轮播 人为介入
            clearInterval(timer);
            //获取按下的手指的坐标点 x
            startX = e.touches[0].clientX;
        });
        lunbo.addEventListener('touchmove', function(e) {
            isMove = true;
            // 当前手指滑动的实时x坐标
            moveX = e.touches[0].clientX;
            // 差值
            disX = moveX - startX;
            // 让轮播图的位置 跟着当前的手指移动距离走
            // 位移调整好  css3  tranform:translateX
            lunbo.style.transform = 'translateX(' + (-iW * num + disX) + 'px)';
            // 兼容一下旧版的webkit内核浏览器  safari  谷歌 ...  火狐 欧朋 
            lunbo.style.webkitTransform = 'translateX(' + (-iW * num + disX) + 'px)';
            // 去掉transition   
            lunbo.style.transition = 'none';
            lunbo.style.webkitTransition = 'none';

        });
        lunbo.addEventListener('touchend', function() {
            // 此时应该判断滑动距离
            if (isMove) {
                // 判断距离 1/3
                if (Math.abs(disX) > iW / 3) {
                    // 如果滑动距离大于了1/3 要判断方向
                    if (disX > 0) {
                        num--; // 滑动过上一张
                    } else {
                        num++; //滑动到下一张
                    }

                }
                // 位移调整好  css3  tranform:translateX
                lunbo.style.transform = 'translateX(' + (-iW * num) + 'px)';
                // 兼容一下旧版的webkit内核浏览器  safari  谷歌 ...  火狐 欧朋 
                lunbo.style.webkitTransform = 'translateX(' + (-iW * num) + 'px)';
                // 添加过渡时间
                lunbo.style.transition = 'all 0.3s';
                lunbo.style.webkitTransition = 'all 0.3s';

                // 初始化的参数重置一下
                startX = 0;
                moveX = 0;
                disX = 0;
                isMove = false; // (优化)
                // 重新开启定时器
                timer = setInterval(function() {
                    num++;
                    // 位移调整好  css3  tranform:translateX
                    lunbo.style.transform = 'translateX(' + (-iW * num) + 'px)';
                    // 兼容一下旧版的webkit内核浏览器  safari  谷歌 ...  火狐 欧朋 
                    lunbo.style.webkitTransform = 'translateX(' + (-iW * num) + 'px)';
                    // 添加过渡时间
                    lunbo.style.transition = 'all 0.3s';
                    lunbo.style.webkitTransition = 'all 0.3s';

                    // transitionend 过渡完毕之后触发该时间
                }, 2000);

            }
        });

    }

}