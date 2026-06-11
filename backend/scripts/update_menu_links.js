const path = require('path');
const db = require(path.join(__dirname, '..', 'models'));

async function run() {
    try {
        await db.sequelize.authenticate();
        console.log('DB connected');

        const updates = [
            { title: 'Design Consultation', link: '/design-consultation' },
            { title: 'Full Home Interior Cost Calculator', link: '/interior-cost-calculator' },
            { title: 'Kitchen/Wardrobe Calculator', link: '/kitchen-wardrobe-calculator' },
        ];

        for (const u of updates) {
            const [count] = await db.MenuItem.update(
                { link: u.link },
                { where: { title: u.title } }
            );
            console.log(`Updated ${count} rows for title='${u.title}'`);
        }

        // Also update any menu items where link is '#' but title mentions these keywords
        const keywordMaps = [
            { keywords: ['full home interior', 'cost calculator'], link: '/interior-cost-calculator' },
            { keywords: ['design consultation'], link: '/design-consultation' },
            { keywords: ['kitchen', 'wardrobe'], link: '/kitchen-wardrobe-calculator' },
        ];

        const items = await db.MenuItem.findAll({ where: { link: '#' } });
        for (const it of items) {
            const title = (it.title || '').toLowerCase();
            for (const km of keywordMaps) {
                if (km.keywords.some(k => title.includes(k))) {
                    it.link = km.link;
                    await it.save();
                    console.log(`Patched item id=${it.id} title='${it.title}' -> ${km.link}`);
                    break;
                }
            }
        }

        console.log('Done');
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

run();
