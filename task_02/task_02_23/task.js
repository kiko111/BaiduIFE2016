//跨浏览器事件处理
var EventUtil={
  addHandler:function(element,type,handler){
    if(element.addEventListener){
      element.addEventListener(type,handler,false);
    }else if(element.attchEvent){
      element.attchEvent("on"+type,handler);
    }else{
      element["on"+type]=handler;
    }
  },
  getEvent:function(event){
    return event?event:window.event;
  },
  getTarget:function(event){
    return event.target||event.srcElement;
  }
}

var btn=document.querySelectorAll("button");
var preBtn=btn[0];
var inBtn=btn[1];
var postBtn=btn[2];
var searchBtn=btn[3];
var root=document.getElementById("root");
var traversal=new Traversal();

//前序 
EventUtil.addHandler(preBtn,"click",function() {
  traversal.treeData=[];
  clearInterval(traversal.timer);
  traversal.preTraversal(root);
  traversal.changeColor();
});

//中序
EventUtil.addHandler(inBtn,"click",function(){
  traversal.treeData=[];
  clearInterval(traversal.timer);
  traversal.inTraversal(root);
  traversal.changeColor();
});
//后序
EventUtil.addHandler(postBtn,"click",function(){
  traversal.treeData=[];
  clearInterval(traversal.timer);
  traversal.postTraversal(root);
  traversal.changeColor();
});

//查询
EventUtil.addHandler(searchBtn,"click",function(){
  traversal.finding=true;
  traversal.treeData=[];
  clearInterval(traversal.timer);
  traversal.preTraversal(root);
  traversal.changeColor();
 
})


//构造函数
function Traversal(){
  this.treeData=[];//将遍历后的数据结存在数组中
  this.timer=null;//定时器
  this.finding=false;
}

//原型方法
Traversal.prototype.preTraversal=function(node){
  this.treeData.push(node);
  if(node.firstElementChild){
    this.preTraversal(node.firstElementChild);
  }
  if(node.lastElementChild){
    this.preTraversal(node.lastElementChild);
  }
};

Traversal.prototype.inTraversal=function(node){
  if(node.firstElementChild){
    this.inTraversal(node.firstElementChild);
  }
  this.treeData.push(node);
  if(node.lastElementChild){
    this.inTraversal(node.lastElementChild);
  }
};

Traversal.prototype.postTraversal=function(node){
  if(node.firstElementChild){
    this.postTraversal(node.firstElementChild);
  }
  if(node.lastElementChild){
    this.postTraversal(node.lastElementChild);
  }
  this.treeData.push(node);
};


Traversal.prototype.changeColor=function(){
  var len=this.treeData.length;
  var data=this.treeData;
  var i=0;
  var last=data[len-1];
  var that=this;
  var status={};
  var flag=false;
  var searchValue=document.getElementById("search-input").value;
  this.timer=setInterval(function(){
    if(i>len-1){
      that.treeData=[];
      data=[];
      if(that.finding&&(!flag)){
        alert("未能找到！");
      }
      clearInterval(that.timer);
    }else{
      if(data[i].firstChild.nodeValue.trim()==searchValue){
        status[i]=true;
      }
      if(i==0){
        data[0].style.backgroundColor="#BECCD8";
      }else{
        if(status[i-1]){
          data[i].style.backgroundColor="#BECCD8";
        }else{
          data[i].style.backgroundColor="#BECCD8";
          data[i-1].style.backgroundColor="white";
        }
      }
    }
    flag=flag||status[i];//判断是否查找到，控制最后是否弹窗提示未找到
    i++;  
  },200);
  
  setTimeout(function(){//清除最后一个样式
    last.style.backgroundColor="white";
    last=null;
  },200*(len+1));

}

