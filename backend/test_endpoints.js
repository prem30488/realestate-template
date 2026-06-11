const http = require('http');

const paths = [
    '/api/public/localities',
    '/api/localities',
    '/api/public/interior-designers'
];

async function testPath(path) {
    return new Promise((resolve) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: path,
            method: 'GET'
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                resolve({
                    path: path,
                    status: res.statusCode,
                    hasData: data.length > 0,
                    dataPreview: data.substring(0, 100)
                });
            });
        });

        req.on('error', (e) => {
            resolve({
                path: path,
                status: 'ERROR',
                error: e.message
            });
        });

        req.end();
    });
}

async function main() {
    console.log('Testing API endpoints...\n');
    for (const path of paths) {
        const result = await testPath(path);
        console.log(`${result.path}: ${result.status}`);
        if (result.error) console.log(`  Error: ${result.error}`);
        if (result.hasData) console.log(`  Data: ${result.dataPreview}...`);
    }
}

main();
