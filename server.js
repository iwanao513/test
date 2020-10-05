// S01.  必要なモジュールを読み込む
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cron = require('node-cron');
 
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
 
http.listen(3001, () => {
  console.log('listening on *:3001');
});


var old_size=0;


var mysql = require('mysql');

// MySQLとのコネクションの作成
var con = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	database: 'red'
});

var today = new Date();
var tablename=String(today.getFullYear())+"_"+String(today.getMonth()+1)+"_"+ String(today.getDate())
// 接続
con.connect(function(err) {
	if (err) throw err;
	console.log('Connected');
});
io.on('connection', (socket) => {
con.query('SELECT * from '+tablename+' ORDER BY 時間', function (err, result, fields) {
	if (err) throw err;  
	
	var size=result.length
	var arr=[]
	for(let i=0; i<size; i++){
	  arr[i]=[result[i].時間,result[i].センテンス];
	}
	
		io.emit('server_to_client', {value : arr});
		socket.on('disconnect', () => {
			console.log('user disconnected');
		  });
		
	old_size=result.length	  
	});	

});

function main(){
    cron.schedule('*/1 * * * * *', () => {
        con.query('SELECT * from '+tablename+' ORDER BY 時間', function (err, result, fields) {
			if (err) throw err;
            var new_size=result.length
			var arr=[]
            if(old_size!=new_size){
                for(let i=old_size; i<new_size; i++){
					arr[i-old_size]=[result[i].時間,result[i].センテンス];
					console.log(arr[i-old_size]);
				}	
				
					console.log('connect');
					io.emit('server_to_client', {value : arr});
				
                   old_size=result.length
            }

			});     
		 });
}
main();
    

    /*
while(true){
	con.query('SELECT * from '+tablename+' ORDER BY 時間', function (err, result, fields) {
	if (err) throw err;
	var new_size=result.length
	var arr=[]
	if(old_size!=0){
    	for(let i=old_size; i<new_size; i++){
    		arr[i]=[result[i].時間,result[i].センテンス];
   	    }	
   	    io.sockets.emit('server_to_client2', {value : arr});
   	}
	old_size=result.length
	});
}
*/

/*
// Redの取得
io.sockets.on('connection', function(socket) { 
    var name;
    // S05. client_to_serverイベント・データを受信する
    socket.on('client_to_server', function(data) {
        // S06. server_to_clientイベント・データを送信する
        io.sockets.emit('server_to_client', {value : data.value});
    });
    // S07. client_to_server_broadcastイベント・データを受信し、送信元以外に送信する
    socket.on('client_to_server_broadcast', function(data) {
        socket.broadcast.emit('server_to_client', {value : data.value});
    });
    // S08. client_to_server_personalイベント・データを受信し、送信元だけに送信する
    socket.on('client_to_server_personal', function(data) {
        var id = socket.id;
        name = data.value;
        var personalMessage = "あなたは、" + name + "さんとして入室しました。"
        io.to(id).emit('server_to_client', {value : personalMessage})
    });
});
*/
// 接続終了
//con.end();