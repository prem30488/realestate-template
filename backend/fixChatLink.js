require('dotenv').config();
const { sequelize } = require('./models');

async function updateChatLink() {
    try {
        const whatsappLink = "https://api.whatsapp.com/send/?phone=919624259046&text=Hi%21&type=phone_number&app_absent=0";
        await sequelize.query(
            `UPDATE "MenuItems" SET link = :link WHERE title = 'Chat with Us'`,
            {
                replacements: { link: whatsappLink }
            }
        );
        console.log('✅ Chat with Us link updated in database.');
        process.exit(0);
    } catch (err) {
        console.error('❌ Update failed:', err.message);
        process.exit(1);
    }
}

updateChatLink();
