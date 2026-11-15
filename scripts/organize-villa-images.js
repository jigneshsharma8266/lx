const fs = require('fs');
const path = require('path');

const srcDir = 'd:/villa/luxora-villa/public/images';
const destDir = 'd:/villa/luxora-villa/public/images/villa';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Clean mapping of source file -> new descriptive filename
const mapping = {
  // Exterior & Hero
  'igexport-DezoloTk4zq-5.webp': 'hero-villa-exterior-day.webp',
  'igexport-DezoloTk4zq-6.webp': 'villa-night-illumination.webp',
  'WhatsApp Image 2026-11-13 at 10.39.24 AM.jpeg': 'villa-facade-patio.jpeg',
  'igexport-DeGu5BCmZbj-3.jpg': 'villa-lawn-architecture.jpg',
  'igexport-DezoloTk4zq-3.webp': 'villa-entrance-stairs.webp',
  'igexport-DfBrqMiGUy4-7.jpg': 'villa-parking-night.jpg',
  'WhatsApp Image 2026-11-13 at 10.39.24 AM (2).jpeg': 'rooftop-sunset-frame.jpeg',

  // Swimming Pool (Adults)
  'igexport-DezoloTk4zq-2.webp': 'pool-daylight-deck.webp',
  'igexport-DfBrqMiGUy4-8.jpg': 'pool-night-villa.jpg',
  'WhatsApp Image 2026-11-13 at 10.39.22 AM (1).jpeg': 'pool-night-lights.jpeg',
  'WhatsApp Image 2026-11-13 at 10.39.23 AM.jpeg': 'pool-night-gazebo.jpeg',
  'igexport-DfBrqMiGUy4-9.jpg': 'pool-chai-evening.jpg',
  'igexport-DVkJ7kSE7G0-3.jpg': 'pool-loungers-night.jpg',
  'igexport-DeGu5BCmZbj-7.jpg': 'pool-view-balcony.jpg',

  // Dining Hall & In-House Kitchen
  'WhatsApp Image 2026-11-13 at 10.39.26 AM.jpeg': 'dining-hall-stone-wall.jpeg',
  'igexport-DeGu5BCmZbj-16.jpg': 'dining-hall-daylight.jpg',
  'igexport-DVkJ7kSE7G0-4.jpg': 'dining-outdoor-lawn.jpg',
  'igexport-DVkJ7kSE7G0-2.jpg': 'dining-lawn-bonfire.jpg',

  // Bedrooms & Suites (Fully Furnished, AC, Balcony)
  'WhatsApp Image 2026-11-13 at 10.39.20 AM.jpeg': 'room-master-bedroom.jpeg',
  'WhatsApp Image 2026-11-13 at 10.39.20 AM (1).jpeg': 'room-sofa-balcony.jpeg',
  'WhatsApp Image 2026-11-13 at 10.39.20 AM (2).jpeg': 'room-mountain-balcony.jpeg',
  'WhatsApp Image 2026-11-13 at 10.39.21 AM (1).jpeg': 'room-deluxe-suite.jpeg',
  'igexport-DYRaQ0iE7ux.jpg': 'room-smart-tv-netflix.jpg',
  'igexport-DYRaQ0iE7ux-2.jpg': 'room-deluxe-interior.jpg',
  'WhatsApp Image 2026-11-13 at 10.39.25 AM.jpeg': 'bathroom-modern-vanity.jpeg',
  'WhatsApp Image 2026-11-13 at 10.39.25 AM (1).jpeg': 'bathroom-rain-shower.jpeg',

  // Outdoor, Rooftop Terrace & Amenities
  'WhatsApp Image 2026-11-13 at 10.39.23 AM (1).jpeg': 'rooftop-jharokha-sunset.jpeg',
  'igexport-DezoloTk4zq-4.webp': 'rooftop-rajasthani-chhatri.webp',
  'WhatsApp Image 2026-11-13 at 10.39.24 AM (1).jpeg': 'terrace-mountain-dining.jpeg',
  'igexport-DeGu5BCmZbj-11.jpg': 'garden-lawn-sunlight.jpg',
  'igexport-DfBrqMiGUy4-10.jpg': 'amenity-bluetooth-speaker.jpg',

  // Lifestyle & Experiences
  'igexport-DfBrqMiGUy4-12.jpg': 'lifestyle-granite-stairs.jpg',
  'igexport-DfBrqMiGUy4-6.jpg': 'lifestyle-balcony-sunset.jpg',
  'igexport-DfBrqMiGUy4-3.jpg': 'lifestyle-bedroom-mountain.jpg',
  'igexport-DfBrqMiGUy4-2.jpg': 'lifestyle-bedroom-mirror.jpg',
  'igexport-DVkJ7kSE7G0.jpg': 'lifestyle-resort-night.jpg',
  'igexport-DcQdbW7zs4d.jpg': 'villa-signature-collage.jpg'
};

let copiedCount = 0;
for (const [srcName, destName] of Object.entries(mapping)) {
  const srcPath = path.join(srcDir, srcName);
  const destPath = path.join(destDir, destName);

  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`✓ Copied: ${srcName} -> ${destName}`);
    copiedCount++;
  } else {
    console.warn(`! Not found: ${srcName}`);
  }
}

console.log(`\nSuccessfully organized ${copiedCount} official photos into public/images/villa/`);

