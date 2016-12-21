/**
注意事项 ：
如果当前时间无歌曲  就会5分钟定时  然后每5分钟一次查询音乐文件 直到查询出当前时间所对应的文件
播放所有音乐文件后才会  再次重新查询音乐列表
播放下一首的时候会检查时间 确认当前时间否有歌曲播放 有则播放下一首  否则开始定时查询 
两个定时器  musicStart 音乐开始 判断是否有存在当前时间的文件夹  
          allMusic  循环音乐列表为空 一直定时 直到 当前音乐文件夹有歌曲
定时最长测试过2小时定时
**/
//console.log('open');
//var StreamPlayer = require('stream-player');
var StreamPlayer = require('./lib/stream-player');
//console.log('open');
var player = new StreamPlayer();
var fs = require('fs');
// 播放音乐的目录
var mulu="music";
//文件夹名
var filename1;
//一组音乐文件数组
var musicarr;
//当前播放音乐在数组中的坐标
var index=0;
//定时的时间  5 分钟
var datecount=300000;
//var datecount=1000000;
//一组时间文件夹
var datefiles=[];
//console.log('open');
main();
function main(){
  //console.log('main');
  fs.readdir(mulu, function(err,files){
    var zhengze=/^[0-9]{1,2}\-[0-9]{1,2}/;
    datefiles=[];
    for (var i = files.length - 1; i >= 0; i--) {
      if(zhengze.test(files[i])){
        datefiles.push(files[i]);
      }
    }
    if(datefiles!=null||datefiles.length>0){
      musicStart();
    }
  });
}
/*
  开始播放音乐  
  arr2  一组播放音乐文件数组
*/
function musicStart(arr2){
  var filename= getDateByfiles(datefiles);
  if(exDateByfiles(datefiles)||filename!=undefined){
    if(arr2==undefined||arr2==null){
      arr2= allMusic(filename);
    }else{
      //播放第一首
      var str=mulu+"/"+filename+"/";
      filename1=filename;
      musicarr=arr2;
      console.log("musicStart"+arr2);
      console.log("musicStart"+arr2[0]);
      player.add(str+arr2[0]);
      player.play();
    }
  }else{
    console.log("musicStart"+new Date());
    setTimeout(main,datecount);
    console.log("musicStart"+"定时开始");
  }
}
/*
  播放一首歌曲结束以后
*/
player.on('play end', function() {
  //console.log('This end!');
  //判断当前时间
  if (exDate(filename1)) {
    //如果符合播放下一首
    var str=mulu+"/"+filename1+"/";
    index++;
    //console.log("end"+index);
    if(index>=musicarr.length){
      index=0;
      //console.log("end1"+index);
      return allMusic(filename1);
    }
    if(musicarr[index]==undefined){
      index=0;
      //console.log("end2"+index);
      return allMusic(filename1);
    }
    console.log("playend"+musicarr);
    console.log("playend"+musicarr[index]);
    player.add(str+musicarr[index]);
  }else{
    index=0;
    //console.log("end3"+index);
    musicStart();
  } 
});
/*
  根据当前时间判断是否有对应的文件夹
  files 一组文件夹
  return bool
*/
function exDateByfiles(files){
  var date = new Date();
  var hours = date.getHours();
  var flag=false;
  for (var i = files.length - 1; i >= 0; i--) {
    var arr=files[i].split("-");
    if(hours>=arr[0]&&hours<=arr[1]){
      flag=true;
      break;
    }
  }
  return flag;
}
/*
  根据当前时间查询对应的文件夹
  files 一组文件夹数组
  return 当前时间对应的文件夹
*/
function getDateByfiles(files){
  var date = new Date();
  var hours = date.getHours();
  var filename;
  for (var i = files.length - 1; i >= 0; i--) {
    var arr=files[i].split("-");
    if(hours>=arr[0]&&hours<=arr[1]){
      filename=files[i];
      break;
    }
  }
  return filename;
}
/*
  判断当前时间
  根据文件夹名 对比当前时间 
  filename 文件夹名
  return 是否与当前时间相符
*/
function exDate(filename){
  if(filename!=null){
    var date = new Date();
    var hours = date.getHours();
    var zhengze=/^[0-9]{1,2}\-[0-9]{1,2}/;
    if(zhengze.test(filename)){
      var arrstr=filename.split("-");
      if(hours>=arrstr[0]&&hours<=arrstr[1]){
        return true;
      }
    }
  }
  return false;
}
/*
  取当前文件夹的所有文件
  filename 文件夹名
  return  一组音乐文件
*/
function allMusic(filename){
  var arr2=[];
  if(exDate(filename)){
    fs.readdir(mulu+"/"+filename, function(err,files){   
      if(files!=null){
        var zhengze2=/^.*mp3$/;
        //循环目录下的歌
        for (var i = files.length - 1; i >= 0; i--) {
          if(zhengze2.test(files[i])){
            arr2.push(files[i]);
          }
        }
      }
      if(arr2==undefined||arr2==null||arr2.length<=0){
        console.log("allMusic"+new Date());
        setTimeout(main,datecount);
        console.log("allMusic"+"定时开始了allmusic");
      }else{
        musicStart(arr2);
      }
    });

  }

  return arr2;
}
/*
  查找目录下的所有文件
  return 一组时间文件夹
*/
function allDateFiles(){
  var tmp=[];
    fs.readdir(mulu, function(err,files){
    var zhengze=/^[0-9]{1,2}\-[0-9]{1,2}/;
    for (var i = files.length - 1; i >= 0; i--) {
      if(zhengze.test(files[i])){
        tmp.push(files[i]);
      }
    }
  });
  return tmp;
}

        