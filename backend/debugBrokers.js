const { Broker } = require('./models');

async function checkBrokers() {
    try {
        const brokers = await Broker.findAll({ where: { isDeleted: false } });
        console.log('Total Brokers:', brokers.length);
        brokers.forEach(b => {
            console.log(`Name: ${b.name}, City: "${b.city}"`);
        });
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkBrokers();
