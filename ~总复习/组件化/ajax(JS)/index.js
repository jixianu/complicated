//JS>Ajax模块
    var setAjax = (function () {
        function getJson(ops) {
            this.url = ops.url || '';
            this.type = ops.type || 'get';
            this.callback = ops.callback;
            this.init();
        }
        getJson.prototype = {
            init:function () {
                var xhr = new XMLHttpRequest;
                xhr.open(this.type,this.url);
                xhr.send(null);
                var _this =this;
                xhr.onreadystatechange=function () {
                    if (xhr.status==200&&xhr.readyState==4) {
                        _this.callback(xhr.responseText);
                    }
                }
            }
        }
        return getJson;
    }())




