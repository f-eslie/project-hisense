<?php
header('content-type:text/html;charset=utf-8');
define('HOST','localhost');
define('USERNAME','root');
define('PASSWORD','');
define('DBNAME','hisense');

header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');

$conn=@new mysqli(HOST,USERNAME,PASSWORD,DBNAME);//连接数据库
if($conn->connect_error){//如果存在错误，输出错误。
    die('数据库连接错误,错误信息：'.$conn->connect_error);
}

$conn->query('SET NAMES UTF8');
