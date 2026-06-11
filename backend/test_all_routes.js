const http = require('http');

async function test(path, description) {
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
                console.log(`\n${description}`);
                console.log(`Path: ${path}`);
                console.log(`Status: ${res.statusCode}`);
                try {
                    const json = JSON.parse(data);
                    if (json.data && Array.isArray(json.data)) {
                        console.log(`Records: ${json.data.length}`);
                        if (json.data.length > 0) {
                            console.log(`First record keys: ${Object.keys(json.data[0]).join(', ').substring(0, 80)}...`);
                        }
                    }
                } catch (e) {
                    console.log(`Data (first 100 chars): ${data.substring(0, 100)}`);
                }
                resolve();
            });
        });

        req.on('error', (e) => {
            console.error(`ERROR: ${e.message}`);
            resolve();
        });

        req.end();
    });
}

async function main() {
    await test('/api/public/localities?limit=2', '✅ LOCALITIES (WORKING)');
    await test('/api/public/interior-designers?limit=2', '❓ INTERIOR DESIGNERS (TESTING)');
    await test('/api/public/interior-articles?limit=2', '❓ INTERIOR ARTICLES (TESTING)');
}

main().then(() => process.exit(0));
