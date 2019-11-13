<?php
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $choosenDate = $_POST['choosenDate'];
    $choosenObject = $_POST['choosenObject'];
   
	$headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= "Content-type: text/html; charset=utf-8 \r\n";
    $headers .= "From: noreply <Почтовый сервер Haus Master>\r\n";
    if(mail("aisilunya@gmail.com", "Заявка из сайта о вызове мастера", 
    "$name оставил заявку<br/>
    на дату:$choosenDate</br>
    по объекту: $choosenObject<br/>
    Номер телефона клиента: $phone<br/>
    Срочно ему перезвоните, пожалуйста!",
    $headers)) {
    	echo "Сообщение успешно отправлено!";
    };
?>