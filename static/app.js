var socket = io();

function connect(){
  var queryDict = {};
  location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]});
  socket.json.emit('login',{'roomID':queryDict.rid});
}

function init(){
  connect();
}

window.onload = init();
