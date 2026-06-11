const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/public/interior-designers?limit=3',
  method: 'GET'
};

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Headers:', res.headers);
    console.log('\nResponse (first 500 chars):');
    console.log(data.substring(0, 500));
  });
});

req.on('error', (e) => {
  console.error(`Error: ${e.message}`);
});

req.end();
