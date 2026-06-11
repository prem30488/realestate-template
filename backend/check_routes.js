const http = require('http');

const host = 'http://localhost:3000';
const endpoints = [
    '/api/interior-designers?limit=5&sort=rating',
    '/api/interior-designers?limit=5&sort=name',
    '/api/interior-designers?limit=5&sort=experience',
    '/api/interior-designers?limit=5&sort=projects',
    '/api/interior-designers?limit=5&sort=featured',
    '/api/interior-designers/top?limit=5&sort=rating',
    '/api/interior-designers/top?limit=5&sort=name',
    '/api/public/interior-designers',
    '/api/public/interior-articles'
];

function get(path) {
    return new Promise((resolve) => {
        const req = http.get(host + path, (res) => {
            let body = '';
            res.setEncoding('utf8');
            res.on('data', (c) => { body += c; if (body.length > 2000) body = body.slice(0, 2000); });
            res.on('end', () => resolve({ path, status: res.statusCode, body: body.slice(0, 1200) }));
        });
        req.on('error', (err) => resolve({ path, error: String(err) }));
        req.setTimeout(8000, () => { req.abort(); resolve({ path, error: 'timeout' }); });
    });
}

(async () => {
    for (const p of endpoints) {
        const r = await get(p);
        console.log('---', r.path);
        if (r.error) console.log('ERROR:', r.error);
        else {
            console.log('Status:', r.status);
            console.log('Body sample:\n', r.body || '(empty)');
        }
        console.log('\n');
    }
})();
