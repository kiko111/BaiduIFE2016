/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};


function testCity(){
	var param=true;
	var rCity=/^[a-zA-Z\u4e00-\u9fa5]+$/;
	var city=document.getElementById("aqi-city-input").value;
	if(!city){
		alert("不能为空");
		param=false;
	}else if(!rCity.test(city)) {
		alert("输入格式不对，城市名称必须为中文或英文");
		param=false;
	}else
		param=true;
	
	return param;

}

function testNum(){
	var param=true;
	var rNum=/^\d+$/;
	var num=document.getElementById("aqi-value-input").value ;
	if(!num){
		alert("不能为空");
		param=false;
	}else if(!rNum.test(num)) {
		alert("空气指数为整数");
		param=false;
	}else
		param=true;
	return param;

}


/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
		var city=document.getElementById("aqi-city-input").value.trim();
		var num=document.getElementById("aqi-value-input").value.trim();
		aqiData[city]=num;

	


}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {

	var str="";
    str+="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    if(aqiData){
    	for(var key in aqiData){
    		str+="<tr><td>"+key+"</td><td>"+aqiData[key]+"</td><td><button class='del' onclick=\"delBtnHandle(this,\'"+key+"\')\" id='sss'>删除</button></td></tr>";
		}
    }
    
	document.getElementById('aqi-table').innerHTML=str;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
	if(testCity()&&testNum()){
	  addAqiData();
	  renderAqiList();
	}
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(node,dataKey) {
	delete aqiData[dataKey];
	//alert(JSON.stringify(aqiData));
	renderAqiList();
	//可以采用删除节点的方式，而不是重新渲染整个table
 	//document.getElementById('aqi-table').firstChild.removeChild(node.parentNode.parentNode);
 	

}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	var buttons=document.getElementById("add-btn");
  	buttons.onclick=addBtnHandle;

} 

init();