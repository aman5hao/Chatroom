$(function() {
    var socket = io();
    var username;

    $('#btnSetUsername').click(setUsername);
    $('#btnSendMessage').click(sendMessage);

    function setUsername() {
        username = $('#username').val().trim();

        if (username){
            $('#loginPage').fadeOut();
            $('#chatPage').show();
            $('#msg').focus;
        } else {
            $('#username').addClass('warn');
        }
        socket.emit('login', username);
    }

    function sendMessage() {
        var messagetxt = $('#msg').val().trim();
        if (messagetxt){
            $('#msg').val('');
            var message = {
            username: username,
            messagetxt: messagetxt
            };
             socket.emit('new-message', message);
        } else {
            $('#msg').addClass('warn');
        }
    }

    socket.on('login', function(data) {
        var messageDiv = $('<li>'+data.username+'</span>'+'进入房间.房间人数:'+data.numUsers+'</li>');
        $('#messagelist').append(messageDiv);
    });

    socket.on('logout', function(data) {
        var messageDiv = $('<li>'+data.username+'</span>'+'离开房间.房间人数:'+data.numUsers+'</li>');
        $('#messagelist').append(messageDiv);
    })

    socket.on('new-message', function (msg) {
        var messageDiv = $('<li><span class="username">'+msg.username+'</span>'+'<span class="messagetxt">'+msg.messagetxt+'</span></li>');
        $('#messagelist').append(messageDiv);
    })


})