const { Project, Locality, Builder, PropertyType } = require('./models');

async function seedMoreProjects() {
    try {
        const localities = await Locality.findAll();
        const builders = await Builder.findAll();
        const propertyTypes = await PropertyType.findAll();

        if (builders.length === 0 || propertyTypes.length === 0) {
            console.error("No builders or property types found. Please seed them first.");
            process.exit(1);
        }

        const projectNames = [
            "Skyline", "Heights", "Valley", "Residences", "Oasis",
            "Meadows", "Park", "Gardens", "Estate", "Villas",
            "Towers", "Plaza", "Avenue", "Terrace", "View",
            "Enclave", "Crest", "Pinnacle", "Ridge", "Grove"
        ];

        let totalAdded = 0;

        for (const loc of localities) {
            const currentProjectsCount = await Project.count({ where: { locality_id: loc.id } });
            
            const needed = Math.max(0, 2 - currentProjectsCount);
            
            for (let i = 0; i < needed; i++) {
                const randomBuilder = builders[Math.floor(Math.random() * builders.length)];
                const randomPropertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
                const randomPrefix = projectNames[Math.floor(Math.random() * projectNames.length)];
                const randomSuffix = projectNames[Math.floor(Math.random() * projectNames.length)];
                
                await Project.create({
                    locality_id: loc.id,
                    city_id: loc.city_id, // Ensure city_id matches locality's city
                    builder_id: randomBuilder.id,
                    property_type_id: randomPropertyType.id,
                    projectName: `${randomPrefix} ${randomSuffix} Phase ${Math.floor(Math.random() * 5) + 1}`,
                    budget: `${Math.floor(Math.random() * 50) + 20} Lacs - ${Math.floor(Math.random() * 5) + 1} Cr`,
                    state: "Gujarat",
                    country: "India",
                    total_units: Math.floor(Math.random() * 500) + 50,
                    project_size: `${Math.floor(Math.random() * 10) + 1} Acres`,
                    total_towers: Math.floor(Math.random() * 10) + 1,
                    bhk: `${Math.floor(Math.random() * 3) + 1}, ${Math.floor(Math.random() * 3) + 2} BHK`,
                    ratings: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
                    photo_url: `/images/projects/project_${Math.floor(Math.random() * 5) + 1}.jpg`
                });
                totalAdded++;
            }
        }
        
        console.log(`Successfully added ${totalAdded} new projects so all localities have at least 2.`);
    } catch (err) {
        console.error("Error seeding more projects:", err);
    }
    process.exit(0);
}

seedMoreProjects();
