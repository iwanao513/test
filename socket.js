var socket = io.connect();　// C02. ソケットへの接続
var isEnter = false;
var name = '';

// C04. server_to_clientイベント・データを受信する
socket.on("server_to_client", function(data){appendMsg(data.value)});

function appendMsg(text) {
    $("#deta").append("<div>" + text + "</div>");
}