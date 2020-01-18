<?php

include "conn.php";

if(isset($_POST['phone'])){
    $phone=$_POST['phone'];
    $result=$conn->query("select * from user where phone='$phone'");//如果存在结果，注册的用户名存在。
    if($result->fetch_assoc()){//存在
        echo $result->fetch_assoc();//显示1
    }else{
        echo 0;//空隙
    }
}

