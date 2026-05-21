const { Builder } = require('./models');

const gandhinagarBuilders = [
  { name: 'G-Tech Constructions', owner: 'Ramesh Patel' },
  { name: 'Capital Infra', owner: 'Suresh Shah' },
  { name: 'Greenleaf Developers', owner: 'Amit Desai' },
  { name: 'Sunrise Buildcon', owner: 'Prakash Mehta' },
  { name: 'Apex Structures', owner: 'Manoj Joshi' },
  { name: 'Horizon Estates', owner: 'Nitin Trivedi' },
  { name: 'Elite Spaces', owner: 'Rajesh Chauhan' },
  { name: 'Prime Foundations', owner: 'Kiran Patel' },
  { name: 'Vanguard Realty', owner: 'Dinesh Sharma' },
  { name: 'Pinnacle Homes', owner: 'Vijay Gupta' }
];

const ahmedabadBuilders = [
  { name: 'A-One Developers', owner: 'Anand Patel' },
  { name: 'Metro Buildwell', owner: 'Bhavesh Shah' },
  { name: 'Heritage Infra', owner: 'Chetan Desai' },
  { name: 'Skyline Projects', owner: 'Dhaval Mehta' },
  { name: 'Urban Living', owner: 'Eshan Joshi' },
  { name: 'Crystal Constructions', owner: 'Gautam Trivedi' },
  { name: 'Silver Oak Realty', owner: 'Hasmukh Chauhan' },
  { name: 'Royal Estates', owner: 'Ishwar Patel' },
  { name: 'Majestic Homes', owner: 'Jayesh Sharma' },
  { name: 'Oasis Buildtech', owner: 'Kamlesh Gupta' }
];

const companyTypes = ['LLC', 'Corporation', 'Partnership', 'Private Limited'];
const specialties = ['Residential', 'Commercial', 'Mixed-Use'];
const services = ['New Construction', 'Remodeling', 'Interior Design', 'Landscaping'];

function generateBuilder(data, city, index) {
  const type = companyTypes[Math.floor(Math.random() * companyTypes.length)];
  const specialty = specialties[Math.floor(Math.random() * specialties.length)];
  const year = 1990 + Math.floor(Math.random() * 30);
  const projects = 10 + Math.floor(Math.random() * 100);
  const active = 1 + Math.floor(Math.random() * 10);
  const rating = (3.5 + Math.random() * 1.5).toFixed(1);
  const reviews = 5 + Math.floor(Math.random() * 50);

  return {
    company_name: data.name,
    owner_name: data.owner,
    logo_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=random&color=fff`,
    description: `${data.name} is a premier construction company in ${city}, specializing in ${specialty} projects. With over ${2026 - year} years of experience, we deliver excellence and quality in every project.`,
    email: `contact@${data.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
    phone_primary: `+91 98${Math.floor(10000000 + Math.random() * 90000000)}`,
    phone_secondary: '',
    website_url: `https://www.${data.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
    office_address: `${100 + index} Main Street, Commercial Hub`,
    city: city,
    state: 'Gujarat',
    zip_code: city === 'Gandhinagar' ? '382010' : '380015',
    license_number: `LIC-${year}-${Math.floor(1000 + Math.random() * 9000)}`,
    tax_id: `GST${Math.floor(10000000 + Math.random() * 90000000)}`,
    established_year: year,
    company_type: type,
    insurance_details: 'Fully Insured up to ₹10 Crore',
    primary_specialty: specialty,
    services_offered: services.sort(() => 0.5 - Math.random()).slice(0, 3),
    operating_regions: [city, 'Surat', 'Vadodara'].sort(() => 0.5 - Math.random()).slice(0, 2),
    total_projects_completed: projects,
    active_projects: active,
    average_rating: parseFloat(rating),
    total_reviews: reviews,
    portfolio_link: '',
    status: 'Active',
    is_verified: true
  };
}

async function seed() {
  try {
    const buildersToInsert = [
      ...gandhinagarBuilders.map((b, i) => generateBuilder(b, 'Gandhinagar', i)),
      ...ahmedabadBuilders.map((b, i) => generateBuilder(b, 'Ahmedabad', i))
    ];

    await Builder.bulkCreate(buildersToInsert);
    console.log('Successfully seeded 20 verified builders!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding builders:', error);
    process.exit(1);
  }
}

seed();
