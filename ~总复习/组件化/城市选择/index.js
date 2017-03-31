/*
 * 城市选择面板
 * */
var CitySelectPanel = (function () {
    var hotCityList = [
        { name: "北京", id: 1, py: "Beijing" },
        { name: "上海", id: 2, py: "Shanghai" },
        { name: "天津", id: 3, py: "Tianjin" },
        { name: "重庆", id: 4, py: "Chongqing" },
        { name: "大连", id: 5, py: "Dalina" },
        { name: "青岛", id: 6, py: "Qingdao" },
        { name: "西安", id: 7, py: "Xian" },
        { name: "南京", id: 8, py: "Nanjing" },
        { name: "苏州", id: 9, py: "Suzhou" },
        { name: "杭州", id: 10, py: "Hangzhou" },
        { name: "厦门", id: 11, py: "Xiamen" },
        { name: "成都", id: 12, py: "Shanghai" },
        { name: "深圳", id: 13, py: "Beijing" },
        { name: "广州", id: 14, py: "Shanghai" },
        { name: "三亚", id: 15, py: "Beijing" },
        { name: "台北", id: 16, py: "Shanghai" },
        { name: "香港", id: 17, py: "Beijing" },
        { name: "济南", id: 18, py: "Shanghai" },
        { name: "宁波", id: 19, py: "Beijing" },
        { name: "沈阳", id: 20, py: "Shanghai" },
        { name: "武汉", id: 21, py: "Wuhan" }
    ];
    function CitySelect(ops){
        //参数判断
        if(!ops) return this;
        if(!ops.parent) throw new Error('请输入一个父元素');
        //参数设置
        this.width = this.width || 500;
        this.height = this.height || 150;
        this.parent = $(ops.parent);
        this.options =ops;
        this.init();
    }
    CitySelect.prototype = {
        init:function () {
            var $panel = $("<div class='city-select-container'></div>");
            var $subTab = $("<div class = 'sub-tab'></div>");
            var $subTabTitle = $('<div class="sub-tab-title">'+
                '<ul><li class="current">热门</li>' + '<li>ABCD</li>' + '<li>EFGH</li>' + '<li>IJKL</li>' + '<li>MNOP</li>' + '<li>QRST</li>' + '<li>UVWX</li>' + '<li>YZ</li>' + '</ul>' + '</div>');
            var $subTabContent = $("<div class='sub-tab-content'></div>");
            //添加热门城市
            var content = "<div><ul>";
            $.each(hotCityList,function () {
                content += '<li cityId = '+this.id+' cityPy='+this.py+'>'+this.name+'</li>';
                //alert(this);
            })
            content +="<ul><div>";
            $subTabContent.append(content);
            $subTab.append($subTabTitle).append($subTabContent);

            $panel.css({
                width:this.options.width,
                height:this.options.height
            }).append($subTab).appendTo(this.options.parent);
            this.$panel = $panel;
            this.bindEvents();
        },
        bindEvents:function () {
            this.$panel.on('click','.sub-tab-title li ' ,function () {
                $(this).addClass('current').siblings().removeClass('current');
            })
        },
        show: function() {
            this.$panel.show();
        },
        hide: function() {
            this.$panel.hide();
        },
        destory: function() {
            $panel.remove();
        }
    }
    return CitySelect;
}())