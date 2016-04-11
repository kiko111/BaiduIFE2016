var queueData=[];

//生成随机数列
function randomNum(number){
  if((queueData.length+number)<=60){
    for (var i = 0; i < number; i++) {
      queueData.push(Math.floor(Math.random() * 90 + 10));
    }
  } 
}




//输入数字验证
function testNum(num){
  var param=true;
  var rNum=/^\d+$/;
  if(!num){
    alert("不能为空");
    param=false;
  }else if(!rNum.test(num)) {
    alert("请输入数字");
    param=false;
  }else if(num<10||num>100){
    alert("输入数字需在10——100范围内");
    param=false;
  }else
    param=true;
  return param;

}

// 渲染队列
function renderQueue(exchangeNum){
  //alert(queueData);
  var str="";
  var color=null;
  for(var i=0,len=queueData.length;i<len;i++){
    var leftpx=18*i;
    if(exchangeNum==i){
      color="#EFE250";
    }else{
      color="#EDCCFB";
    }
    str+="<li class='queue-li' style='height:"+queueData[i]*0.9+"px;left:"+leftpx+"px;background-color:"+color+"'></li>";
  }
  document.getElementById("queue-ul").innerHTML=str;

}

//渲染队列数据
function renderQueueData(btnCla,num){
  var classArr=btnCla.split(" ");
  if(classArr[0]=="in"){
    if(queueData.length>60){
      alert("数据已超上限，无法插入！");
    }else if(testNum(num)){
      if(classArr[0]=="in"&&classArr[1]=="left"){
          queueData.splice(0,0,parseInt(num));
        }else{
          queueData.push(parseInt(num));
        }
    }

  }else{
    if(queueData.length==0){
      alert("没有数据，无法移出！");
    }else if(testNum(num)){
      if(classArr[0]=="out"&&classArr[1]=="left"){
          queueData.splice(0,1);
        }else{
          queueData.splice(queueData.length-1,1);
        }
    }
  }
  renderQueue();

}



//侧入、侧出
var btns=document.getElementById("btns").childNodes;
for(var i=0,len=btns.length ;i<len;i++){
  btns[i].addEventListener("click",function(){
  var btnClass=this.className;
  var num=document.getElementById("num-input").value;
  renderQueueData(btnClass,num);
  });
}


//删除数据
document.getElementById("del-btn").addEventListener("click",function(){
  queueData=[];
  renderQueue();
  });

//随机产生序列
document.getElementById("random-btn").addEventListener("click",function(){
  randomNum(40);
  renderQueue();
  });


function swap(i,j,data){
  var x=null;
  x=data[i];
  data[i]=data[j];
  data[j]=x;
}

//冒泡排序
document.getElementById("bubble-btn").addEventListener("click",function(){
  var len=queueData.length;
  var i=0,j=len-1;
  var timer=setInterval(function(){
    if(i>=len){
      clearInterval(timer);
      alert("排序完成");
    }
    if(i==j){
      --j;
      i=0;
    }
    if(queueData[i]>queueData[i+1]){
      swap(i,i+1,queueData);
    }
    renderQueue(i);
    ++i;
  },10);
});

//选择排序
document.getElementById("select-btn").addEventListener("click",function(){
  var len=queueData.length;
  var i=len-1,j=0;
  var timer=setInterval(function(){
    if(j>=len-1){
      clearInterval(timer);
      alert("排序完成");
    }
    if(i==j){
      j++;
      i=len-1;
    }
    if(queueData[j]>queueData[i]){
      swap(i,j,queueData);
    }
    renderQueue(i);
    i--;
  },10);
});




//插入排序
document.getElementById("insert-btn").addEventListener("click",function(){
  var len=queueData.length;
  var i=0,j=1;
  var timer=setInterval(function(){
    if(j>=len){
      clearInterval(timer);
      alert("排序完成");
    }
    if(i==j){
      j++;
      i=0;
    }
    if(queueData[j]<queueData[i]){
      swap(i,j,queueData);
    }
    renderQueue(i);
    i++;
  },10);
});
