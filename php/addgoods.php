<?php

include "conn.php";

// if(isset($_GET['sid'])){
//     $sid=$_GET['sid'];
//     $result=$conn->query("select * from taobaopic where sid=$sid");
//     echo json_encode($result->fetch_assoc());
// }else{
//     exit('非法操作');
// }

$sql="INSERT index VALUES(null,'//img.shop.hisense.com/2019/05/29/9af8e2dd-09f5-46c5-b89f-ec0bfdeb13b4.png','
55英寸/AI声控/超薄全面屏/MEMC防抖/2GB+32GB电视','活动价2999元!30天保价','2999','//img.shop.hisense.com/2019/05/29/9af8e2dd-09f5-46c5-b89f-ec0bfdeb13b4.png,//img.shop.hisense.com/2019/05/29/8c54b2a3-7dfb-4893-ac05-61175c493919.png,//img.shop.hisense.com/2019/05/29/8aac531b-68ed-4fa4-82d6-b3e710a18553.png,//img.shop.hisense.com/2019/05/29/5a5efb57-5f3f-4859-8b9e-86af531e188e.png,//img.shop.hisense.com/2019/05/29/1f871c1a-b45d-456c-960b-7d14a014f0bf.png,//img.shop.hisense.com/2019/05/29/13081859-b042-4323-bbe2-efd8af3a4c67.png,//img.shop.hisense.com/2019/05/29/018e694a-6ad1-4291-bc3f-e56dc60d1d2b.png,//img.shop.hisense.com/2019/09/15/28336379-aea2-4d32-b6c9-6e5f0ef346a0.jpg'),
(null,'//img.shop.hisense.com/2019/05/13/155d7c4c-fe8b-477c-8000-7ee4f8138b5b.png','55英寸/OLED超画质/4K超高清/智能液晶电视','只见美景，不留残影！','8999','//img.shop.hisense.com/2019/05/13/155d7c4c-fe8b-477c-8000-7ee4f8138b5b.png'),
(null,'//img.shop.hisense.com/2019/05/13/b5643a9a-a794-4fde-94e6-52a8412a18e3.png','55英寸/U+超画质引擎/零框感悬浮屏设计/剑脊式滤音仓/3+32GB内存/杜比全景声','画质之上，再造巅峰！','7699','//img.shop.hisense.com/2019/05/13/b5643a9a-a794-4fde-94e6-52a8412a18e3.png,//img.shop.hisense.com/2019/03/27/05f661db-782d-4368-84b8-ffb0eb12cde6.png,//img.shop.hisense.com/2019/03/27/e1c19e00-bd57-4639-b9cb-ac4396919cb2.png,//img.shop.hisense.com/2019/03/27/c885ac36-2c05-49d7-8752-93f64693f9f4.png')",
(null,'//img.shop.hisense.com/2019/05/29/4fc7c53d-4989-4575-aae6-04321386ae7b.png',)


$conn->query($sql);
