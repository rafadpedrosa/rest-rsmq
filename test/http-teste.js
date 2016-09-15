var http = require("http");

var body = "";

var listQueuesOpt = {
  host: '127.0.0.1',
  port: 8101,
  path: '/queues/'
};

function findAttributes(chunk){
    JSON.parse(""+chunk).queues.forEach(function(entry) {
      var attrOpt = {
        host: '127.0.0.1',
        port: 8101,
        path: '/queues/'+entry
      };
      console.log("entry:"+entry);
      http.get(attrOpt, function(res2) {
        res2.on("data", function(chunk2) {
          console.log("IRUU: \n"+chunk2);
          if (body == "") {
            body += chunk2;
          }else{
            body += ","+chunk2;
          }
        });
      });
    });
}

function callbackRequest(res){
    console.log("Got response: " + res.statusCode);

    res.on("data", findAttributes);

    console.log("acabou");
    res.resume();
}

var response = http.get(listQueuesOpt, callbackRequest);

response.on('error', function(e) {
  console.log("Got error: " + e.message);
});


response.on('end', function(e) {
  console.log("TERMINOU! \n {data:["+body+"]}");
});
response.on('finish', function(e) {
  console.log("TERMINOU 2! \n {data:["+body+"]}");
});
