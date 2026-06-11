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
        try {
            const parsed = JSON.parse(data);
            console.log('✅ API Response received successfully!');
            console.log('\n📊 PAGINATION INFO:');
            console.log(`   Total Designers: ${parsed.pagination?.total || 'N/A'}`);
            console.log(`   Pages: ${parsed.pagination?.pages || 'N/A'}`);
            console.log(`   Current Page: ${parsed.pagination?.currentPage || 'N/A'}`);

            if (parsed.data && parsed.data.length > 0) {
                console.log('\n🎨 FIRST DESIGNER:');
                const d = parsed.data[0];
                console.log(`   Name: ${d.name}`);
                console.log(`   City: ${d.city}`);
                console.log(`   Rating: ${d.rating}`);
                console.log(`   Projects: ${d.projectsCompleted}`);
                console.log(`   Specializations: ${d.specializations?.join(', ')}`);
            }
        } catch (e) {
            console.error('Error parsing response:', e.message);
        }
    });
});

req.on('error', (e) => {
    console.error(`❌ Error: ${e.message}`);
});

req.end();
