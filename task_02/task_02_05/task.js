/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, hanlder);
    } else  {
        ele["on" + event] = hanlder;
    }
}

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

//console.log(aqiSourceData["北京"]);


// 用于渲染图表的数据
var chartData = {};
//将天气数据独立出来
var cityData=[];
// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: 0,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  var str="<ul>";
  var i=0;
  for( date in chartData){
    var leftpx=0,width=0;
    switch (pageState["nowGraTime"]){
      case "day":
        leftpx=11*i;
        width="10px";
        break;
      case "week":
        leftpx=26*i;
        width="25px";
        break;
      case "month":
        leftpx=52*i;
        width="50px";
        break;
    }

    str+="<li class='queue-li' title='"+date+"："+chartData[date]+"' style='height:"+chartData[date]*0.8+"px;left:"+leftpx+"px;background-color:#EDCCFB;width:"+width+";'></li>";
    i++;
  }
  str+="</ul>";
  document.getElementById("aqi-chart-wrap").innerHTML=str;

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  var inputs=document.getElementsByTagName("input");
  var radioValue=this.value;
  // for(var i=0;i<inputs.length;i++){
  //   if(inputs[i].getAttributes["checked"].nodeValue=="checked"){
  //    radioValue=inputs[i].getAttributes["name"].nodeValue;
  //   }
  // } 
  if(pageState["nowGraTime"]!=radioValue){
    pageState["nowGraTime"]=radioValue;
    chartData={};
  }else{return;}
  // 设置对应数据
 initAqiChartData();
 console.log(chartData);
  renderChart();

  // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数,城市变化
 */
function citySelectChange(selects) {
  // 确定是否选项发生了变化 
  var cityValue=this.value;
  if(pageState["nowSelectCity"]!=cityValue){
    pageState["nowSelectCity"]=cityValue;
     chartData={};
  }else{return;}
  // 设置对应数据
  initAqiChartData();
  renderChart()
  // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var inputs=document.getElementsByTagName("input");
  for(var i=0;i<inputs.length;i++){
    addEventHandler(inputs[i],'click',graTimeChange);
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var citySelect=document.getElementById("city-select");
  var str="";
  var i=0;
  for(var city in aqiSourceData){
    str+="<option value="+i+">"+city+"</option>";
    cityData.push(aqiSourceData[city]);
    i++;
  }
  console.log(cityData);
  citySelect.innerHTML=str;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  addEventHandler(citySelect,'change',citySelectChange);
  //citySelect.addEventHandler('change',citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var cityIndex=parseInt(pageState["nowSelectCity"]);
  var data=cityData[cityIndex];
  switch(pageState["nowGraTime"]){
    case "day":
      chartData=data;
      break;
    case "week":
      var week=0;
      var temp=0;
      var days=0;
      for(day in data){
        if((new Date(day)).getDay()<6){
          temp+=data[day];
          days++;
        }
        if((new Date(day)).getDay()==6){
          temp+=data[day];
          days++;
          chartData["第"+week+"周"]=Math.floor(temp/days);
          temp=0;
          days=0;
          week++;
        }
      }
      break;
    case "month":
      chartData={
        "1月":0,
        "2月":0,
        "3月":0,
      }
      var days1=0,days2=0,days3=0;
      var dataSum1=0,dataSum2=0,dataSum3=0;
      for(var day in data){
        if((new Date(day)).getMonth()==1){
          dataSum1+=data[day];
          days1++;
        }else if((new Date(day)).getMonth()==2){
          dataSum2+=data[day];
          days2++;
        }
        else{
          dataSum3+=data[day];
          days3++;
        }
      }
      chartData["1月"]=Math.floor(dataSum1/days1);
      chartData["2月"]=Math.floor(dataSum2/days2);
      chartData["3月"]=Math.floor(dataSum3/days3);
      console.log(chartData);
      break;
    default:
      chartData={};
  }




}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();
