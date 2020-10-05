<?php
/*
 * ---Mysqlにコネクト
 * 接続先のMySQL サーバ　→　localhost
 * ユーザー名　→　root
 * Pass　→　無し
 * DBの名前　→　test
*/
$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
socket_bind($socket, '0.0.0.0', 8000);
socket_listen($socket, 5);

while ($remote = socket_accept($socket)) {
    $data = '';
    while ($buffer = socket_read($remote, 1024)) {
        $data .= $buffer;
    }
    socket_write($remote, $data);
    socket_close($remote);
}



$link = mysqli_connect('localhost', 'root', '','red');
if (!$link) {
//    die('接続失敗です。'.mysql_error());
	echo '接続失敗です。';
}

// MySQLに対する処理
/* Select クエリを実行します。これは結果セットを返します */
if ($result = mysqli_query($link, "SELECT * FROM 2020_9_29 ORDER BY 時間 DESC LIMIT 10")) {

/*
 while( $data = $result->fetch_object() ) {
   var_dump($data);
   echo "<br>";
 }
*/
    $json = json_encode($result->fetch_all());//10件全て返す
    echo $json;

    /* 結果セットを開放します */
    mysqli_free_result($result);
}
else{print("取得失敗です。");}


$close_flag = mysqli_close($link);

if ($close_flag){
//    print('<p>切断に成功しました。</p>');
}

/**
 * 結果をjsonで返却する
 *
 * @param  array resultArray 返却値
 * @return string jsonで表現されたレスポンス
 * @author kobayashi
 **/
/*
function returnJson($resultArray){
  if(array_key_exists('callback', $_GET)){
    $json = $_GET['callback'] . "(" . json_encode($resultArray) . ");";
  }else{
    $json = json_encode($resultArray);
  }
  header('Content-Type: text/html; charset=utf-8');
  echo  $json;
  exit(0);
}



/**
 * ユーザの一覧をjsonで返す
 *
 * @param string user_type  a,admin,o,operatorg,guest,のいずれか
 * @return array
 *          string result   OK,NG
 *          array  users   成功時のみ。ユーザリスト
 *              string name ユーザ名
 *              int age 年齢
 *          string message  失敗時のみ。エラーメッセージ
 *
 * @author kobayashi
 *
//---------------------------------------------------------
//  処理の開始
//---------------------------------------------------------
//  値の取得（リクエストの受付）
$type = $_REQUEST['user_type'];

//  ユーザリストの初期化
$user_list = [];
//  返却値の初期化
$result = [];

try {
  //  値の検証
  if (empty($type)) {
    throw new RuntimeException("no type...");
  }

  //  ユーザリストの作成
  switch ($type) {
    case 'a':
    case 'admin':
      $user_list = [
        ['name'=>'中居','age'=>18]
      ];
      break;
    case 'o':
    case 'operator':
      $user_list = [
        ['name'=>'木村','age'=>17],
        ['name'=>'森','age'=>16]
      ];
      break;
    case 'g':
    case 'guest':
      $user_list = [
        ['name'=>'香取','age'=>14],
        ['name'=>'草薙','age'=>15],
        ['name'=>'稲垣','age'=>15],
        ['name'=>'岡田','age'=>15],
        ['name'=>'森田','age'=>15],
        ['name'=>'三宅','age'=>15],
        ['name'=>'長野','age'=>15],
        ['name'=>'坂本','age'=>15],
        ['name'=>'井ノ原','age'=>15]
      ];
      break;
    case 'e':
    case 'empty':
      $user_list = [];
      break;
    default:
      //  不正な値
      throw new RuntimeException("Invalid value...");
      break;
  }

  if (empty($user_list)) {
    header("HTTP/1.1 404 Not Found");
    exit(0);
  }

  //  返却値の作成
  $result = [
    'users' => $user_list
  ];
  //  JSONでレスポンスを返す
  returnJson($result);

} catch (RuntimeException $e) {
  header("HTTP/1.1 400 Bad Reques");
  exit(0);
} catch (Exception $e) {
  header("HTTP/1.1 500 Internal Server Error");
  exit(0);
}

*/