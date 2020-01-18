<?php

include "conn.php";

if(isset($_POST['phone'])){
    $phone=$_POST['phone'];
    $result=$conn->query("select * from user where phone='$phone'");//如果存在结果，注册的用户名存在。
    if($result->fetch_assoc()){//存在
        echo 1;//显示1
    }else{
        echo 0;//空隙
    }
}

if(isset($_POST['submit'])){
    $username=$_POST['username'];
    $psw=$_POST['psw'];
    $conn->query("insert user values(null,'$username','$psw',NOW())");
    // header('location:http://localhost/project-hisense/dist/login.html');
}