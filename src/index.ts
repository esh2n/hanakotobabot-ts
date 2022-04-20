import { Client } from 'discord.js';
import http from 'http';
import querystring from 'querystring';

const TOKEN = process.env.TOKEN;

http.createServer(function(req, res){
  if (req.method == 'POST'){
    let data = "";
    req.on('data', function(chunk){
      data += chunk;
    });
    req.on('end', function(){
      if(!data){
        console.log("No post data");
        res.end();
        return;
      }
      const dataObject = querystring.parse(data);
      console.log("post:" + dataObject.type);
      if(dataObject.type == "wake"){
        console.log("Woke up in post");
        res.end();
        return;
      }
      res.end();
    });
  }
  else if (req.method == 'GET'){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Discord Bot is active now\n');
  }
}).listen(8080);

export const client = new Client();
client.on('ready', () => {
  console.log('ready...');
  if (client.user !== null) {
    client.user.setPresence({ activity: { name: '花言葉' } });
  }
});

const funcs: { [key: string]: string } = {
  // describe here your functions.
  echoHanakotoba: './funcs/echoHanakotoba',
  // help: './funcs/help',
};

const loadFunctions = (funcsObj: { [key: string]: string }): void => {
  for (const name in funcsObj) {
      import(funcsObj[name]);
  }
};

loadFunctions(funcs);

client.login(TOKEN);
