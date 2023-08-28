const http = require('http');
const useragent = require('useragent');
const getIP = require ('ipware')().get_ip;

const server = http.createServer((req, res) => {

  const userAgentString = req.headers['user-agent'];
  const userAgent = useragent.parse(userAgentString);  
  const clientIP = getIP(req).clientIp.replace(/^::ffff:/, '');

  console.log("--------------------------------");
  console.log('Plataforma:', userAgent.os.family);
  console.log('Navegador:', userAgent.family);
  console.log('Versión del navegador:', userAgent.toVersion());  
  console.log('IP: ',clientIP);

  //res.end('Hi there!');
});

server.listen(3000, () => {
  console.log(`Servidor escuchando: localhost:3000`);
});
