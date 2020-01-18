<?php

include "conn.php";

if(isset($_POST['phone'])){
    $arr=array();
    $result=$conn->query("select * from user");
    for($i=0;$i<$result->num_rows;$i++){
        $arr[$i]=$result->fetch_assoc();
    }
    echo json_encode($arr);
}

