const http = require('http');

// Test /api/interior-articles endpoint
const url = 'http://localhost:3000/api/interior-articles?limit=12&category=Interiors%20%26%20Decor';

http.get(url, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        try {
            const parsed = JSON.parse(data);
            console.log('✅ /api/interior-articles Status:', res.statusCode);
            console.log('Total Articles:', parsed.totalCount || parsed.articles?.length);
            console.log('Articles Returned:', (parsed.articles || parsed.data || []).length);

            if ((parsed.articles || parsed.data || []).length > 0) {
                const first = (parsed.articles || parsed.data)[0];
                console.log('\n📰 First Article:');
                console.log('  Title:', first.title);
                console.log('  Category:', first.category);
                console.log('  Author:', first.author);
                console.log('  ReadTime:', first.readTime);
                console.log('  Published:', new Date(first.publishedAt).toLocaleDateString());
            }

            // Verify all articles are "Interiors & Decor"
            const articles = parsed.articles || parsed.data || [];
            const allInteriors = articles.every(a => a.category === 'Interiors & Decor');
            console.log('\n✅ All articles filtered as Interiors & Decor:', allInteriors);

        } catch (e) {
            console.log('❌ Error parsing JSON:', e.message);
            console.log('Raw:', data.substring(0, 300));
        }
    });
}).on('error', e => console.error('❌ Request error:', e.message));
