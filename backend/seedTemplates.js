const { EmailTemplate } = require('./models');

const templates = [
  {
    name: 'Thanksgiving Special',
    subject: '🦃 Happy Thanksgiving from NJ Real Estate!',
    body: `
<div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-radius: 12px; overflow: hidden;">
  <div style="text-align: center; padding: 40px 20px; background: linear-gradient(135deg, #d35400, #f39c12); color: white;">
    <h1 style="margin: 0; font-size: 32px; text-shadow: 1px 1px 2px rgba(0,0,0,0.2);">Happy Thanksgiving!</h1>
    <p style="font-size: 18px; opacity: 0.9; margin-top: 10px;">Giving thanks for clients like you.</p>
  </div>
  <div style="padding: 30px; background-color: #fffaf0;">
    <p style="font-size: 16px; line-height: 1.6;">Dear Subscriber,</p>
    <p style="font-size: 16px; line-height: 1.6;">As we gather around the table this Thanksgiving, we want to take a moment to express our heartfelt gratitude for you. It's clients and friends like you who make our work so rewarding.</p>
    <p style="font-size: 16px; line-height: 1.6;">Whether you're celebrating in a new home or looking forward to finding one, we wish you a day filled with warmth, joy, and wonderful memories with your loved ones.</p>
    <p style="font-size: 16px; line-height: 1.6;">Thank you for being part of our community!</p>
    <br>
    <p style="font-size: 16px; margin-bottom: 5px;">Warmest regards,</p>
    <p style="font-size: 18px; font-weight: bold; color: #d35400; margin-top: 0;">The NJ Real Estate Team</p>
  </div>
</div>
    `
  },
  {
    name: 'Latest Properties Showcase',
    subject: '🏡 Discover Our Newest Premium Properties',
    body: `
<div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; background: #f9f9f9;">
  <div style="text-align: center; padding: 30px 20px; background: #1a1a2e; color: white; border-radius: 8px 8px 0 0;">
    <h2 style="margin: 0; font-size: 28px; letter-spacing: 1px;">Featured Properties</h2>
    <p style="color: #a29bfe; margin-top: 10px; font-size: 16px;">Curated just for you</p>
  </div>
  <div style="padding: 30px 20px; border: 1px solid #eee; border-top: none; background: #ffffff; border-radius: 0 0 8px 8px;">
    <p style="font-size: 16px; color: #555; line-height: 1.5; margin-bottom: 25px;">We're thrilled to share our latest and most exclusive property listings with you. Don't miss out on these incredible opportunities:</p>
    
    <div style="margin: 0 0 25px 0; padding: 20px; background: #fcfcfc; border-radius: 8px; border-left: 4px solid #6a11cb; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
      <h3 style="color: #1a1a2e; margin-top: 0; font-size: 20px;">🌟 Luxury Villa in Gandhinagar</h3>
      <p style="color: #666; line-height: 1.5; margin-bottom: 15px;">Experience unparalleled comfort in this stunning 5-bedroom villa featuring modern amenities, smart home tech, and breathtaking views.</p>
      <a href="/" style="display: inline-block; padding: 10px 24px; background-color: #6a11cb; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">View Details</a>
    </div>

    <div style="margin: 0 0 25px 0; padding: 20px; background: #fcfcfc; border-radius: 8px; border-left: 4px solid #2575fc; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
      <h3 style="color: #1a1a2e; margin-top: 0; font-size: 20px;">🏢 Premium Commercial Space</h3>
      <p style="color: #666; line-height: 1.5; margin-bottom: 15px;">Perfectly located in the heart of the business district. High footfall, premium finishing, ideal for your growing enterprise.</p>
      <a href="/" style="display: inline-block; padding: 10px 24px; background-color: #2575fc; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">View Details</a>
    </div>

    <div style="text-align: center; margin-top: 35px; padding-top: 20px; border-top: 1px solid #eee;">
      <a href="/properties" style="display: inline-block; padding: 14px 32px; background: linear-gradient(90deg, #6a11cb, #2575fc); color: white; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 10px rgba(106, 17, 203, 0.3);">Explore All Properties</a>
    </div>
  </div>
</div>
    `
  },
  {
    name: 'Latest Real Estate News',
    subject: '📰 Market Insights & Latest Real Estate News',
    body: `
<div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; background: #ffffff; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">
  <div style="padding: 25px 30px; background: #f8f9fa; border-bottom: 3px solid #2ecc71;">
    <h2 style="margin: 0; color: #2c3e50; font-size: 26px;">Real Estate Insider</h2>
    <p style="margin: 5px 0 0 0; color: #7f8c8d; font-size: 15px;">Your monthly market update</p>
  </div>
  <div style="padding: 30px;">
    <p style="font-size: 16px; color: #444; line-height: 1.6; margin-bottom: 30px;">Stay informed with our latest curation of market trends, insights, and expert real estate news:</p>
    
    <div style="margin-bottom: 30px;">
      <span style="display: inline-block; background: #e8f8f5; color: #1abc9c; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: bold; margin-bottom: 10px;">MARKET TRENDS</span>
      <h3 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 20px;">Housing Market Predictions for 2026</h3>
      <p style="color: #555; line-height: 1.6; margin: 0 0 10px 0; font-size: 15px;">Discover what experts are predicting for the housing market this year. Are prices stabilizing? Read our comprehensive analysis.</p>
      <a href="/" style="color: #2ecc71; text-decoration: none; font-weight: 600; font-size: 15px;">Read Full Article &rarr;</a>
    </div>

    <div style="margin-bottom: 30px;">
      <span style="display: inline-block; background: #fef9e7; color: #f1c40f; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: bold; margin-bottom: 10px;">BUYER'S GUIDE</span>
      <h3 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 20px;">5 Tips for First-Time Homebuyers</h3>
      <p style="color: #555; line-height: 1.6; margin: 0 0 10px 0; font-size: 15px;">Navigating the real estate market for the first time can be daunting. We've compiled the top 5 essential tips you need to know.</p>
      <a href="/" style="color: #f39c12; text-decoration: none; font-weight: 600; font-size: 15px;">Read Full Article &rarr;</a>
    </div>

    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; margin-top: 40px;">
      <p style="margin: 0 0 15px 0; font-size: 15px; color: #2c3e50; font-weight: 600;">Have questions about the current market?</p>
      <a href="/brokers" style="display: inline-block; padding: 10px 20px; background-color: #34495e; color: white; text-decoration: none; border-radius: 4px; font-size: 14px;">Contact Our Expert Brokers</a>
    </div>
  </div>
</div>
    `
  }
];

async function seed() {
  try {
    for (const t of templates) {
      await EmailTemplate.findOrCreate({
        where: { name: t.name },
        defaults: t
      });
    }
    console.log('Templates seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Failed to seed templates:', err);
    process.exit(1);
  }
}

seed();
