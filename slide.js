// 实现效果要求：
// 切换按钮
// 切换效果，渐隐渐现
// 能不能自动播放

$.fn.extend({
    slide: function(lb) {
        //获取实参设置默认值
        if (lb.btn === undefined) {
            lb.btn = true;
        }
        if (lb.effect === undefined) {
            lb.effect = false;
        } else {
            lb.effect = true;
        }
        lb.autoPlay = lb.autoPlay || false;
        lb.autoPlaySpeed = lb.autoPlaySpeed || 3000;
        lb.dot = lb.dot || false;
        lb.dotColor = lb.dotColor || "#3963ec";

        //获取图片的个数并初始化
        var imgList = this.find("img");
        var imgLength = imgList.length; //图片的长度不包括btn
        var imgWidth = imgList.eq(0).width() //图片宽度
        var n = 0; //第几张图片
        imgList.hide();
        imgList.eq(0).show();
        this.css({
            textAlign: "center",
            position: "relative"
        })
        imgList.css({
                cursor: "pointer"
            })
            // 滑动
        if (lb.effect) {
            imgList.show();
            var nva_img = $("<div></div>");
            nva_img.appendTo(this);
            imgList.appendTo(nva_img);
            this.css({
                width: imgList.eq(0).width(),
                overflow: "hidden",
                textAlign: "center",
                margin: "0 auto"
            })
            this.find("div").eq(0).css({
                width: imgList.width() * imgLength
            })
            this.find("img").css({
                float: "left"
            })

            // 下一张图方法
            function rNext() {
                n++;
                if (n < imgLength) {
                    //取所有小圆点颜色
                    $(".ul_dot li").css({
                            backgroundColor: "#FFF"
                        })
                        //nva_img左边距
                    nva_img.animate({
                            marginLeft: -(n * imgWidth)
                        })
                        //小圆点联动
                    $(".ul_dot li").eq(n).css({
                        backgroundColor: lb.dotColor
                    })
                } else {
                    // 去掉小圆点颜色
                    $(".ul_dot li").css({
                        backgroundColor: "#FFF"
                    })
                    nva_img.animate({
                        marginLeft: 0
                    })
                    n = 0;
                    $("ul li").eq(n).css({
                        backgroundColor: lb.dotColor
                    })
                }
            }
            // 上一张图方法
            function lNext() {
                // 去掉小圆点颜色
                $(".ul_dot li").css({
                    backgroundColor: "#FFF"
                })
                n--;
                if (n < 0) {
                    nva_img.animate({
                        marginLeft: -((imgLength - 1) * imgWidth)
                    })
                    n = imgLength - 1;
                    $("ul li").eq(n).css({
                        backgroundColor: lb.dotColor
                    })
                } else {
                    nva_img.animate({
                            marginLeft: -(n * imgWidth)
                        })
                        //小圆点联动
                    $(".ul_dot li").eq(n).css({
                        backgroundColor: lb.dotColor
                    })
                }
            }
        }
        //渐隐渐现
        else {
            function rNext() {
                if (n < imgLength - 1) {
                    $(".ul_dot li").css({
                        backgroundColor: "#FFF"
                    })
                    imgList.eq(n++).fadeOut(function() {
                        imgList.eq(n).fadeIn()
                        $(".ul_dot li").eq(n).css({
                            backgroundColor: lb.dotColor
                        })
                    })
                } else {
                    // 去掉小圆点颜色
                    $(".ul_dot li").css({
                            backgroundColor: "#FFF"
                        })
                        //图片隐藏显示
                    imgList.eq(n).fadeOut(function() {
                        n = 0;
                        imgList.eq(n).fadeIn();
                        //添加小圆点颜色
                        $(".ul_dot li").eq(n).css({
                            backgroundColor: lb.dotColor
                        })
                    })
                }
            }

            function lNext() {
                //清除所有li颜色
                $(".ul_dot li").css({
                    backgroundColor: "#FFF"
                })
                if (n > 0) {
                    imgList.eq(n--).fadeOut(function() {
                        imgList.eq(n).fadeIn();
                        //添加li颜色
                        $("ul li").eq(n).css({
                            backgroundColor: lb.dotColor
                        })
                    })
                } else {
                    imgList.eq(n).fadeOut(function() {
                        n = imgLength - 1;
                        imgList.eq(n).fadeIn()

                        $(".ul_dot li").eq(n).css({
                            backgroundColor: lb.dotColor
                        })
                    })
                }
            }
        }
        //小圆点
        if (lb.dot) {
            // 创建ul
            var ul = $("<ul></ul>");
            ul.addClass("ul_dot")
            var j = 0;
            // ul插入
            ul.appendTo(this);
            for (var i = 0; i < imgLength; i++) {
                //创建li
                var li = $("<li></li>");
                // li插入ul里
                li.appendTo("ul");
                //li写入数字
                li.html(j++);
            }
            //小圆点样式
            $(".ul_dot li").css({
                    listStyle: "none",
                    float: "left",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    marginLeft: "10px",
                    cursor: "pointer",
                    fontSize: "0px"
                })
                //第一个li添加颜色
            $(".ul_dot li").eq(0).css({
                    backgroundColor: lb.dotColor
                })
                //定位ul
            $(".ul_dot").css({
                position: "absolute",
                bottom: "20px"
            }).css({
                left: (this.width() - $(".ul_dot").width()) / 2
            })
        }
        //小圆点点击事件
        if (lb.effect) {
            $(".ul_dot li").click(function() {
                //清除所有li颜色
                $(".ul_dot li").css({
                        backgroundColor: "#FFF"
                    })
                    //当前li添加颜色
                $(this).css({
                    backgroundColor: lb.dotColor
                })
                n = $(this).html();
                //所有图片隐藏
                marginLeft: 0
                    // imgList.hide();
                    //当前小圆点对应的图片显示
                    // imgList.eq(n).fadeIn();
                nva_img.animate({
                    marginLeft: -(n * imgWidth)
                })

            })
        } else {
            $(".ul_dot li").click(function() {
                //清除所有li颜色
                $(".ul_dot li").css({
                        backgroundColor: "#FFF"
                    })
                    //当前li添加颜色
                $(this).css({
                    backgroundColor: lb.dotColor
                })
                n = $(this).html();
                //所有图片隐藏
                imgList.hide();
                //当前小圆点对应的图片显示
                imgList.eq(n).fadeIn();
            })
        }
        //插入btn并绑定点击事件
        if (lb.btn) {
            var l = $("<img src = 'img/l.png'>");
            var r = $("<img src = 'img/r.png'>");
            l.appendTo(this);
            r.appendTo(this);
            l.css({
                position: "absolute",
                top: "45%",
                left: (this.width() - imgList.width()) / 2 + 30,
                transition: "all 0.5s",
                cursor: "pointer",
                opcity: "0.7"
            })
            r.css({
                position: "absolute",
                top: "45%",
                right: (this.width() - imgList.width()) / 2 + 30,
                transition: "all 0.5s",
                cursor: "pointer",
                opacity: 0.7
            })
            l.mouseover(function() {
                l.css({
                    transform: "scale(1.1)",
                    opacity: 1
                })
            })
            l.mouseout(function() {
                l.css({
                    transform: "none",
                    opacity: 0.7
                })
            })
            r.mouseover(function() {
                r.css({
                    transform: "scale(1.1)",
                    opacity: 1
                })
            })
            r.mouseout(function() {
                r.css({
                    transform: "none",
                    opacity: 0.7
                })
            })

            //绑定点击事件
            r.click(function() {
                rNext();
            })
            l.click(function() {
                lNext();
            })
        }

        //自动播放
        if (lb.autoPlay) {
            var t = setInterval(function() {
                if (lb.effect) {
                    rNext();
                } else {
                    rNext();
                }
            }, lb.autoPlaySpeed)

            //鼠标放在图片上清除计时器，离开打开计时器
            var img = $("img")
            var li = $(".ul_dot li")
            img.mouseover(function() {
                clearInterval(t)
            })
            img.mouseout(function() {
                t = setInterval(function() {
                    if (lb.effect) {
                        rNext();
                    } else {
                        rNext();
                    }
                }, lb.autoPlaySpeed)
            })
            li.mouseover(function() {
                clearInterval(t)
            })
        }
    }
})
