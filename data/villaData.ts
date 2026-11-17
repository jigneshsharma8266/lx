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
  image?: string;
}

export interface MenuCategory {
  id: string;
  title: string;
  badge?: string;
  image?: string;
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
  category: "villa" | "rooms" | "pool" | "dining" | "food" | "outdoor" | "experiences" | "heritage";
  caption: string;
  isTemporary?: boolean;
  featured?: boolean;
}

export interface RoomDetail {
  id: string;
  name: string;
  tagline: string;
  type: string;
  occupancy: string;
  bed: string;
  view: string;
  description: string;
  features: string[];
  amenities: string[];
  images: { url: string; caption: string }[];
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
    tagline: "Your Private Luxury Villa in Udaipur.",
    heroSubtitle:
      "A private villa in Udaipur for families and groups of friends. Enjoy an adult swimming pool, air-conditioned bedrooms with mountain views, spacious dining hall, and quiet garden living.",
    introHeading: "Your Private Getaway in Udaipur.",
    introBody1:
      "Welcome to Luxora Villa, Udaipur! Located in the scenic mountain foothills, our private villa is made for families and friends who want a peaceful, private stay with hotel-like comfort.",
    introBody2:
      "When you book Luxora Villa, the entire space is yours. Enjoy a private adult swimming pool, clean air-conditioned bedrooms with mountain balconies, an in-house kitchen serving fresh homestyle meals, a large dining hall, green lawns, 24/7 power backup, and parking for up to 5 cars.",
  },

  contact: {
    phone: "+91 8690955700",
    phoneDisplay: "+91 86909 55700",
    whatsappNumber: "918690955700", // E.164 formatted number for wa.me URL
    email: "reservations@luxoravilla.com",
    addressLine1: "Luxora Villa, Mountain Foothills",
    addressLine2: "Udaipur, Rajasthan 313001, India",
    cityState: "Udaipur, Rajasthan",
    googleMapsUrl: "https://maps.app.goo.gl/QUUzn5KWQkLSnLTc6",
    instagramUrl: "https://www.instagram.com/_luxora_villa/",
    instagramHandle: "_luxora_villa",
  },

  // Confirmed Property Key Highlights in Simple, Real Words
  verifiedFeatures: [
    { title: "Private Adult Pool", desc: "Clean private swimming pool for adults with sun loungers" },
    { title: "Mountain Views", desc: "Clear, open views of the surrounding Aravalli hills" },
    { title: "Furnished AC Rooms", desc: "Air-conditioned bedrooms with attached bathrooms & hot water" },
    { title: "Big Dining Hall", desc: "Large indoor dining hall with in-house kitchen meals" },
    { title: "Garden & Lawn", desc: "Green grass lawn with open sitting area and evening bonfire" },
    { title: "Bluetooth Speaker", desc: "Party speaker ready to connect to your phone for music" },
    { title: "5-Car Parking", desc: "Safe, gated private parking inside the villa premises" },
    { title: "24/7 Power Backup", desc: "Full power backup for continuous lights, fans, and ACs" },
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
      image: "/images/menu/pakoda.webp",
      items: [
        { name: "Roasted Papad", price: 30, image: "/images/menu/pakoda.webp" },
        { name: "Fry Papad", price: 40, image: "/images/menu/pakoda.webp" },
        { name: "Roasted Masala Papad", price: 50, isSpecialty: true, description: "Crisp roasted papad topped with diced onions, tomatoes, and spices", image: "/images/menu/pakoda.webp" },
        { name: "Fry Masala Papad", price: 60, image: "/images/menu/pakoda.webp" },
        { name: "Green Salad", price: 100, description: "Fresh seasonal greens with lemon and chaat masala", image: "/images/menu/green-salad.webp" },
        { name: "Peanut Masala", price: 150, image: "/images/menu/poha.webp" },
        { name: "Channa Chaat", price: 150, image: "/images/menu/poha.webp" },
        { name: "French Fries", price: 150, description: "Crispy golden salted potato fries", image: "/images/menu/french-fries.webp" },
        { name: "Hara Bhara Kabab", price: 150, isSpecialty: true, description: "Crispy pan-fried spinach and green pea patties", image: "/images/menu/pakoda.webp" },
        { name: "Dahi Kabab", price: 150, isSpecialty: true, description: "Crispy outer crust with spiced hung-curd filling", image: "/images/menu/pakoda.webp" },
        { name: "Veg Crispy Corn", price: 180, image: "/images/menu/french-fries.webp" },
        { name: "Paneer Chilli", price: 250, isSpecialty: true, description: "Golden crispy cottage cheese tossed with bell peppers and chilli sauce", image: "/images/menu/kadai-paneer.webp" },
        { name: "Paneer Pakoda", price: 220, description: "Gram flour battered soft paneer fritters with mint chutney", image: "/images/menu/pakoda.webp" },
        { name: "Veg Chowmein", price: 230, description: "Stir-fried Hakka-style noodles loaded with shredded vegetables", image: "/images/menu/noodles.webp" },
        { name: "Aloo Sandwich", price: 230, description: "Grilled spiced potato sandwich with butter", image: "/images/menu/sandwich.webp" },
      ],
    },
    {
      id: "main-course",
      title: "Main Course & Curries",
      badge: "Homestyle Delights",
      image: "/images/menu/sev-tamatar.webp",
      items: [
        { name: "Sev Tamatar", price: 180, description: "Classic Mewari comfort specialty with savory sev in spiced tomato gravy", isSpecialty: true, image: "/images/menu/sev-tamatar.webp" },
        { name: "Dahi Fry", price: 180, description: "Tempered spiced yogurt delicacy", image: "/images/menu/dal-tadka.webp" },
        { name: "Dal Fry", price: 200, description: "Yellow lentils cooked with aromatic Indian spices", image: "/images/menu/dal-tadka.webp" },
        { name: "Dal Tadka", price: 220, isSpecialty: true, description: "Velvety yellow dal tempered with sizzled ghee, cumin, garlic & red chillies", image: "/images/menu/dal-tadka.webp" },
        { name: "Aloo Jeera", price: 180, description: "Pan-roasted potatoes with crackling cumin seeds", image: "/images/menu/sev-tamatar.webp" },
        { name: "Aloo Pyaza", price: 150, image: "/images/menu/sev-tamatar.webp" },
        { name: "Aloo Matar", price: 200, description: "Potatoes and tender green peas in homestyle gravy", image: "/images/menu/sev-tamatar.webp" },
        { name: "Kadhi Pyaz", price: 150, image: "/images/menu/dal-tadka.webp" },
        { name: "Kadhi Pakoda", price: 200, isSpecialty: true, description: "Crisp onion-besan fritters in spiced turmeric yogurt gravy", image: "/images/menu/dal-tadka.webp" },
        { name: "Bhindi Masala", price: 210, description: "Fresh okra sautéed with onions and dry mango spice", image: "/images/menu/sev-tamatar.webp" },
        { name: "Boondi Raita", price: 100, description: "Crisp gram-flour pearls in seasoned whipped curd", image: "/images/menu/punjabi-lassi.webp" },
        { name: "Veg Raita", price: 110, description: "Cool yogurt with diced cucumber, onions and mint", image: "/images/menu/punjabi-lassi.webp" },
      ],
    },
    {
      id: "paneer",
      title: "Paneer Delicacies",
      badge: "Chef's Specials",
      image: "/images/menu/paneer-butter-masala.webp",
      items: [
        { name: "Matar Paneer", price: 150, description: "Cottage cheese and sweet peas in spiced onion-tomato curry", image: "/images/menu/kadai-paneer.webp" },
        { name: "Kadai Paneer", price: 150, isSpecialty: true, description: "Paneer cubes tossed with crisp bell peppers, onions and crushed whole spices", image: "/images/menu/kadai-paneer.webp" },
        { name: "Paneer Butter Masala", price: 250, isSpecialty: true, description: "Silky soft paneer cubes in a rich, buttery tomato-cashew makhani gravy", image: "/images/menu/paneer-butter-masala.webp" },
        { name: "Paneer Tikka Masala", price: 250, isSpecialty: true, description: "Char-grilled smoky paneer in rich spiced gravy", image: "/images/menu/paneer-butter-masala.webp" },
        { name: "Paneer Patiala", price: 300, isSpecialty: true, image: "/images/menu/kadai-paneer.webp" },
        { name: "Paneer Bhurji", price: 300, description: "Scrambled fresh paneer tossed with onions, tomatoes & coriander", image: "/images/menu/kadai-paneer.webp" },
        { name: "Lababdar Paneer", price: 350, isSpecialty: true, description: "Royal rich gravy with grated and cubed paneer", image: "/images/menu/paneer-butter-masala.webp" },
      ],
    },
    {
      id: "breads",
      title: "Fresh Indian Breads",
      badge: "Clay & Tawa Bakes",
      image: "/images/menu/makki-ki-roti.webp",
      items: [
        { name: "Tawa Roti", price: 20, description: "Hot puffed whole wheat flatbread", image: "/images/menu/paratha.webp" },
        { name: "Butter Roti", price: 25, description: "Freshly made tawa roti brushed with pure desi ghee", image: "/images/menu/paratha.webp" },
        { name: "Butter Paratha", price: 30, description: "Layered crispy tawa paratha with butter", image: "/images/menu/paratha.webp" },
        { name: "Makki ki Roti", price: 25, description: "Authentic winter cornmeal flatbread topped with melting butter", isSpecialty: true, image: "/images/menu/makki-ki-roti.webp" },
        { name: "Lachha Paratha", price: 50, description: "Flaky, multi-layered spiral whole wheat flatbread", image: "/images/menu/paratha.webp" },
        { name: "Aloo Paratha", price: 70, description: "Stuffed spiced potato paratha served hot with butter", image: "/images/menu/paratha.webp" },
        { name: "Paneer Paratha", price: 90, description: "Rich stuffed cottage cheese flatbread", image: "/images/menu/paratha.webp" },
        { name: "Onion Paratha", price: 70, description: "Spiced onion stuffed tawa paratha", image: "/images/menu/paratha.webp" },
      ],
    },
    {
      id: "rice",
      title: "Rice & Pulao",
      image: "/images/menu/fried-rice.webp",
      items: [
        { name: "Plain Rice", price: 110, description: "Steamed long-grain aromatic basmati rice", image: "/images/menu/fried-rice.webp" },
        { name: "Jeera Rice", price: 120, description: "Basmati rice tempered with golden cumin and desi ghee", image: "/images/menu/fried-rice.webp" },
        { name: "Fried Rice", price: 150, description: "Wok-tossed rice with crunchy vegetables and soy", image: "/images/menu/fried-rice.webp" },
        { name: "Dal Rice", price: 100, description: "Comforting homestyle dal and rice bowl", image: "/images/menu/fried-rice.webp" },
        { name: "Veg Pulao", price: 160, isSpecialty: true, description: "Fragrant saffron basmati rice with vegetables and whole spices", image: "/images/menu/fried-rice.webp" },
      ],
    },
    {
      id: "lassi-beverages",
      title: "Chach, Lassi & Refreshers",
      badge: "Cooling Traditions",
      image: "/images/menu/punjabi-lassi.webp",
      items: [
        { name: "Plain Chach", price: 30, description: "Traditional cooling churned buttermilk", image: "/images/menu/punjabi-lassi.webp" },
        { name: "Masala Chach", price: 40, isSpecialty: true, description: "Chilled buttermilk spiced with roasted cumin, black salt and mint", image: "/images/menu/punjabi-lassi.webp" },
        { name: "Boondi Chach", price: 30, description: "Buttermilk infused with crunchy boondi pearls", image: "/images/menu/punjabi-lassi.webp" },
        { name: "Punjabi Sweet Lassi", price: 60, isSpecialty: true, description: "Thick creamy chilled yogurt lassi in clay kulhad with malai & saffron", image: "/images/menu/punjabi-lassi.webp" },
      ],
    },
    {
      id: "breakfast",
      title: "Breakfast & Morning Bites",
      badge: "Morning Spreads",
      image: "/images/menu/poha.webp",
      items: [
        { name: "Poha", price: 50, description: "Fluffy flattened rice with mustard seeds, peanuts, sev & fresh coriander", isSpecialty: true, image: "/images/menu/poha.webp" },
        { name: "Upma", price: 80, description: "Traditional roasted semolina breakfast with curry leaves and cashews", image: "/images/menu/poha.webp" },
        { name: "Aloo Paratha (with curd)", price: 70, description: "Stuffed potato flatbread served with fresh curd and pickle", image: "/images/menu/paratha.webp" },
        { name: "Bread Butter (1 piece)", price: 30, image: "/images/menu/sandwich.webp" },
        { name: "Crispy Samosa", price: 30, isSpecialty: true, description: "Flaky golden triangular pastry filled with spiced potatoes and peas", image: "/images/menu/samosa.webp" },
      ],
    },
    {
      id: "maggi",
      title: "Maggi & Quick Comfort",
      image: "/images/menu/noodles.webp",
      items: [
        { name: "Plain Maggi", price: 50, description: "Classic hot Masala Maggi noodles", image: "/images/menu/noodles.webp" },
        { name: "Veg Masala Maggi", price: 70, isSpecialty: true, description: "Spiced street-style Maggi loaded with fresh veggies and herbs", image: "/images/menu/noodles.webp" },
        { name: "Paneer Maggi", price: 100, isSpecialty: true, description: "Steaming hot Maggi noodles topped with soft paneer cubes", image: "/images/menu/noodles.webp" },
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
      url: "/images/villa/dining-lawn-bonfire.jpg",
      title: "Lawn Bonfire & Barbecue Evening",
      category: "outdoor",
      caption: "Cozy bonfire setup on the lawn for memorable family gatherings",
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
    {
      id: "g25",
      url: "/images/villa/pool-night-gazebo.jpeg",
      title: "Night Gazebo by Pool Deck",
      category: "pool",
      caption: "Elevated pool gazebo illuminated with warm ambient lanterns overlooking the pool",
    },
    {
      id: "g26",
      url: "/images/villa/pool-night-lights.jpeg",
      title: "Underwater Pool Glow & Deck",
      category: "pool",
      caption: "Night swimming under star-filled Udaipur skies with clear illuminated water",
    },
    {
      id: "g27",
      url: "/images/villa/pool-view-balcony.jpg",
      title: "Balcony Overlooking Pool & Hills",
      category: "outdoor",
      caption: "First-floor balcony vantage point showing the turquoise pool and green lawn below",
    },
    {
      id: "g28",
      url: "/images/villa/rooftop-rajasthani-chhatri.webp",
      title: "Rajasthani Chhatri Pavilion",
      category: "heritage",
      caption: "Traditional carved Indian stone pavilion framing the sunset and mountain horizon",
      featured: true,
    },
    {
      id: "g29",
      url: "/images/villa/room-deluxe-suite.jpeg",
      title: "Deluxe Bedroom Suite",
      category: "rooms",
      caption: "Spacious air-conditioned deluxe suite with wardrobe, vanity area, and plush double bed",
      featured: true,
    },
    {
      id: "g30",
      url: "/images/villa/room-deluxe-interior.jpg",
      title: "Deluxe Interior & Seating",
      category: "rooms",
      caption: "Elegantly finished bedroom interior with ample natural lighting and air conditioning",
    },
    {
      id: "g31",
      url: "/images/villa/room-sofa-balcony.jpeg",
      title: "Room Lounge & Private Balcony Access",
      category: "rooms",
      caption: "Cozy in-room sofa sitting area adjacent to sliding glass doors opening to mountain air",
    },
    {
      id: "g32",
      url: "/images/villa/lifestyle-bedroom-mirror.jpg",
      title: "Bedroom Vanity & Dressing Area",
      category: "rooms",
      caption: "Full-height dressing mirror, warm room lighting, and wardrobe storage",
    },
    {
      id: "g33",
      url: "/images/villa/lifestyle-bedroom-mountain.jpg",
      title: "Bedroom Window with Mountain Backdrop",
      category: "rooms",
      caption: "Wake up directly to unhindered views of the ancient Aravalli mountain ranges",
    },
    {
      id: "g34",
      url: "/images/villa/villa-lawn-architecture.jpg",
      title: "Lawn & Modern Villa Elevation",
      category: "villa",
      caption: "Wide architectural view of Luxora Villa framed by landscaped greens and mountains",
    },
    {
      id: "g35",
      url: "/images/villa/lifestyle-resort-night.jpg",
      title: "Nocturnal Villa Ambience",
      category: "villa",
      caption: "Serene night atmosphere with ambient perimeter lighting and cool hill breezes",
    },
    {
      id: "g36",
      url: "/images/villa/lifestyle-granite-stairs.jpg",
      title: "Granite Staircase & Terrace Walkway",
      category: "villa",
      caption: "Polished granite staircase connecting the ground pool deck to upper viewing terraces",
    },
    {
      id: "g37",
      url: "/images/villa/villa-signature-collage.jpg",
      title: "The Luxora Experience Collage",
      category: "experiences",
      caption: "A curated visual summary of pool, heritage arches, bedrooms, and dining",
    },
  ] as VillaImage[],

  // Dedicated Luxury Accommodations Data
  rooms: [
    {
      id: "royal-master-suite",
      name: "Royal Master Suite with Mountain Balcony",
      tagline: "Panoramic Aravalli Vistas & Grand Space",
      type: "Master Suite",
      occupancy: "2-4 Adults",
      bed: "King Size Bed + Extra Bed Available",
      view: "Panoramic Aravalli Mountain & Pool View",
      description:
        "The premier suite at Luxora Villa. Features floor-to-ceiling glass doors opening onto a private balcony overlooking the mountain ridge. Elegantly furnished with polished marble flooring, whisper-quiet split air-conditioning, custom wardrobe, 55-inch Smart TV with Netflix/Prime, and a large ensuite bathroom with hot rain shower.",
      features: [
        "Private Balcony with Mountain Panorama",
        "Air-Conditioning (Split AC with Remote)",
        "55\" Smart LED TV with Netflix & Streaming",
        "Marble Flooring & Custom Wardrobe Storage",
        "Ensuite Bathroom with Overhead Rain Shower",
        "24/7 Hot Water Geyser & Fresh Linens",
      ],
      amenities: ["AC", "Ensuite Bath", "Balcony", "Smart TV", "Mountain View", "Geyser 24/7", "Wi-Fi"],
      images: [
        { url: "/images/villa/room-master-bedroom.jpeg", caption: "Master King Bed with Marble Flooring" },
        { url: "/images/villa/room-mountain-balcony.jpeg", caption: "Direct Sliding Glass Doors to Balcony" },
        { url: "/images/villa/room-smart-tv-netflix.jpg", caption: "Smart TV with Netflix & Balcony Seating" },
        { url: "/images/villa/bathroom-rain-shower.jpeg", caption: "Ensuite Bathroom with Rain Shower" },
      ],
      featured: true,
    },
    {
      id: "deluxe-mountain-suite",
      name: "Deluxe Mountain View Suite",
      tagline: "Serene Comfort with Dedicated Sitting Lounge",
      type: "Deluxe Suite",
      occupancy: "2-3 Adults",
      bed: "King Size Bed",
      view: "Aravalli Hills & Garden View",
      description:
        "A spacious, light-filled suite featuring a comfortable sofa sitting lounge right by large picture windows. Ideal for relaxing with a cup of evening tea while watching the sun dip behind the hills. Fully air-conditioned with modern stone-counter ensuite bathroom.",
      features: [
        "In-Room Sofa Sitting Lounge",
        "High-Power Split Air Conditioning",
        "Scenic Window Framing Mountain Ridge",
        "Modern Stone Vanity Attached Bathroom",
        "Luggage Rack & Full-Length Mirror",
        "High-Speed Wi-Fi & 24/7 Power Backup",
      ],
      amenities: ["AC", "Ensuite Bath", "Sofa Lounge", "Hill View", "Hot Water", "Wi-Fi"],
      images: [
        { url: "/images/villa/room-deluxe-suite.jpeg", caption: "Spacious Deluxe Suite with Sitting Area" },
        { url: "/images/villa/room-deluxe-interior.jpg", caption: "Naturally Sunlit Bedroom Interior" },
        { url: "/images/villa/room-sofa-balcony.jpeg", caption: "Relaxing Sofa Seating Area by Window" },
        { url: "/images/villa/bathroom-modern-vanity.jpeg", caption: "Clean Modern Vanity Attached Bathroom" },
      ],
      featured: true,
    },
    {
      id: "heritage-terrace-room",
      name: "Heritage Balcony & Terrace Suite",
      tagline: "Steps from the Rajasthani Sunset Rooftop",
      type: "Heritage Suite",
      occupancy: "2-3 Adults",
      bed: "King Size Bed",
      view: "Sunset Hills & Rooftop Chhatri",
      description:
        "Located on the upper level with instant access to the signature checkered rooftop terrace and carved Rajasthani chhatri. Boasts wide granite terrace walkways, dressing vanity, air conditioning, and unobstructed golden hour sunset views.",
      features: [
        "Instant Access to Heritage Rooftop Chhatri",
        "Dressing Vanity & Full-Height Mirror",
        "Upper Balcony Walkway with Hill Views",
        "Air Conditioned Comfort with Soundproofing",
        "Ensuite Bathroom with Fresh Towels & Geyser",
        "Crisp Mountain Breeze in Morning & Evenings",
      ],
      amenities: ["AC", "Rooftop Access", "Ensuite Bath", "Sunset View", "Geyser 24/7", "Wi-Fi"],
      images: [
        { url: "/images/villa/lifestyle-bedroom-mirror.jpg", caption: "Dressing Vanity & Bedroom Mirror" },
        { url: "/images/villa/lifestyle-bedroom-mountain.jpg", caption: "Window Framing Ancient Aravalli Hills" },
        { url: "/images/villa/lifestyle-balcony-sunset.jpg", caption: "Terrace Walkway at Golden Sunset" },
        { url: "/images/villa/rooftop-jharokha-sunset.jpeg", caption: "Steps to the Sunset Jharokha" },
      ],
      featured: false,
    },
    {
      id: "garden-poolside-room",
      name: "Garden & Pool View Executive Bedroom",
      tagline: "Direct Step-Out Access to Pool Deck & Lawn",
      type: "Garden Room",
      occupancy: "2-3 Adults",
      bed: "King Size Bed",
      view: "Poolside Deck & Green Lawn",
      description:
        "Situated on the ground floor with direct patio access to the adult swimming pool deck and green garden sitting area. Perfect for morning swimmers and families desiring zero stairs and effortless movement between bedrooms and the pool.",
      features: [
        "Ground Floor Easy Access (No Stairs Required)",
        "Direct Walk-Out to Swimming Pool & Garden",
        "Split Air Conditioning & Quiet Ambience",
        "Ensuite Attached Bathroom",
        "Convenient for Elders & Young Children",
        "Immediate Access to the Dining Hall",
      ],
      amenities: ["Ground Floor", "Pool Deck Step-Out", "AC", "Ensuite Bath", "Garden View", "Wi-Fi"],
      images: [
        { url: "/images/villa/villa-facade-patio.jpeg", caption: "Patio Step-Out to Pool Deck" },
        { url: "/images/villa/pool-daylight-deck.webp", caption: "Adult Swimming Pool Just Steps Away" },
        { url: "/images/villa/garden-lawn-sunlight.jpg", caption: "Manicured Green Lawn Outside" },
        { url: "/images/villa/room-deluxe-interior.jpg", caption: "Comfortable Air Conditioned Bedroom" },
      ],
      featured: false,
    },
  ] as RoomDetail[],

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
