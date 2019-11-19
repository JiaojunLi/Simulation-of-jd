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
    fe1302.zepto_lunbo();
    fe1302.prodcut_list_func();
    fe1302.goTopFunc();
    fe1302.text_scroll();

});

var fe1302 = {
    tools: {
        zero: function(n) {
            return n < 10 ? "0" + n : n;
        },
        // 位移的方法
        trans: function(obj, dis) {
            // 位移调整好  css3  tranform:translateX
            obj.style.transform = dis;
            // 兼容一下旧版的webkit内核浏览器  safari  谷歌 ...  火狐 欧朋 
            obj.style.webkitTransform = dis;

        },
        //添加过渡的方法
        addTransition: function(obj) {
            obj.style.transition = 'all 0.3s';
            obj.style.webkitTransition = 'all 0.3s';
        },
        // 移除过渡的方法
        removeTransition: function(obj) {
            obj.style.transition = 'none';
            obj.style.webkitTransition = 'none';
        },
        // 处理一下事件兼容的写法
        // obj 绑定事件的元素  callback回调函数
        transitonEndFunc: function(obj, callback) { //
            if (typeof obj == 'object') {
                obj.addEventListener('transitionend', function(e) {
                    (typeof callback == 'function') && callback.call(this, e);
                });
                obj.addEventListener('webkitTransitionend', function(e) {
                    (typeof callback == 'function') && callback.call(this, e);
                });
            }
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
    native_lunbo: function() {
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
        // // 位移调整好  css3  tranform:translateX
        var that = this;
        that.tools.trans(lunbo, 'translateX(' + (-iW * num) + 'px)');

        // 导航小方块调整一下
        nansFun();

        function nansFun() {
            document.querySelector('ol.nav_con>li.active').classList.remove('active');
            navs[num - 1].classList.add('active');
        }

        let timer = setInterval(function() {
            num++;
            that.tools.trans(lunbo, 'translateX(' + (-iW * num) + 'px)');
            // 添加过渡时间
            that.tools.addTransition(lunbo);
            // transitionend 过渡完毕之后触发该时间
        }, 2000);

        that.tools.transitonEndFunc(lunbo, function() {
            // 右边界的判断
            if (num >= (navs.length + 1)) {
                num = 1;
                that.tools.trans(lunbo, 'translateX(' + (-iW * num) + 'px)');
                // 去掉过渡时间  立即回到第一张的位置
                that.tools.removeTransition(lunbo);
            }
            // 左边界判断
            if (num <= 0) {
                num = navs.length;
                that.tools.trans(lunbo, 'translateX(' + (-iW * num) + 'px)');
                // 去掉过渡时间  立即回到第一张的位置
                that.tools.removeTransition(lunbo);
            }
            // 导航小方块调整一下
            nansFun();
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
            that.tools.trans(lunbo, 'translateX(' + (-iW * num + disX) + 'px)');
            // 去掉transition   
            that.tools.removeTransition(lunbo);

        });
        lunbo.addEventListener('touchend', function() {
            // 此时应该判断滑动距离
            if (isMove) {
                // 判断距离 1/3
                (Math.abs(disX) > (iW / 3)) && (disX > 0 ? num-- : num++);
                that.tools.trans(lunbo, 'translateX(' + (-iW * num) + 'px)');
                // 添加过渡时间
                that.tools.addTransition(lunbo);

                // 初始化的参数重置一下
                startX = 0;
                moveX = 0;
                disX = 0;
                isMove = false; // (优化)
                // 重新开启定时器
                timer = setInterval(function() {
                    num++;
                    that.tools.trans(lunbo, 'translateX(' + (-iW * num) + 'px)');
                    // 添加过渡时间
                    that.tools.addTransition(lunbo);
                    // transitionend 过渡完毕之后触发该时间
                }, 2000);

            }
        });



    },
    zepto_lunbo: function() {
        // 获取元素
        var lunbo = $('.lunbo');
        var navs = $('.nav>ol>li');
        // 初始化工作
        var firstLi = lunbo.children('li').eq(0).clone();
        var lastLi = lunbo.children('li').last().clone();
        var iW = lunbo.children('li').eq(0).width();
        lunbo.append(firstLi);
        lunbo.prepend(lastLi);
        // 设置一个全局变量
        var num = 1;
        // 定位 负一屏幕的宽度
        console.log("=========", iW);
        lunbo.css({
                transform: "translateX(" + (-iW * num) + "px)"
            })
            // 导航小方块跟着走
        $('.nav>ol>li.active').removeClass('active');
        navs.eq(num - 1).addClass('active');

        var animateFunc = () => {
            lunbo.animate({
                transform: "translateX(" + -iW * num + "px)"
            }, 300, "linear", function() {
                console.log(num);
                // 右边界
                if (num >= navs.length + 1) {
                    num = 1;
                    lunbo.css({
                        transform: "translateX(" + (-iW * num) + "px)"
                    })
                }
                // 左边界
                if (num <= 0) {
                    num = navs.length;
                    lunbo.css({
                        transform: "translateX(" + (-iW * num) + "px)"
                    })
                }

                // 导航小方块跟着走
                $('.nav>ol>li.active').removeClass('active');
                navs.eq(num - 1).addClass('active');

            })
        }

        // 定时器 自动走起来
        var timer = setInterval(function() {
            num++;
            animateFunc();
        }, 2000);

        // 手指touch事件  向左滑动  向右滑动  zepto  swipeLeft  swipeRight
        lunbo.on('swipeLeft', function() {
            console.log('swipeLeft');
            num++;
            animateFunc();
        });
        lunbo.on('swipeRight', function() {
            console.log('swipeRight');
            num--;
            animateFunc();
        });
        // 停止定时器
        lunbo.on('touchstart', function() {
                clearInterval(timer);
            })
            // 继续开启定时器
        lunbo.on('touchend', function() {
            timer = setInterval(function() {
                num++;
                animateFunc();
            }, 2000);
        })
    },
    prodcut_list_func: function() {
        let oBox = document.querySelector('.nav_list_wrap');
        let iW = oBox.offsetWidth / 2;
        let aA = document.querySelectorAll('.nav_list_square>a');
        console.log(iW);

        // 初始化工作
        let onOff = 0; // 第一个盒子
        let startX = 0;
        let moveX = 0;
        let disX = 0;
        let isMove = false;

        let that = this;

        oBox.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        });
        oBox.addEventListener('touchmove', function(e) {
            isMove = true;
            moveX = e.touches[0].clientX;
            // 差值
            disX = moveX - startX;
        });
        oBox.addEventListener('touchend', function() {
            // 判断一下是否滑动啦
            if (isMove) {
                // 从第一个盒子 滑动到第二个盒子
                //  1 往左滑动
                // 2 滑动距离大于1/3
                if (disX < 0 && Math.abs(disX) > iW / 3) {
                    // 下一个盒子
                    that.tools.trans(oBox, 'translateX(' + (-iW) + 'px)');
                    that.tools.addTransition(oBox);
                    onOff = 1;
                }
                if (disX > 0 && Math.abs(disX) > iW / 3) {
                    // 上一个盒子滑动
                    // 下一个盒子
                    that.tools.trans(oBox, 'translateX(' + 0 + 'px)');
                    that.tools.addTransition(oBox);
                    onOff = 0;
                }

            }
        });

        that.tools.transitonEndFunc(oBox, function() {
            // 小圆点导航进行变化
            document.querySelector('.nav_list_square>a.active').classList.remove('active');
            aA[onOff].classList.add('active');
        });


    },
    goTopFunc: function() {
        // 1 首屏 位置  不显示goTop  当超过一个屏幕的时候 让它显示出来
        // 2 点击goTop  慢慢滑回顶部
        // 滚动位置的监测 scroll事件
        let goTop = document.querySelector('.goTop');

        goTop.style.display = 'none';
        let iH = document.documentElement.clientHeight;
        let iTop;
        window.addEventListener('scroll', function() {
            iTop = document.documentElement.scrollTop;
            if (iTop >= iH) {
                goTop.style.display = 'block';
            } else {
                goTop.style.display = 'none';
            }
        });

        goTop.addEventListener('touchend', function() {

            let timer = setInterval(function() {
                iTop -= 50;
                if (iTop <= 0) {
                    clearInterval(timer);
                    iTop = 0;
                }
                // 返回顶部
                document.documentElement.scrollTop = iTop;
            }, 30);

        })

    },
    text_scroll: function() {
        let oUl = document.querySelector('section.jdkb>ul');
        let iH = oUl.children[0].offsetHeight;
        // 初始化工作
        // 把最后一个li克隆一份 放到最前面  
        let firstLi = oUl.children[0].cloneNode(true);
        oUl.appendChild(firstLi)
        console.log(123);
        // 定义一个全局变量
        let num = 0;
        var that = this;

        var timer = setInterval(function() {
            num++;
            that.tools.trans(oUl, 'translateY(' + (-iH * num) + 'px)');
            that.tools.addTransition(oUl);
        }, 2000);

        that.tools.transitonEndFunc(oUl, function() {
            console.log("过渡完啦", num);
            if (num >= 4) {
                num = 0;
                that.tools.trans(oUl, 'translateY(' + (-iH * num) + 'px)');
                that.tools.removeTransition(oUl);
            }
        });

    }
}