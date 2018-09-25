function ischina(str) {
	var reg=/^[\u4E00-\u9FA5]{2,4}$/;
	return reg.test(str);     
}
function isTelCode(str) {
	var reg= /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
	return reg.test(str);
}
function isEmail(str) {
	var reg=/^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
	return reg.test(str);
}

// 检查表单
function check(form) 
{
	if (form.UserName.value == '') 
	{
		alert("请输入用户名!");
		return false;
	}
	else if(!ischina(form.UserName.value))
	{
		alert("请输入中文用户名!");
		return false;
	}
	if (form.Phone.value == '') 
	{
		alert("请输入电话号码!");
		return false;
	}
	else if(!isTelCode(form.Phone.value))
	{
		alert("请输入正确的电话号码!");
		return false;
	}
	if(form.Email.value == '')
	{
		alert("请输入邮箱地址!");
		return false;
	}
	else if(!isEmail(form.Email.value))
	{
		alert("请输入正确的邮箱地址!");
		return false;
	}
	if(form.Password.value == '' || form.rePassword.value == '')
	{
		alert("请输入密码和确认密码!");
		return false;
	}
	else if(form.Password.value.length < 6)
	{
		alert("密码长度不足6位,请重试!");
		return false;
	}
	else if(form.Password.value != form.rePassword.value )
	{
		alert("两次密码输入不一致!");
		return false ;
	}
	alert("成功提交注册信息!");
	return true;
}

// 获取当前时间
function getCurDate()  
{  
	var d = new Date();  
	var week;  
	switch (d.getDay()){  
		case 1: week="星期一"; break;  
		case 2: week="星期二"; break;  
		case 3: week="星期三"; break;  
		case 4: week="星期四"; break;  
		case 5: week="星期五"; break;  
		case 6: week="星期六"; break;  
		default: week="星期天";  
	}  
	var years = d.getFullYear();  
	var month = add_zero(d.getMonth()+1);  
	var days = add_zero(d.getDate());  
	var hours = add_zero(d.getHours());  
	var minutes = add_zero(d.getMinutes());  
	var seconds=add_zero(d.getSeconds());  
	var ndate = years+"年"+month+"月"+days+"日 "+hours+":"+minutes+":"+seconds+" "+week;  
	divT.innerHTML= ndate;  
	if( d.getHours() >=6 && d.getHours() <= 12)
		divW.innerHTML = "上午好";
	else if( d.getHours() >= 12 && d.getHours() <= 14)
		divW.innerHTML = "中午好";
	else if( d.getHours() >= 14 && d.getHours() <= 18 )
		divW.innerHTML = "下午好";
	else 
		divW.innerHTML = "夜深了";

}  

//前面补0
function add_zero(temp)  
{  
	if(temp<10) return "0"+temp;  
	else return temp;  
}  

// BOM，每xx毫秒调用一次
setInterval("getCurDate()",100);  

