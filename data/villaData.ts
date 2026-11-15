/**
 * LUXORA VILLA, UDAIPUR — OFFICIAL DATA & CONFIGURATION STORE
 * 
 * ----------------------------------------------------------------------------------
 * VERIFIED PROPERTY SPECIFICATIONS (Confirmed directly by Villa Management):
 * - Location: Udaipur, Rajasthan, India
 * - Private Swimming Pool: Dedicated Adult Pool
 * - Bedrooms: Fully Furnished with Air Conditioning (AC)
 * - Dining: Spacious Dedicated Dining Hall + In-House Kitchen Menu
 * - Outdoor: Beautiful Garden, Outdoor Sitting Area, Scenic Aravalli Mountain Views
 * - Amenities: Bluetooth Speaker, Parking for up to 5 Cars, 24/7 Power Backup
 * - Atmosphere: Perfect for Families, Friends & Private Gatherings
 * ----------------------------------------------------------------------------------
 */

export interface MenuItem {
  name: string;
  price: number;
  description?: string;
  isSpecialty?: boolean;
}

export interface MenuCategory {
  id: string;
  title: string;
  badge?: string;
  items: MenuItem[];
}

export interface VillaAngle {
  id: string;
  degrees: number;
  label: string;
  cardinal: string;
  title: string;
  description: string;
  features: string[];
  image: string;
}

export interface VillaImage {
  id: string;
  url: string;
  title: string;
  category: "villa" | "rooms" | "pool" | "dining" | "food" | "outdoor" | "experiences";
  caption: string;
  isTemporary: boolean;
  featured?: boolean;
}

export interface ExperienceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  image: string;
  isTemporaryImage: boolean;
  accent: string;
}

export interface GuestImpression {
  id: string;
  guestName: string;
  stayType: string;
  dates: string;
  quote: string;
  rating: number;
  isDemoReview: boolean;
}

export interface NearbyAttraction {
  name: string;
  distance: string;
  category: string;
  description: string;
}

