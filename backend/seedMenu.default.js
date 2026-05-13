// Shared default menu data — used by seedMenu.js and the /api/admin/menu/reset route
module.exports = [
  {
    title: 'Buy', link: '#', itemType: 'nav', menuType: 'mega', badge: null, order: 1,
    children: [
      { title: 'Popular Choices', itemType: 'section', order: 1, children: [
        { title: 'Ready to Move',    link: '#', order: 1 },
        { title: 'Owner Properties', link: '#', order: 2 },
        { title: 'Budget Homes',     link: '#', order: 3 },
        { title: 'Premium Homes',    link: '#', order: 4 },
        { title: 'Newly Launched',   link: '#', order: 5, badge: 'NEW' },
      ]},
      { title: 'Property Types', itemType: 'section', order: 2, children: [
        { title: 'Flats in {city}',            link: '#', order: 1 },
        { title: 'House for sale in {city}',   link: '#', order: 2 },
        { title: 'Villa in {city}',            link: '#', order: 3 },
        { title: 'Plot in {city}',             link: '#', order: 4 },
        { title: 'Office Space in {city}',     link: '#', order: 5 },
        { title: 'Commercial Space in {city}', link: '#', order: 6 },
      ]},
      { title: 'Budget', itemType: 'section', order: 3, children: [
        { title: 'Under ₹ 50 Lac',     link: '#', order: 1 },
        { title: '₹ 50 Lac - ₹ 1 Cr', link: '#', order: 2 },
        { title: '₹ 1 Cr - ₹ 1.5 Cr', link: '#', order: 3 },
        { title: 'Above ₹ 1.5 Cr',    link: '#', order: 4 },
      ]},
      { title: 'Explore', itemType: 'section', order: 4, children: [
        { title: 'Builders in {city}',      link: '#', order: 1 },
        { title: 'Localities in {city}',    link: '#', order: 2 },
        { title: 'Projects in {city}',      link: '#', order: 3 },
        { title: 'Find an Agent in {city}', link: '#', order: 4 },
      ]},
      { title: 'Buying Tools', itemType: 'section', order: 5, children: [
        { title: 'Propworth',       link: '#', order: 1 },
        { title: 'Rates & Trends',  link: '#', order: 2 },
        { title: 'Buy vs Rent',     link: '#', order: 3 },
        { title: 'Tips and Guides', link: '#', order: 4 },
      ]},
    ]
  },
  {
    title: 'Rent', link: '#', itemType: 'nav', menuType: 'mega', badge: null, order: 2,
    children: [
      { title: 'Popular Choices', itemType: 'section', order: 1, children: [
        { title: 'Owner Properties',        link: '#', order: 1 },
        { title: 'Verified Properties',     link: '#', order: 2 },
        { title: 'Furnished Homes',         link: '#', order: 3 },
        { title: 'Bachelor Friendly Homes', link: '#', order: 4 },
        { title: 'Immediately Available',   link: '#', order: 5 },
      ]},
      { title: 'Property Type', itemType: 'section', order: 2, children: [
        { title: 'Flat for rent in {city}',      link: '#', order: 1 },
        { title: 'House for rent in {city}',     link: '#', order: 2 },
        { title: 'Villa for rent in {city}',     link: '#', order: 3 },
        { title: 'PG in {city}',                 link: '#', order: 4 },
        { title: 'Office Space in {city}',       link: '#', order: 5 },
        { title: 'Commercial Space in {city}',   link: '#', order: 6 },
        { title: 'Coliving Space in {city}',     link: '#', order: 7 },
        { title: 'Student Hostels in {city}',    link: '#', order: 8 },
      ]},
      { title: 'Budget', itemType: 'section', order: 3, children: [
        { title: 'Under ₹ 10,000',        link: '#', order: 1 },
        { title: '₹ 10,000 - ₹ 15,000',  link: '#', order: 2 },
        { title: '₹ 15,000 - ₹ 25,000',  link: '#', order: 3 },
        { title: 'Above ₹ 25,000',        link: '#', order: 4 },
      ]},
      { title: 'Explore', itemType: 'section', order: 4, children: [
        { title: 'Localities',        link: '#', order: 1 },
        { title: 'Buy Vs Rent',       link: '#', order: 2 },
        { title: 'Find an Agent',     link: '#', order: 3 },
        { title: 'Share Requirement', link: '#', order: 4 },
      ]},
    ]
  },
  {
    title: 'Sell', link: '#', itemType: 'nav', menuType: 'mega', badge: null, order: 3,
    children: [
      { title: 'For Owner', itemType: 'section', order: 1, children: [
        { title: 'Post Property', link: '#', order: 1, badge: 'FREE' },
        { title: 'My Dashboard',  link: '#', order: 2 },
      ]},
      { title: 'For Agent & Builder', itemType: 'section', order: 2, children: [
        { title: 'My Dashboard',     link: '#', order: 1 },
        { title: 'Ad Packages',      link: '#', order: 2 },
        { title: 'iAdvantage',       link: '#', order: 3 },
        { title: 'Developer Lounge', link: '#', order: 4 },
        { title: 'Sales Enquiry',    link: '#', order: 5 },
      ]},
      { title: 'Selling Tools', itemType: 'section', order: 3, children: [
        { title: 'Property Valuation', link: '#', order: 1 },
        { title: 'Find an Agent',      link: '#', order: 2 },
        { title: 'Rates and Trends',   link: '#', order: 3 },
      ]},
    ]
  },
  {
    title: 'Home Loans', link: '#', itemType: 'nav', menuType: null, badge: 'NEW', order: 4,
    children: []
  },
  {
    title: 'Home Interiors', link: '#', itemType: 'nav', menuType: 'sub', badge: 'NEW', order: 5,
    children: [
      { title: 'Explore our services',               link: '#', itemType: 'section', order: 1, children: [] },
      { title: 'Home Interior Design Services',      link: '#', itemType: 'link', order: 2, children: [] },
      { title: 'Design Consultation',                link: '#', itemType: 'link', order: 3, children: [] },
      { title: 'Full Home Interior Cost Calculator', link: '#', itemType: 'link', order: 4, children: [] },
      { title: 'Kitchen/Wardrobe Calculator',        link: '#', itemType: 'link', order: 5, children: [] },
    ]
  },
  {
    title: 'Help', link: '#', itemType: 'nav', menuType: 'sub', badge: null, order: 6,
    children: [
      { title: 'Help Center',   link: '#', itemType: 'link', order: 1, children: [] },
      { title: 'Sales Enquiry', link: '#', itemType: 'link', order: 2, children: [] },
      { title: 'Chat with Us',  link: '#', itemType: 'link', order: 3, children: [] },
    ]
  },
];
