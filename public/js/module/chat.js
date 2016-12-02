/**
 * chat
 * Created by phachon@163.com
 */

var Chat = {

    /**
     * user_id
     */
    userId: 0,

    /**
     * socket
     */
    socket: null,

    /**
     * chat div element
     */
    chatElement: '#chat_ul',

    /**
     * 初始化，连接服务端
     */
    init: function () {
        this.userId = $('input[name="user_id"]').val();
        //连接
        this.socket = io.connect('http://127.0.0.1:3001');
        //发送 join 事件
        this.socket.emit('join', this.userId);

        this.show();

        $(document).keydown(function (e) {
            var curKey = e.which;
            if(curKey == 13) {
                $("#send").click();
            }
        });
    },

    /**
     * 发送消息给服务端
     * @param element
     */
    submit: function (element) {
        var message = $('input[name="message"]').val();

        if(message == '' || message == undefined) {
            return false;
        }
        if(this.socket == null || !this.userId) {
            this.init();
        }
        //发送消息事件
        this.socket.emit('send', this.userId, message);
        //清除消息
        $('input[name="message"]').val('');
    },

    /**
     * 退出服务端
     */
    logout: function (text, url, data) {

        swal({
            title: "警告",
            text: text,
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "YES",
            cancelButtonText: "NO",
            closeOnConfirm: false
            },
            function() {
                Common.submit(url, data, 'reload');
                if(Chat.socket !== null && Chat.userId) {
                    //发送退出事件
                    Chat.socket.emit('logout', Chat.userId);
                }
            }
        );
    },

    /**
     * 实时显示信息
     */
    show: function () {

        /**
         * 在线人数
         */
        this.socket.on('onlineCount', function(count) {
            var text = 'Online：' + count;
            $("#online_count").html(text);
        });

        /**
         * 用户状态
         */
        this.socket.on('userStatus', function (userId) {
            $('.account-list span[data="'+userId+'"]').removeClass('icon-circle text-warning');
            $('.account-list span[data="'+userId+'"]').addClass('icon-circle text-success');
        });

        /**
         * 消息
         */
        this.socket.on('show', function(userId, message) {
            if(userId == Chat.userId) {
                $(Chat.chatElement).append(Chat.rightMessage(message));
            }else {
                $(Chat.chatElement).append(Chat.leftMessage(message));
            }
            $(Chat.chatElement).show();
        });
    },

    /**
     * left message
     */
    leftMessage: function (message, img) {
        var message = '<li class="position-left">' +
            '<a href="#"><img src="/images/avatar-female2.png" class="img-circle" alt=""></a>' +
            '<span>'+ message +'</span>' +
            '</li>';
        return message;
    },

    /**
     * right message
     */
    rightMessage: function (message, img) {
        var message = '<li class="position-right">' +
            '<span>'+ message +'</span>' +
            '<a href="#"><img src="/images/avatar-female2.png" class="img-circle" alt=""></a>' +
            '</li>';
        return message;
    }
};