export const villaData = {
  meta: {
    name: "Luxora Villa",
    locationTag: "Udaipur, Rajasthan",
    shortName: "Luxora",
    brandCollection: "Luxora By Royal Portico Villa's",
    motto: "Stay Grand. Stay Luxora.",
    tagline: "Escape the Ordinary in Udaipur.",
    heroSubtitle:
      "Your private sanctuary in the City of Lakes. Unwind with a private swimming pool, scenic Aravalli mountain views, spacious dining hall, and tranquil garden living.",
    introHeading: "More Than a Stay. An Entire Experience in Udaipur.",
    introBody1:
      "Welcome to Luxora Villa, Udaipur! Tucked away amidst scenic mountain foothills, our private villa is tailored for families, groups of friends, and private getaways seeking serenity with luxury comfort.",
    introBody2:
      "Enjoy complete exclusivity with a private adult swimming pool, air-conditioned fully furnished bedrooms, a spacious dining hall serving freshly prepared authentic dishes, lush lawns, power backup, and private parking for up to 5 cars.",
  },

  contact: {
    phone: "+91 98290 00000",
    phoneDisplay: "+91 (Udaipur)",
    whatsappNumber: "919829000000", // E.164 formatted number for wa.me URL
    email: "reservations@luxoravilla.com",
    addressLine1: "Luxora Villa, Scenic Foothills",
    addressLine2: "Udaipur, Rajasthan 313001, India",
    cityState: "Udaipur, Rajasthan",
    googleMapsUrl: "https://maps.app.goo.gl/QUUzn5KWQkLSnLTc6",
    instagramUrl: "https://www.instagram.com/_luxora_villa/",
    instagramHandle: "_luxora_villa",
  },

  // Confirmed Property Key Highlights
  verifiedFeatures: [
    { title: "Private Adult Pool", desc: "Secluded adult swimming pool for refreshing dips" },
    { title: "Scenic Mountain View", desc: "Panoramic vistas of the surrounding Aravalli ranges" },
    { title: "AC Bedrooms", desc: "Fully furnished air-conditioned luxury bedrooms" },
    { title: "Spacious Dining Hall", desc: "Dedicated hall for group dining and celebrations" },
    { title: "Garden Sitting Area", desc: "Manicured green lawn with comfortable open-air seating" },
    { title: "Bluetooth Sound", desc: "High-quality sound setup for your music and gatherings" },
    { title: "5-Car Parking", desc: "Private secure on-site parking for up to 5 vehicles" },
    { title: "24/7 Power Backup", desc: "Full power backup for uninterrupted comfort" },
  ],

  specs: [
    { label: "Location", value: "Udaipur, Rajasthan" },
    { label: "Private Pool", value: "Adult Swimming Pool" },
    { label: "Comfort", value: "Fully Furnished AC Rooms" },
    { label: "Dining Hall", value: "Dedicated Hall & Kitchen" },
    { label: "Mountain View", value: "Scenic Aravalli Vistas" },
    { label: "Private Parking", value: "Up to 5 Cars" },
  ],

  // Official In-House Kitchen & Dining Menu (Directly from Villa Owner)
  menu: [
    {
      id: "starters",
      title: "Starters & Appetizers",
      badge: "Popular Bites",
      items: [
        { name: "Roasted Papad", price: 30 },
        { name: "Fry Papad", price: 40 },
        { name: "Roasted Masala Papad", price: 50 },
        { name: "Fry Masala Papad", price: 60 },
        { name: "Green Salad", price: 100 },
        { name: "Peanut Masala", price: 150 },
        { name: "Channa Chaat", price: 150 },
        { name: "French Fries", price: 150 },
        { name: "Hara Bhara Kabab", price: 150, isSpecialty: true },
        { name: "Dahi Kabab", price: 150, isSpecialty: true },
        { name: "Veg Crispy Corn", price: 180 },
        { name: "Paneer Chilli", price: 250, isSpecialty: true },
        { name: "Paneer Pakoda", price: 220 },
        { name: "Veg Chowmein", price: 230 },
        { name: "Aloo Sandwich", price: 230 },
      ],
    },
    {
      id: "main-course",
      title: "Main Course & Curries",
      badge: "Homestyle Delights",
      items: [
        { name: "Sev Tamatar", price: 180, description: "Classic Mewari comfort specialty with savory sev in spiced tomato gravy", isSpecialty: true },
        { name: "Dahi Fry", price: 180, description: "Tempered spiced yogurt delicacy" },
        { name: "Dal Fry", price: 200 },
        { name: "Dal Tadka", price: 220, isSpecialty: true },
        { name: "Aloo Jeera", price: 180 },
        { name: "Aloo Pyaza", price: 150 },
        { name: "Aloo Matar", price: 200 },
        { name: "Kadhi Pyaz", price: 150 },
        { name: "Kadhi Pakoda", price: 200, isSpecialty: true },
        { name: "Bhindi Masala", price: 210 },
        { name: "Boondi Raita", price: 100 },
        { name: "Veg Raita", price: 110 },
      ],
    },
    {
      id: "paneer",
      title: "Paneer Delicacies",
      badge: "Chef's Specials",
      items: [
        { name: "Matar Paneer", price: 150 },
        { name: "Kadai Paneer", price: 150 },
        { name: "Paneer Butter Masala", price: 250, isSpecialty: true },
        { name: "Paneer Tikka Masala", price: 250, isSpecialty: true },
        { name: "Paneer Patiala", price: 300, isSpecialty: true },
        { name: "Paneer Bhurji", price: 300 },
        { name: "Lababdar Paneer", price: 350, isSpecialty: true },
      ],
    },
    {
      id: "breads",
      title: "Fresh Indian Breads",
      badge: "Clay & Tawa Bakes",
      items: [
        { name: "Tawa Roti", price: 20 },
        { name: "Butter Roti", price: 25 },
        { name: "Butter Paratha", price: 30 },
        { name: "Makki ki Roti", price: 25, description: "Authentic winter cornmeal flatbread", isSpecialty: true },
        { name: "Lachha Paratha", price: 50 },
        { name: "Aloo Paratha", price: 70 },
        { name: "Paneer Paratha", price: 90 },
        { name: "Onion Paratha", price: 70 },
      ],
    },
    {
      id: "rice",
      title: "Rice & Pulao",
      items: [
        { name: "Plain Rice", price: 110 },
        { name: "Jeera Rice", price: 120 },
        { name: "Fried Rice", price: 150 },
        { name: "Dal Rice", price: 100 },
        { name: "Veg Pulao", price: 160 },
      ],
    },
    {
      id: "lassi-beverages",
      title: "Chach, Lassi & Refreshers",
      badge: "Cooling Traditions",
      items: [
        { name: "Plain Chach", price: 30 },
        { name: "Masala Chach", price: 40, isSpecialty: true },
        { name: "Boondi Chach", price: 30 },
        { name: "Punjabi Sweet Lassi", price: 60, isSpecialty: true },
      ],
    },
    {
      id: "breakfast",
      title: "Breakfast & Morning Bites",
      badge: "Morning Spreads",
      items: [
        { name: "Poha", price: 50, description: "Fluffy flattened rice with mustard seeds, peanuts & fresh coriander", isSpecialty: true },
        { name: "Upma", price: 80 },
        { name: "Aloo Paratha (with curd)", price: 70 },
        { name: "Bread Butter (1 piece)", price: 30 },
        { name: "Crispy Samosa", price: 30 },
      ],
    },
    {
      id: "maggi",
      title: "Maggi & Quick Comfort",
      items: [
        { name: "Plain Maggi", price: 50 },
        { name: "Veg Masala Maggi", price: 70 },
        { name: "Paneer Maggi", price: 100, isSpecialty: true },
      ],
    },
  ] as MenuCategory[],

  // 360° All-Sides Architectural Photography Angles (Verified Luxora Villa Angles)
  angles: [
    {
      id: "angle-0",
      degrees: 0,
      label: "Villa Facade & Pool",
      cardinal: "North (0°)",
      title: "Villa Facade & Private Adult Pool",
      description: "Daylight architectural view of the 2-storey contemporary villa, crystal blue swimming pool, and checkered patio lounge.",
      features: ["Private Adult Pool", "Checkered Patio Deck", "Modern Villa Facade"],
      image: "/images/villa/hero-villa-exterior-day.webp",
    },
    {
      id: "angle-45",
      degrees: 45,
      label: "Lawn & Architecture",
      cardinal: "North-East (45°)",
      title: "Front Lawn & Dining Hall Stone Facade",
      description: "Full elevation perspective showcasing the stone-clad dining hall wing, manicured lawn garden, and upper villa terrace.",
      features: ["Spacious Dining Hall Wing", "Lush Lawn Garden", "Frangipani Trees"],
      image: "/images/villa/villa-lawn-architecture.jpg",
    },
    {
      id: "angle-90",
      degrees: 90,
      label: "Pool & Gazebo Deck",
      cardinal: "East Wing (90°)",
      title: "Adult Swimming Pool & 2-Tier Gazebo",
      description: "Crystalline turquoise pool waters accompanied by a 2-level viewing gazebo deck overlooking the surrounding mountain slopes.",
      features: ["Dedicated Adult Pool", "2-Tier Gazebo Deck", "Mountain Backdrop"],
      image: "/images/villa/pool-daylight-deck.webp",
    },
    {
      id: "angle-135",
      degrees: 135,
      label: "Terrace Mountain Dining",
      cardinal: "South-East (135°)",
      title: "Al-Fresco Terrace & Mountain Panorama",
      description: "Outdoor balcony dining table and modern armchairs overlooking the scenic Aravalli mountain ridge and open countryside.",
      features: ["Panoramic Hill Vistas", "Outdoor Coffee Seating", "Fresh Mountain Air"],
      image: "/images/villa/terrace-mountain-dining.jpeg",
    },
    {
      id: "angle-180",
      degrees: 180,
      label: "Spacious Dining Hall",
      cardinal: "South Elevation (180°)",
      title: "Spacious Dining Hall & Natural Stone Wall",
      description: "Grand indoor dining hall with an authentic natural slate stone feature wall and picture glass windows looking out to the gardens.",
      features: ["Spacious Dining Hall", "In-House Kitchen Service", "Family Long Tables"],
      image: "/images/villa/dining-hall-stone-wall.jpeg",
    },
    {
      id: "angle-225",
      degrees: 225,
      label: "Rooftop Jharokha Terrace",
      cardinal: "South-West (225°)",
      title: "Rooftop Checkered Terrace & Chhatri",
      description: "Signature rooftop terrace with checkered black-and-white flooring and a traditional yellow & white Rajasthani carved chhatri pavilion.",
      features: ["Rajasthani Jharokha Arch", "Checkered Floor Deck", "Sunset Viewing Spot"],
      image: "/images/villa/rooftop-jharokha-sunset.jpeg",
    },
    {
      id: "angle-270",
      degrees: 270,
      label: "AC Master Bedroom",
      cardinal: "West Wing (270°)",
      title: "Fully Furnished AC Bedroom with Balcony",
      description: "Air-conditioned luxury bedroom with king bed, marble flooring, and floor-to-ceiling sliding glass doors opening to mountain views.",
      features: ["Air Conditioning (AC)", "Mountain Balcony View", "Attached Modern Bathroom"],
      image: "/images/villa/room-mountain-balcony.jpeg",
    },
    {
      id: "angle-315",
      degrees: 315,
      label: "Night Illumination",
      cardinal: "Top / Night (315°)",
      title: "Architectural Night Illumination & Garden Glow",
      description: "Spectacular evening lighting illuminating the Rajasthani rooftop arches, warm garden path lamps, and night pool water.",
      features: ["Golden Arch Lighting", "Underlit Lawn Hedges", "24/7 Power Backup"],
      image: "/images/villa/villa-night-illumination.webp",
    },
  ] as VillaAngle[],

  experiences: [
    {
      id: "pool",
      number: "01",
      title: "Private Swimming Pool (Adults)",
      tagline: "Crystal Waters Framed by Mountain Horizons",
      description:
        "Take a dip and unwind in complete privacy. Our dedicated adult pool offers crystalline waters, a 2-tier gazebo viewing deck, and ambient evening lighting for refreshing twilight swims under Udaipur's starry skies.",
      highlights: [
        "Private adult swimming pool — exclusively for your group",
        "2-level poolside gazebo deck with scenic mountain views",
        "Evening illumination & underwater glow for night dips",
        "Bluetooth speaker to stream your favorite poolside tracks",
      ],
      image: "/images/villa/pool-daylight-deck.webp",
      isTemporaryImage: false,
      accent: "#76A9A0",
    },
    {
      id: "accommodation",
      number: "02",
      title: "Fully Furnished AC Bedrooms",
      tagline: "Cool Comfort & Restful Mountain Slumber",
      description:
        "Retreat into fully furnished, air-conditioned bedrooms featuring plush bedding, tasteful modern interiors, private mountain-view balconies, and uninterrupted 24/7 power backup for comfortable stays in any season.",
      highlights: [
        "Air conditioning (AC) in every bedroom",
        "Sliding glass doors with direct mountain balcony vistas",
        "24/7 electrical power backup for peace of mind",
        "Private ensuite modern bathrooms with hot water geysers",
      ],
      image: "/images/villa/room-mountain-balcony.jpeg",
      isTemporaryImage: false,
      accent: "#C5A880",
    },
    {
      id: "dining-hall",
      number: "03",
      title: "Spacious Dedicated Dining Hall",
      tagline: "Gather & Feast on Authentic Rajasthani & North Indian Flavors",
      description:
        "A grand, dedicated dining hall featuring a natural stone wall and large picture windows. Savor freshly prepared Sev Tamatar, Dal Tadka, Kadai Paneer, hot Makki ki Roti, and refreshing Masala Chach from our in-house menu.",
      highlights: [
        "Spacious indoor dining hall accommodating large groups",
        "Full in-house kitchen menu with honest ₹ INR pricing",
        "Specialties like Sev Tamatar, Kadai Paneer, and Makki ki Roti",
        "Hot breakfast served daily (Poha, Aloo Paratha, Upma)",
      ],
      image: "/images/villa/dining-hall-stone-wall.jpeg",
      isTemporaryImage: false,
      accent: "#D4BC9B",
    },
    {
      id: "garden",
      number: "04",
      title: "Beautiful Garden & Outdoor Sitting Area",
      tagline: "Lush Greenery, Crisp Air & Open Horizons",
      description:
        "Step onto manicured green lawns and breathe in fresh mountain breezes. Recline on outdoor seating with morning chai or spend relaxed afternoons chatting with friends under the trees.",
      highlights: [
        "Spacious private manicured garden lawns",
        "Comfortable outdoor sitting area for the whole group",
        "Safe, open lawn space for family gatherings and celebrations",
        "Peaceful setting away from city traffic and noise",
      ],
      image: "/images/villa/garden-lawn-sunlight.jpg",
      isTemporaryImage: false,
      accent: "#8B9D83",
    },
    {
      id: "mountain-view",
      number: "05",
      title: "Scenic Aravalli Mountain Views",
      tagline: "Panoramic Hill Vistas from Every Corner",
      description:
        "Surrounded by the ancient Aravalli ranges, Luxora Villa provides a majestic backdrop of rolling hills. Watch golden sunrises over the peaks and dramatic desert twilight colors across the sky.",
      highlights: [
        "Uninterrupted views of the Aravalli mountain ridges",
        "Scenic sunrise and sunset viewing from the rooftop jharokhas",
        "Zero high-rise obstructions — pure open horizon",
        "Ideal backdrop for photography and group memories",
      ],
      image: "/images/villa/terrace-mountain-dining.jpeg",
      isTemporaryImage: false,
      accent: "#B88E5F",
    },
    {
      id: "gatherings",
      number: "06",
      title: "Family, Friends & Private Gatherings",
      tagline: "Music, Celebrations & Togetherness",
      description:
        "Whether planning a reunion of close friends, a birthday celebration, or a multi-generation family holiday, our Bluetooth sound setup, parking for up to 5 cars, and complete privacy guarantee unforgettable memories.",
      highlights: [
        "Bluetooth party speaker provided for music and celebrations",
        "Private parking on-site for up to 5 cars",
        "24/7 power backup ensures uninterrupted celebrations",
        "Exclusive single-group booking — no outside guests",
      ],
      image: "/images/villa/amenity-bluetooth-speaker.jpg",
      isTemporaryImage: false,
      accent: "#C5A880",
    },
  ] as ExperienceItem[],

  gallery: [
    {
      id: "g1",
      url: "/images/villa/hero-villa-exterior-day.webp",
      title: "Villa Facade & Private Pool",
      category: "villa",
      caption: "Daylight view of the 2-storey contemporary villa with checkered poolside patio",
      featured: true,
    },
    {
      id: "g2",
      url: "/images/villa/pool-daylight-deck.webp",
      title: "Private Adult Swimming Pool",
      category: "pool",
      caption: "Crystal turquoise adult pool with 2-level viewing gazebo deck and lounge chairs",
      featured: true,
    },
    {
      id: "g3",
      url: "/images/villa/dining-hall-stone-wall.jpeg",
      title: "Spacious Dedicated Dining Hall",
      category: "dining",
      caption: "Grand dining hall with natural slate stone feature wall and garden windows",
      featured: true,
    },
    {
      id: "g4",
      url: "/images/villa/room-mountain-balcony.jpeg",
      title: "AC Bedroom with Mountain Balcony",
      category: "rooms",
      caption: "Air-conditioned bedroom with sliding glass door opening directly to Aravalli hills",
      featured: true,
    },
    {
      id: "g5",
      url: "/images/villa/rooftop-jharokha-sunset.jpeg",
      title: "Checkered Rooftop & Rajasthani Chhatri",
      category: "outdoor",
      caption: "Signature rooftop terrace with yellow & white carved pavilion overlooking the hills",
      featured: true,
    },
    {
      id: "g6",
      url: "/images/villa/villa-night-illumination.webp",
      title: "Architectural Night Illumination",
      category: "villa",
      caption: "Warm golden lights illuminating the Rajasthani rooftop arches and grounds",
      featured: true,
    },
    {
      id: "g7",
      url: "/images/villa/pool-night-villa.jpg",
      title: "Night Swimming Pool & Villa Glow",
      category: "pool",
      caption: "Illuminated underwater pool lights with floating rings and lantern-lit villa",
    },
    {
      id: "g8",
      url: "/images/villa/room-master-bedroom.jpeg",
      title: "Master Suite with Marble Floor",
      category: "rooms",
      caption: "Spacious king bedroom with marble flooring, custom wardrobe, TV, and party speaker",
    },
    {
      id: "g9",
      url: "/images/villa/terrace-mountain-dining.jpeg",
      title: "Terrace Dining with Mountain View",
      category: "outdoor",
      caption: "Al-fresco dining table on the terrace overlooking the scenic Aravalli hills",
    },
    {
      id: "g10",
      url: "/images/villa/dining-hall-daylight.jpg",
      title: "Dining Hall in Daylight",
      category: "dining",
      caption: "Sunlit dining hall with wooden dining sets for homestyle group feasts",
    },
    {
      id: "g11",
      url: "/images/villa/amenity-bluetooth-speaker.jpg",
      title: "Bluetooth Party Speaker & Wi-Fi",
      category: "outdoor",
      caption: "High-power vertical Bluetooth speaker for music, parties, and celebrations",
    },
    {
      id: "g12",
      url: "/images/villa/villa-parking-night.jpg",
      title: "Secure On-Site 5-Car Parking",
      category: "villa",
      caption: "Private on-site parking for up to 5 vehicles with 24/7 power backup",
    },
    {
      id: "g13",
      url: "/images/villa/garden-lawn-sunlight.jpg",
      title: "Manicured Garden Lawn",
      category: "outdoor",
      caption: "Lush green lawn with flowering hedges and crisp morning mountain air",
    },
    {
      id: "g14",
      url: "/images/villa/room-smart-tv-netflix.jpg",
      title: "Smart TV with Netflix & Balcony",
      category: "rooms",
      caption: "Bedroom entertainment with Smart TV, Netflix, in-room tea, and balcony",
    },
    {
      id: "g15",
      url: "/images/villa/rooftop-sunset-frame.jpeg",
      title: "Aravalli Sunset Framed in Jharokha",
      category: "outdoor",
      caption: "Golden Udaipur sunset framed through the traditional rooftop jharokha arch",
      featured: true,
    },
    {
      id: "g16",
      url: "/images/villa/pool-chai-evening.jpg",
      title: "Evening Chai by the Pool",
      category: "food",
      caption: "Hot tea by the illuminated pool waters after a day in Udaipur",
    },
    {
      id: "g17",
      url: "/images/villa/dining-outdoor-lawn.jpg",
      title: "Candlelit Garden Lawn Dinner",
      category: "dining",
      caption: "Open-air dining table setup on the grass under starry night skies",
    },
    {
      id: "g18",
      url: "/images/villa/dining-lawn-bonfire.jpg",
      title: "Lawn Bonfire & Barbecue Evening",
      category: "dining",
      caption: "Cozy bonfire setup on the lawn for memorable family gatherings",
    },
    {
      id: "g19",
      url: "/images/villa/bathroom-modern-vanity.jpeg",
      title: "Modern Attached Bathroom",
      category: "rooms",
      caption: "Clean contemporary bathroom with vanity counter, wall-hung WC, and geyser",
    },
    {
      id: "g20",
      url: "/images/villa/bathroom-rain-shower.jpeg",
      title: "Rain Shower & Ensuite Bath",
      category: "rooms",
      caption: "Spacious attached bathroom with overhead rain shower and hot water supply",
    },
    {
      id: "g21",
      url: "/images/villa/lifestyle-balcony-sunset.jpg",
      title: "Balcony Terrace at Sunset",
      category: "experiences",
      caption: "Mountain ridge view from the upper balcony with traditional stone accents",
    },
    {
      id: "g22",
      url: "/images/villa/villa-facade-patio.jpeg",
      title: "Courtyard Patio & Outdoor Table",
      category: "villa",
      caption: "Checkered patio with outdoor coffee seating and neem tree canopy",
    },
    {
      id: "g23",
      url: "/images/villa/villa-entrance-stairs.webp",
      title: "Grand Entrance Steps",
      category: "villa",
      caption: "Granite entrance steps with blooming jasmine climbers and private party setup",
    },
    {
      id: "g24",
      url: "/images/villa/pool-loungers-night.jpg",
      title: "Poolside Loungers & Water Feature",
      category: "pool",
      caption: "Evening pool relaxation with lounge recliners and illuminated water cascade",
    },
  ] as VillaImage[],

  guestImpressions: [
    {
      id: "t1",
      guestName: "Sharma Family Gathering",
      stayType: "Family Vacation in Udaipur",
      dates: "Recent Stay",
      quote:
        "Luxora Villa was the perfect choice for our family trip to Udaipur. The kids loved the private pool, having AC in all bedrooms made our stay very comfortable, and the home-style food (especially the Dal Tadka and Sev Tamatar) was delicious!",
      rating: 5,
      isDemoReview: true,
    },
    {
      id: "t2",
      guestName: "Aman & Friends Group",
      stayType: "Weekend Getaway (10 Guests)",
      dates: "Recent Stay",
      quote:
        "The mountain view from the garden is stunning. We had our own private space, played our music on the Bluetooth speaker, parked all 3 of our SUVs comfortably, and enjoyed evening snacks by the pool.",
      rating: 5,
      isDemoReview: true,
    },
    {
      id: "t3",
      guestName: "Rohit & Priyanka",
      stayType: "Private Celebration Retreat",
      dates: "Recent Stay",
      quote:
        "Peaceful, private, and beautifully maintained. The power backup was seamless, the dining hall was huge, and waking up to the Aravalli hills with hot Poha and tea made it unforgettable.",
      rating: 5,
      isDemoReview: true,
    },
  ] as GuestImpression[],

  location: {
    addressLine1: "Luxora Villa, Scenic Mountain Foothills",
    addressLine2: "Udaipur, Rajasthan, India",
    region: "Udaipur, Rajasthan (City of Lakes)",
    coordinates: "24°48'20.3\"N 73°40'44.2\"E",
    googleMapsUrl: "https://maps.app.goo.gl/QUUzn5KWQkLSnLTc6",
    embedMapUrl: "https://maps.google.com/maps?q=24.805634,73.678947&z=14&output=embed",
    directionsNote:
      "Tucked away in the scenic Aravalli foothills of Udaipur. Tap 'Open in Google Maps' for instant live GPS navigation straight to our gates.",
    attractions: [
      {
        name: "Fateh Sagar Lake",
        distance: "18 mins drive",
        category: "Lake & Promenades",
        description: "Iconic Udaipur lake famous for scenic sunsets, boating, and Nehru Park.",
      },
      {
        name: "City Palace & Lake Pichola",
        distance: "25 mins drive",
        category: "Heritage & Royalty",
        description: "Historic 400-year-old royal palace complex overlooking Lake Pichola.",
      },
      {
        name: "Sajjangarh Monsoon Palace",
        distance: "22 mins drive",
        category: "Panoramic Viewpoint",
        description: "Hilltop hilltop palace offering dramatic 360° views of Udaipur and sunset hills.",
      },
      {
        name: "Maharana Pratap Airport (UDR)",
        distance: "45 mins drive",
        category: "Airport Transit",
        description: "Smooth highway drive with direct private cab coordination available.",
      },
    ] as NearbyAttraction[],
  },
};
