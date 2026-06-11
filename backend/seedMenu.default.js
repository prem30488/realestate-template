// Shared default menu data — used by seedMenu.js and the /api/admin/menu/reset route
module.exports = [
  {
    title: 'Buy', link: '/properties?status=Sell', itemType: 'nav', menuType: 'mega', badge: null, order: 1,
    children: [
      {
        title: 'Popular Choices', itemType: 'section', order: 1, children: [
          { title: 'Ready to Move', link: '/properties?status=Sell&city={city}', order: 1 },
          { title: 'Owner Properties', link: '/properties?status=Sell&postedBy=owner&city={city}', order: 2 },
          { title: 'Budget Homes', link: '/properties?status=Sell&maxPrice=5000000&city={city}', order: 3 },
          { title: 'Premium Homes', link: '/properties?status=Sell&minPrice=10000000&city={city}', order: 4 },
          { title: 'Newly Launched', link: '/properties?status=Sell&orderBy=updatedAt&order=DESC&city={city}', order: 5, badge: 'NEW' },
        ]
      },
      {
        title: 'Property Types', itemType: 'section', order: 2, children: [
          { title: 'Flats in {city}', link: '/properties?type=1&status=Sell&city={city}', order: 1 },
          { title: 'House for sale in {city}', link: '/properties?type=2&status=Sell&city={city}', order: 2 },
          { title: 'Villa in {city}', link: '/properties?type=5&status=Sell&city={city}', order: 3 },
          { title: 'Plot in {city}', link: '/properties?type=16&status=Sell&city={city}', order: 4 },
          { title: 'Office Space in {city}', link: '/properties?type=11&status=Sell&city={city}', order: 5 },
          { title: 'Commercial Space in {city}', link: '/properties?type=3&status=Sell&city={city}', order: 6 },
        ]
      },
      {
        title: 'Budget', itemType: 'section', order: 3, children: [
          { title: 'Under ₹ 50 Lac', link: '/properties?maxPrice=5000000&status=Sell', order: 1 },
          { title: '₹ 50 Lac - ₹ 1 Cr', link: '/properties?minPrice=5000000&maxPrice=10000000&status=Sell', order: 2 },
          { title: '₹ 1 Cr - ₹ 1.5 Cr', link: '/properties?minPrice=10000000&maxPrice=15000000&status=Sell', order: 3 },
          { title: 'Above ₹ 1.5 Cr', link: '/properties?minPrice=15000000&status=Sell', order: 4 },
        ]
      },
      {
        title: 'Explore', itemType: 'section', order: 4, children: [
          { title: 'Builders in {city}', link: '/builders/{city}', order: 1 },
          { title: 'Localities in {city}', link: '/localities/{city}', order: 2 },
          { title: 'Projects in {city}', link: '/projects/{city}', order: 3 },
          { title: 'Find an Agent in {city}', link: '/brokers', order: 4 },
        ]
      },
      {
        title: 'Buying Tools', itemType: 'section', order: 5, children: [
          { title: 'Rates & Trends', link: '/rates-and-trends', order: 1 },
          { title: 'Buy vs Rent', link: '/buy-vs-rent', order: 2 },
          { title: 'Tips and Guides', link: '/tips-and-guides', order: 3 },
          { title: 'Compare Localities', link: '/compare-localities', order: 4 },
          { title: 'EMI Calculator', link: '/emi-calculator', order: 5 },
          { title: 'ROI Calculator', link: '/roi-calculator', order: 6 },
          { title: 'Home Loan Calculator', link: '/home-loan-calculator', order: 7 },
        ]
      },
    ]
  },
  {
    title: 'Rent', link: '/properties?status=Rent', itemType: 'nav', menuType: 'mega', badge: null, order: 2,
    children: [
      {
        title: 'Popular Choices', itemType: 'section', order: 1, children: [
          { title: 'Owner Properties', link: '/properties?status=Rent&postedBy=owner&city={city}', order: 1 },
          { title: 'Verified Properties', link: '/properties?status=Rent&verified=true&city={city}', order: 2 },
          { title: 'Furnished Homes', link: '/properties?status=Rent&furnishing_type=full-furnished&city={city}', order: 3 },
          { title: 'Bachelor Friendly Homes', link: '/properties?status=Rent&bachelor_friendly=true&city={city}', order: 4 },
          { title: 'Immediately Available', link: '/properties?status=Rent&availability=Immediate&city={city}', order: 5 },
        ]
      },
      {
        title: 'Property Type', itemType: 'section', order: 2, children: [
          { title: 'Flat for rent in {city}', link: '/properties?type=1&city={city}&status=Rent', order: 1 },
          { title: 'House for rent in {city}', link: '/properties?type=2&city={city}&status=Rent', order: 2 },
          { title: 'Villa for rent in {city}', link: '/properties?type=5&city={city}&status=Rent', order: 3 },
          { title: 'PG in {city}', link: '/properties?type=1&city={city}&status=Rent', order: 4 },
          { title: 'Office Space in {city}', link: '/properties?type=11&city={city}&status=Rent', order: 5 },
          { title: 'Commercial Space in {city}', link: '/properties?type=3&city={city}&status=Rent', order: 6 },
          { title: 'Coliving Space in {city}', link: '/properties?type=1&city={city}&status=Rent', order: 7 },
          { title: 'Student Hostels in {city}', link: '/properties?type=1&city={city}&status=Rent', order: 8 },
        ]
      },
      {
        title: 'Budget', itemType: 'section', order: 3, children: [
          { title: 'Under ₹ 10,000', link: '/properties?maxPrice=10000&status=Rent', order: 1 },
          { title: '₹ 10,000 - ₹ 15,000', link: '/properties?minPrice=10000&maxPrice=15000&status=Rent', order: 2 },
          { title: '₹ 15,000 - ₹ 25,000', link: '/properties?minPrice=15000&maxPrice=25000&status=Rent', order: 3 },
          { title: 'Above ₹ 25,000', link: '/properties?minPrice=25000&status=Rent', order: 4 },
        ]
      },
      {
        title: 'Explore', itemType: 'section', order: 4, children: [
          { title: 'Localities', link: '/localities/{city}', order: 1 },
          { title: 'Buy Vs Rent', link: '/buy-vs-rent', order: 2 },

          { title: 'Find an Agent', link: '/brokers', order: 3 },
          { title: 'Share Requirement', link: '/share-requirement', order: 4 },
        ]
      },
    ]
  },
  {
    title: 'Sell', link: '#', itemType: 'nav', menuType: 'mega', badge: null, order: 3,
    children: [
      {
        title: 'For Owner', itemType: 'section', order: 1, children: [
          { title: 'Post Property', link: '/my-properties', order: 1, badge: 'FREE' },
          { title: 'My Dashboard', link: '/dashboard', order: 2 },
        ]
      },
      {
        title: 'For Agent & Builder', itemType: 'section', order: 2, children: [
          { title: 'My Dashboard', link: '/dashboard', order: 1 },
          { title: 'Developer Lounge', link: '/developer-lounge', order: 2 },
          { title: 'Sales Enquiry', link: '/share-requirement', order: 3 },
        ]
      },
      {
        title: 'Selling Tools', itemType: 'section', order: 3, children: [
          { title: 'Property Valuation', link: '/property-valuation', order: 1 },
          { title: 'Find an Agent', link: '/brokers', order: 2 },
          { title: 'Rates and Trends', link: '/rates-and-trends', order: 3 },

        ]
      },
    ]
  },
  {
    title: 'Home Loans', link: '#', itemType: 'nav', menuType: null, badge: 'NEW', order: 4,
    children: []
  },
  {
    title: 'Home Interiors', link: '#', itemType: 'nav', menuType: 'sub', badge: 'NEW', order: 5,
    children: [
      { title: 'Explore our services', link: '#', itemType: 'section', order: 1, children: [] },
      { title: 'Home Interior Design Services', link: '/home-interiors', itemType: 'link', order: 2, children: [] },
      { title: 'Design Consultation', link: '#', itemType: 'link', order: 3, children: [] },
      { title: 'Full Home Interior Cost Calculator', link: '#', itemType: 'link', order: 4, children: [] },
      { title: 'Kitchen/Wardrobe Calculator', link: '#', itemType: 'link', order: 5, children: [] },
    ]
  },
  {
    title: 'Help', link: '#', itemType: 'nav', menuType: 'sub', badge: null, order: 6,
    children: [
      { title: 'Help Center', link: '#', itemType: 'link', order: 1, children: [] },
      { title: 'Sales Enquiry', link: '/share-requirement', itemType: 'link', order: 2, children: [] },
      { title: 'Chat with Us', link: 'https://api.whatsapp.com/send/?phone=919624259046&text=Hi%21&type=phone_number&app_absent=0', itemType: 'link', order: 3, children: [] },
    ]
  },
  {
    title: 'About Us', link: '/about', itemType: 'nav', menuType: null, badge: null, order: 7,
    children: []
  },
  {
    title: 'Contact Us', link: '/contact', itemType: 'nav', menuType: null, badge: null, order: 8,
    children: []
  },
];
