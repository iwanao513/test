$(function() {
  setInterval(function(){
  //$('body').on('click', 'button[data-btn-type=ajax]', function(e) {
  
   // console.log('click btn');

    //  リクエストの下準備
    //  リクエスト時に一緒に送るデータの作成
    var send_data;
    send_data = {
      //  テキストボックスの値を設定
      user_type : $('input').val()
    };
    console.log(send_data);
    //  WebAPIを叩く
    $.ajax({
      //  リクエストの内容
      url: 'api/users.php',
      dataType: "json",
      data: send_data,
    })
    .done(function(responce) {                                  //  レスポンス成功時の処理
        if (responce.result === "OK") {
          console.log(responce);
          $('div[data-result=""]').html(JSON.stringify(responce));
        } else {
          console.log(responce);
          $('div[data-result=""]').html(JSON.stringify(responce));
        }
        return false;
      }
    )
    .fail(function(XMLHttpRequest, textStatus, errorThrown) {   //  レスポンス失敗時の処理
//        $('div[data-result=""]').html(XMLHttpRequest.status + ' : ' + errorThrown);
        $('div[data-result=""]').html(XMLHttpRequest.responseText);
        return false;
      }
    );

    //  フォーカスをテキストボックスに合わせる
    $('input').focus();
    return false;
  },1000);
 
});

