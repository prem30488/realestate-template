const { Property, PropertyType } = require('../models');
const fs = require('fs');
const path = require('path');

async function generateScript() {
    const properties = await Property.findAll({
        include: [{ model: PropertyType, as: 'propertyType' }]
    });

    let script = '# PowerShell script to download property images\n\n';

    const typeKeywords = {
        Apartment: ['apartment', 'property', 'realestate'],
        House: ['house', 'garden', 'property', 'realestate'],
        Villa: ['villa', 'pool', 'property', 'realestate'],
        Commercial: ['office', 'building', 'property', 'realestate'],
        Penthouse: ['penthouse', 'property', 'realestate'],
        Townhouse: ['townhouse', 'property', 'realestate'],
        Studio: ['studio', 'property', 'realestate'],
        Hotel: ['hotel', 'property', 'realestate'],
        Office: ['office', 'property', 'realestate'],
        Warehouse: ['warehouse', 'property', 'realestate']
    };

    properties.forEach((p) => {
        const dir = path
            .join('..', 'frontend', 'public', 'images', p.id.toString())
            .replace(/\\/g, '/');

        script += `if (-not (Test-Path "${dir}")) { New-Item -ItemType Directory -Path "${dir}" -Force }\n`;

        const tags =
            typeKeywords[p.propertyType?.name] || ['property', 'realestate', 'building'];

        for (let j = 1; j <= 3; j++) {
            const keyword = tags[j % tags.length];

            // Better image providers
            const urls = [
                `https://loremflickr.com/1200/800/${keyword}?lock=${p.id}${j}`
            ];

            const dest = `${dir}/img_${j}.jpg`;

            script += `
if (
    -not (Test-Path "${dest}") -or
    (Get-Item "${dest}").Length -lt 5000
) {
    $urls = @(
        "${urls[0]}"
    )

    foreach ($u in $urls) {
        try {
            curl.exe -L "$u" -o "${dest}"
            if ((Get-Item "${dest}").Length -gt 5000) {
                break
            }
        } catch {}
    }
}
`;
        }
    });

    fs.writeFileSync('download_images.ps1', script);

    console.log('Script generated: download_images.ps1');
}

generateScript();