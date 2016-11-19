var common = {
    getStaticJson: function (url, succb, errcb) {
        var url = 'jsondata/' + url;
        $.ajax({
            async: true,
            url: url,
            dataType: 'json',
            data: {},
            type: 'GET',
            success: function (result, textStatus, xhr) {
                succb && succb(result);
            },
            error: function (xhr, textStatus, error) {
                errcb && errcb(xhr);
            }
        });
    },
    global: {
        sideMenu: function (urls) {
            var smhtml = $.ajax({
                type: "GET",
                url: urls,
                data: {},
                async: false,
                dataType: "html"
            }).responseText;
            return $(smhtml);
        }
    },
    //轮播
    bannermover: function () {
        var curIndex = 0;
        var itemBox = $('.banner-item-box');
        var bitem = $('.banner-item');
        var listbox = $('.bannerList');
        var listcr = $('.bannerList li');
        var imgLen = bitem.length;
        var indwidth = (listcr.width() + 16) * (listcr.length);

        $('.listbox').css('margin-left', -(indwidth / 2));
        var autoChange = setInterval(function () {
            if (curIndex < imgLen - 1) {
                curIndex++;
            } else {
                curIndex = 0;
            }
            //调用变换处理函数
            changeTo(curIndex);
        }, 5000);
        $(window).resize(function () {
            //调用变换处理函数
            changeTo(curIndex);
        });
        function autoChangeAgain() {
            autoChange = setInterval(function () {
                if (curIndex < imgLen - 1) {
                    curIndex++;
                } else {
                    curIndex = 0;
                }
                //调用变换处理函数
                changeTo(curIndex);
            }, 5000);
        };
        //左箭头点击处理
        $(".prev-btn").hover(function () {
            clearInterval(autoChange);
        }, function () {
            autoChangeAgain();
        });
        $(".prev-btn").click(function () {
            curIndex = (curIndex > 0) ? (--curIndex) : (imgLen - 1);
            changeTo(curIndex);
        });
        //右箭头点击处理
        $(".next-btn").hover(function () {
            clearInterval(autoChange);
        }, function () {
            autoChangeAgain();
        });

        $(".next-btn").click(function () {
            curIndex = (curIndex < imgLen - 1) ? (++curIndex) : 0;
            changeTo(curIndex);
        });
        function changeTo(num) {
            var winwidth = $('.run-banner').width();
            var goLeft;
            if(winwidth<1000){
                goLeft = 1000;
            }else {
                goLeft = num * winwidth;
            }
            itemBox.stop().animate({left: "-" + goLeft + "px"}, 500);
            listcr.removeClass("indexOn").eq(num).addClass("indexOn");

        };
        listcr.each(function (item) {
            $(this).click(function () {
                clearInterval(autoChange);
                changeTo(item);
                curIndex = item;
                autoChangeAgain(curIndex);
            });
        });

    },
    //banner居中
    bannercenter: function (obj) {
        $(function () {
            var win = $(window);
            cal(obj);
            win.resize(function () {
                cal(obj);
            });
            function cal(obj) {
                var bitemW = $('.banner-box').width();
                $('.banner-item').css('width',bitemW);
                var win_width = win.outerWidth();
                var distance = 1440 - win_width;
                if (distance < 0 ){
                    obj.css({
                        "left": 'auto'
                    });
                    return false;
                }else if(distance >= 440){
                    obj.css({
                        "left": '-220px;'
                    });
                }else{
                    distance = Math.floor((distance) / 2);
                    obj.css({
                        "left": -distance + "px"
                    });
                }

            }
        })
    },
    //当前页面状态
    currUrl:function (obj) {
        var currUrl = window.location.pathname;
        $.each(obj,function(){
            var aurl = $(this).attr('href');
            if (currUrl == aurl){
                $(this).parents('li').addClass("current").siblings().removeClass('current');
                return false;
            }
        });
    }
}

