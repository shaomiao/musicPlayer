var StreamPlayer = require('stream-player');
var player = new StreamPlayer();



//查询音乐文件
/*
  首先 检查文件是否存在
  存在 然后把文件名添加到plager中

*/
var fs = require('fs');
var tmp = [];
var mulu="music";
var date = new Date();
var hours = date.getHours();
//音乐数组
var songarr=[];
var index=0;
//当前时间文件夹
var songwenjian;
fs.readdir(mulu, function(err,files){
  var zhengze=/^[0-9]{1,2}\-[0-9]{1,2}/;
  
  for (var i = files.length - 1; i >= 0; i--) {
    if(zhengze.test(files[i])){
    //console.log(files+"1");
      tmp.push(files[i]);
    }
    
  }
 // console.log(tmp);
  musicStart();
});
function musicStart(){
   
   //console.log(hours);
   //var filesname;
   //所有时间文件夹
   // for (var i = tmp.length - 1; i >= 0; i--) {
   // // console.log(tmp[i]);
   //  var arr=tmp[i].split("-");
   //  //console.log(arr[0]);
   //  //console.log(arr[1]);
   //  if(hours>=arr[0]&&hours<=arr[1]){
   //    filesname=tmp[i];
   //    //console.log(filesname);
   //    break;
   //  }

     
   // }
   console.log(tmp);
   var filesname= shijian(tmp);
   //console.log(filesname+"4545");
   if(filesname!=undefined){
     fs.readdir(mulu+"/"+filesname, function(err,files){
      //console.log(err);
          //console.log(files);
          if(files!=null){
            var zhengze2=/^.*mp3$/;
            var arr2=[];
            //循环目录下的歌
            for (var i = files.length - 1; i >= 0; i--) {
                if(zhengze2.test(files[i])){
                  arr2.push(files[i]);
              }
              //console.log(arr2);
              
            }
            //循环。mp3文件
            //添加第一首歌
            songarr=arr2;

            var str=mulu+'/'+filesname+"/";
            songwenjian=str;
            // for (var i = arr2.length - 1; i >= 0; i--) {
            //   var str=mulu+'/'+filesname+"/"+arr2[i];
            //   player.add(str);
            //   console.log(str);
            // }
            console.log(str+arr2[0]);
            player.add(str+arr2[0]);

            player.play();

        }
     });
   }
   
   
   
   
}
//判断时间规则
function shijian(tmp){
var date = new Date();
var hours = date.getHours();
var filename;
  //var hours = date.getHours();
  for (var i = tmp.length - 1; i >= 0; i--) {
   // console.log(tmp[i]);
    var arr=tmp[i].split("-");
    //console.log(arr[0]);
    //console.log(arr[1]);
    if(hours>=arr[0]&&hours<=arr[1]){
      filename=tmp[i];

      //console.log(filesname);
      break;
    }

     
   }
   return filename;
}
// console.log(tmp);
// console.log("12212"+tmp.length);
// for (var j = tmp.length - 1; j >= 0; j--) {
//   console.log(tmp[i]);
//    var date = new Date();
//    date.getHours();
//    console.log(date.getHours());
//    if(date){

//    }
// }


// // Add a song url to the queue
// player.add('./89.mp3');
// player.add('./89.mp3');
// player.add('./89.mp3');

// // Add a song url to the queue along with some metadata about the song
// // Metadata can be any object that you want in any format you want
// var metaData = {
//   "title": "Some song",
//   "artist": "Some artist",
//   "duration": 234000,
//   "humanTime": "3:54"
// };

// // player.add('http://path-to-mp3.com/example.mp3', metaData);

// // Start playing all songs added to the queue (FIFO)
// player.play();
player.on('play end', function() {
  console.log('This end!');
  //判断当前时间
  if(songarr!=null){
    index++;
    if(songwenjian!=null){
      console.log(songwenjian+songarr[index]);
      player.add(songwenjian+songarr[index]);
    }
  }
  // 当第一首音乐结束了添加下一首
  //var date = new Date();

  

  // player.add();
  // Code here is executed every time a song ends
});
