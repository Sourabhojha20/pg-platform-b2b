export const dummyProperties = [
  {
    _id: "p1",
    pgName: "Sunrise PG for Boys",
    propertyType: "PG",
    genderPreference: "male",
    minPrice: 8500,
    maxPrice: 12000,
    coverImage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80" },
      { url: "https://images.unsplash.com/photo-1502672260266-1c1ea5250839?w=800&q=80" },
      { url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80" }
    ],
    location: {
      area: "MP Nagar Zone 1",
      address: "Plot 12, Near Chetak Bridge",
      city: "Bhopal",
      lat: 23.2325,
      lng: 77.4328
    },
    totalRooms: 20,
    amenities: ["WiFi", "AC", "Laundry", "Meals", "Security"],
    customAmenities: ["Gym", "Gaming Room"],
    rating: "4.8",
    status: "approved",
    description: "Premium boys PG in the heart of Bhopal's commercial hub. Located close to coaching institutes and DB Mall.",
    goodToKnow: ["No late night entry after 11 PM", "1 month notice period", "Guests allowed in common areas"],
    houseRules: [
      "No visitors allowed after 8 PM",
      "Strictly no smoking or alcohol",
      "Electricity charges extra as per sub-meter",
      "Maintenance fee payable every quarter"
    ],
    nearbyPlaces: [
      { name: "DB Mall", distance: "0.5" },
      { name: "MP Nagar Metro Station", distance: "1.2" },
      { name: "Habibganj Railway Station", distance: "2.0" }
    ],
    views: 1500,
    createdAt: "2023-01-01T00:00:00.000Z",
    ownerId: {
      name: "Rahul Sharma",
      phone: "+91 9876543210",
      email: "rahul@example.com"
    },
    agentName: "Arjun Rao",
    managerPhone: "+91 9999900001",
    b2bActivePlan: true,
    visitTimings: "10:00 AM - 07:00 PM (Mon-Sat)",
    furnishingStatus: "Furnished",
    acStatus: "AC"
  },
  {
    _id: "p2",
    pgName: "Blossom Girls PG",
    propertyType: "PG",
    genderPreference: "female",
    minPrice: 7000,
    maxPrice: 15000,
    coverImage: "https://images.unsplash.com/photo-1499955085172-a104c9463ece?w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1499955085172-a104c9463ece?w=800&q=80" },
      { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" }
    ],
    location: {
      area: "Arera Colony",
      address: "E-7, Near Bittan Market",
      city: "Bhopal",
      lat: 23.2125,
      lng: 77.4215
    },
    totalRooms: 15,
    amenities: ["WiFi", "Geyser", "Laundry", "Meals", "Security Camera"],
    customAmenities: ["Rooftop Garden", "Library"],
    rating: "4.9",
    status: "approved",
    description: "A safe and peaceful residence for girls in Bhopal's most elite neighborhood. Home-cooked meals and top-tier security.",
    goodToKnow: ["Female visitors allowed", "2 months deposit"],
    houseRules: [
      "No male visitors inside rooms",
      "Entry before 9:30 PM mandatory",
      "Self-laundry facilities available",
      "Weekly room inspection"
    ],
    nearbyPlaces: [
      { name: "Bittan Market", distance: "0.3" },
      { name: "National Hospital", distance: "0.8" },
      { name: "Aura Mall", distance: "2.5" }
    ],
    views: 2100,
    createdAt: "2023-02-15T00:00:00.000Z",
    ownerId: {
      name: "Anita Desai",
      phone: "+91 9123456780",
      email: "anita@example.com"
    },
    agentName: "Priya Sharma",
    managerPhone: "+91 9999900002",
    b2bActivePlan: false,
    visitTimings: "09:00 AM - 06:00 PM (All Days)",
    furnishingStatus: "Semi Finished",
    acStatus: "Non AC"
  },
  {
    _id: "p3",
    pgName: "Urban Nest Service Apartment",
    propertyType: "Service Apartment",
    genderPreference: "any",
    minPrice: 12000,
    maxPrice: 25000,
    coverImage: "https://images.unsplash.com/photo-1598928506311-c55dd1b31bb1?w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1598928506311-c55dd1b31bb1?w=800&q=80" },
      { url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80" }
    ],
    location: {
      area: "Gulmohar Colony",
      address: "Near Trilanga",
      city: "Bhopal",
      lat: 23.1945,
      lng: 77.4398
    },
    totalRooms: 30,
    amenities: ["WiFi", "AC", "Housekeeping", "Common Kitchen", "Parking"],
    customAmenities: ["Pool Table", "Mini Theater"],
    rating: "4.7",
    status: "approved",
    description: "Modern service apartment in Gulmohar. Perfect for working professionals in Bhopal looking for a premium lifestyle.",
    goodToKnow: ["Pet friendly", "Zero brokerage", "Flexible lock-in"],
    houseRules: ["No loud parties", "Shared kitchen etiquette must be followed", "Monthly community meeting attendance requested"],
    nearbyPlaces: [{ name: "Aura Mall", distance: "1.0" }, { name: "Shahpura Lake", distance: "2.0" }],
    views: 3200,
    createdAt: "2023-03-10T00:00:00.000Z",
    ownerId: {
      name: "Vikram Malhotra",
      phone: "+91 9988776655",
      email: "vikram@urbannest.com"
    },
    agentName: "Arjun Rao",
    managerPhone: "+91 9999900003",
    b2bActivePlan: true,
    visitTimings: "11:00 AM - 08:00 PM (Mon-Fri)",
    furnishingStatus: "Furnished",
    acStatus: "AC"
  },
  {
    _id: "p4",
    pgName: "Student Square Hostel",
    propertyType: "Hostel",
    genderPreference: "male",
    minPrice: 5000,
    maxPrice: 8000,
    coverImage: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80" },
      { url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80" }
    ],
    location: {
      area: "Indrapuri",
      address: "Sector C, Near MANIT",
      city: "Bhopal",
      lat: 23.2485,
      lng: 77.4612
    },
    totalRooms: 50,
    amenities: ["WiFi", "Meals", "Library", "Laundry", "Security"],
    customAmenities: ["Badminton Court", "Study Rooms"],
    rating: "4.5",
    status: "approved",
    description: "Affordable accommodation for students near MANIT and BHEL. Focused on a productive study environment.",
    goodToKnow: ["Strict entry timings", "Only for students", "Vegetarian food only"],
    houseRules: ["Study hours 9 PM - 11 PM", "No external guests in dorms", "Canteen timings to be strictly followed"],
    nearbyPlaces: [{ name: "MANIT Bhopal", distance: "0.2" }, { name: "BHEL", distance: "1.5" }],
    views: 4500,
    createdAt: "2023-04-05T00:00:00.000Z",
    ownerId: {
      name: "Suresh Patidar",
      phone: "+91 9876512345",
      email: "suresh@studentsquare.com"
    },
    agentName: "Sanjay Gupta",
    managerPhone: "+91 9999900004",
    b2bActivePlan: true,
    visitTimings: "10:00 AM - 05:00 PM (Mon-Sat)",
    furnishingStatus: "Non furnished",
    acStatus: "Non AC"
  },
  {
    _id: "p5",
    pgName: "Serenity Women's Hostel",
    propertyType: "Hostel",
    genderPreference: "female",
    minPrice: 6500,
    maxPrice: 10000,
    coverImage: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80" }
    ],
    location: {
      area: "Ayodhya Bypass",
      address: "Near Minal Residency",
      city: "Bhopal",
      lat: 23.2715,
      lng: 77.4589
    },
    totalRooms: 40,
    amenities: ["WiFi", "AC", "Meals", "Transport", "Security Camera"],
    customAmenities: ["Shuttle Service", "Yoga Room"],
    rating: "4.6",
    status: "approved",
    description: "Premium executive hostel for working women in Minal Residency area. Strategic location with easy access to the city bypass.",
    goodToKnow: ["Biometric entry", "Working professionals preferred"],
    houseRules: ["Biometric check-in mandatory", "Working ID proof required", "Eco-friendly lighting usage"],
    nearbyPlaces: [{ name: "Minal Residency Shopping", distance: "0.4" }, { name: "City Bypass Road", distance: "0.6" }],
    views: 1800,
    createdAt: "2023-05-20T00:00:00.000Z",
    ownerId: {
      name: "Priya Reddy",
      phone: "+91 9012345678",
      email: "priya@serenity.com"
    },
    agentName: "Priya Sharma",
    managerPhone: "+91 9999900005",
    b2bActivePlan: false,
    visitTimings: "10:00 AM - 06:00 PM (Daily)",
    furnishingStatus: "Furnished",
    acStatus: "AC"
  },
  {
    _id: "p6",
    pgName: "The Collective Home Stay",
    propertyType: "Home Stay",
    genderPreference: "any",
    minPrice: 15000,
    maxPrice: 30000,
    coverImage: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&q=80" }
    ],
    location: {
      area: "Chuna Bhatti",
      address: "Kolar Road",
      city: "Bhopal",
      lat: 23.1912,
      lng: 77.4128
    },
    totalRooms: 25,
    amenities: ["WiFi", "AC", "Housekeeping", "Gym", "Lounge"],
    customAmenities: ["Coworking Space", "Barbeque Area", "Smart Locks"],
    rating: "4.9",
    status: "approved",
    description: "Luxury home stay space in Chuna Bhatti area. Combining hotel-style amenities with a vibrant student and professional community.",
    goodToKnow: ["Community events every weekend", "Premium mattresses", "No lock-in if moving to another branch"],
    views: 5600,
    createdAt: "2023-06-12T00:00:00.000Z",
    ownerId: {
      name: "Arjun Rao",
      phone: "+91 9753186420",
      email: "arjun@thecollective.in"
    },
    agentName: "Arjun Rao",
    managerPhone: "+91 9753186420",
    b2bActivePlan: true,
    visitTimings: "24/7 (Resident Manager)",
    furnishingStatus: "Furnished",
    acStatus: "AC"
  },
  {
    _id: "p7",
    pgName: "Heritage Comforts",
    propertyType: "PG",
    genderPreference: "male",
    minPrice: 9000,
    maxPrice: 14000,
    coverImage: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80" }
    ],
    location: {
      area: "Ashoka Garden",
      address: "Main Road",
      city: "Bhopal",
      lat: 23.2568,
      lng: 77.4312
    },
    totalRooms: 18,
    amenities: ["WiFi", "Meals", "Laundry", "Parking"],
    customAmenities: ["Table Tennis", "Spacious Balconies"],
    rating: "4.3",
    status: "approved",
    description: "Spacious PG perfect for railway aspirants and young professionals. Known for its delicious home-style food.",
    goodToKnow: ["2 months deposit", "Bike parking available"],
    views: 1200,
    createdAt: "2023-07-01T00:00:00.000Z",
    ownerId: {
      name: "Nitin Patil",
      phone: "+91 9988771122",
      email: "nitin@heritage.com"
    },
    agentName: "Sanjay Gupta",
    managerPhone: "+91 9999900007",
    b2bActivePlan: true,
    visitTimings: "10:00 AM - 06:00 PM (Mon-Sat)",
    furnishingStatus: "Semi Finished",
    acStatus: "Non AC"
  },
  {
    _id: "p8",
    pgName: "Queens Stay",
    propertyType: "PG",
    genderPreference: "female",
    minPrice: 8500,
    maxPrice: 14000,
    coverImage: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80" }
    ],
    location: {
      area: "Shahpura",
      address: "Sector B",
      city: "Bhopal",
      lat: 23.2012,
      lng: 77.4285
    },
    totalRooms: 22,
    amenities: ["WiFi", "AC", "Meals", "Security", "Power Backup"],
    customAmenities: ["Terrace Lounge", "Filtered Water Dispenser"],
    rating: "4.7",
    status: "approved",
    description: "Highly secure and comfortable women's PG in upscale Shahpura area. Overlooking the beautiful Shahpura lake.",
    goodToKnow: ["Fingerprint access", "Strict security"],
    views: 1900,
    createdAt: "2023-08-15T00:00:00.000Z",
    ownerId: {
      name: "Lakshmi Narayanan",
      phone: "+91 9840123456",
      email: "lakshmi@queensstay.com"
    },
    agentName: "Priya Sharma",
    managerPhone: "+91 9999900008",
    b2bActivePlan: true,
    visitTimings: "09:00 AM - 07:00 PM (Mon-Sun)",
    furnishingStatus: "Furnished",
    acStatus: "AC"
  },
  {
    _id: "p9",
    pgName: "EcoLiving Service Apartment",
    propertyType: "Service Apartment",
    genderPreference: "any",
    minPrice: 11000,
    maxPrice: 22000,
    coverImage: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80" }
    ],
    location: {
      area: "Bawadiya Kalan",
      address: "Gulmohar Extension",
      city: "Bhopal",
      lat: 23.1856,
      lng: 77.4512
    },
    totalRooms: 35,
    amenities: ["WiFi", "AC", "Gym", "Housekeeping", "Common Kitchen"],
    customAmenities: ["Solar Heated Water", "Indoor Plants", "Recycling Center"],
    rating: "4.8",
    status: "approved",
    description: "Environmentally conscious service apartment in the growing Bawadiya Kalan area. Sustainable living at its best.",
    goodToKnow: ["Community garden", "Electric vehicle charging stations"],
    views: 2400,
    createdAt: "2023-09-10T00:00:00.000Z",
    ownerId: {
      name: "Anirban Das",
      phone: "+91 9830098300",
      email: "anirban@ecoliving.in"
    },
    agentName: "Arjun Rao",
    managerPhone: "+91 9999900009",
    b2bActivePlan: true,
    visitTimings: "10:00 AM - 06:00 PM (Weekdays)",
    furnishingStatus: "Furnished",
    acStatus: "AC"
  },
  {
    _id: "p10",
    pgName: "Royal Rajputana PG",
    propertyType: "PG",
    genderPreference: "male",
    minPrice: 6000,
    maxPrice: 9500,
    coverImage: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80" }
    ],
    location: {
      area: "Govindpura",
      address: "Sector A",
      city: "Bhopal",
      lat: 23.2512,
      lng: 77.4685
    },
    totalRooms: 12,
    amenities: ["WiFi", "Meals", "Laundry", "Cooler", "Parking"],
    customAmenities: ["Open Courtyard", "Traditional Decor"],
    rating: "4.4",
    status: "approved",
    description: "Homely PG with a touch of hospitality near Govindpura industrial area. Famous for excellent vegetarian food.",
    goodToKnow: ["Strictly vegetarian", "Desert coolers installed"],
    views: 850,
    createdAt: "2023-10-05T00:00:00.000Z",
    ownerId: {
      name: "Rajendra Singh",
      phone: "+91 9414012345",
      email: "rajendra@royalpg.com"
    },
    agentName: "Sanjay Gupta",
    managerPhone: "+91 9414012345",
    b2bActivePlan: false,
    visitTimings: "08:00 AM - 08:00 PM (Daily)",
    furnishingStatus: "Non furnished",
    acStatus: "Non AC"
  }
];

export const dummyRooms = {
  p1: [
    { name: "Single AC", type: "single", price: 12000, capacity: "1 person", size: "150", availableUnits: 2, totalUnits: 5, attachedBathroom: true, balcony: true, kitchen: false, lockInPeriod: "3 months" },
    { name: "Double Sharing", type: "double", price: 8500, capacity: "2 persons", size: "200", availableUnits: 5, totalUnits: 15, attachedBathroom: true, balcony: false, kitchen: false, lockInPeriod: "3 months" }
  ],
  p2: [
    { name: "Single Non-AC", type: "single", price: 15000, capacity: "1 person", size: "140", availableUnits: 1, totalUnits: 3, attachedBathroom: true, balcony: false, kitchen: false, lockInPeriod: "2 months" },
    { name: "Triple Sharing", type: "triple", price: 7000, capacity: "3 persons", size: "250", availableUnits: 4, totalUnits: 12, attachedBathroom: false, balcony: true, kitchen: false, lockInPeriod: "2 months" }
  ],
  p3: [
    { name: "Private Studio", type: "single", price: 25000, capacity: "1 person", size: "300", availableUnits: 5, totalUnits: 10, attachedBathroom: true, balcony: true, kitchen: true, lockInPeriod: "1 month" },
    { name: "Twin Sharing Pod", type: "double", price: 12000, capacity: "2 persons", size: "220", availableUnits: 8, totalUnits: 20, attachedBathroom: true, balcony: false, kitchen: false, lockInPeriod: "1 month" }
  ],
  p4: [
    { name: "Four Sharing Dorm", type: "quad", price: 5000, capacity: "4 persons", size: "350", availableUnits: 12, totalUnits: 30, attachedBathroom: false, balcony: false, kitchen: false, lockInPeriod: "6 months" },
    { name: "Double Sharing", type: "double", price: 8000, capacity: "2 persons", size: "180", availableUnits: 3, totalUnits: 20, attachedBathroom: false, balcony: true, kitchen: false, lockInPeriod: "6 months" }
  ],
  p5: [
    { name: "Executive Single", type: "single", price: 10000, capacity: "1 person", size: "160", availableUnits: 2, totalUnits: 10, attachedBathroom: true, balcony: true, kitchen: false, lockInPeriod: "3 months" },
    { name: "Standard Double", type: "double", price: 6500, capacity: "2 persons", size: "200", availableUnits: 6, totalUnits: 30, attachedBathroom: true, balcony: false, kitchen: false, lockInPeriod: "3 months" }
  ],
  p6: [
    { name: "Premium Suite", type: "single", price: 30000, capacity: "1 person", size: "400", availableUnits: 3, totalUnits: 5, attachedBathroom: true, balcony: true, kitchen: true, lockInPeriod: "0 months" },
    { name: "Smart Double", type: "double", price: 15000, capacity: "2 persons", size: "250", availableUnits: 7, totalUnits: 20, attachedBathroom: true, balcony: false, kitchen: false, lockInPeriod: "0 months" }
  ],
  p7: [
    { name: "Spacious Single", type: "single", price: 14000, capacity: "1 person", size: "180", availableUnits: 1, totalUnits: 4, attachedBathroom: true, balcony: true, kitchen: false, lockInPeriod: "2 months" },
    { name: "Standard Double", type: "double", price: 9000, capacity: "2 persons", size: "200", availableUnits: 5, totalUnits: 14, attachedBathroom: false, balcony: false, kitchen: false, lockInPeriod: "2 months" }
  ],
  p8: [
    { name: "Comfort Single AC", type: "single", price: 14000, capacity: "1 person", size: "150", availableUnits: 2, totalUnits: 6, attachedBathroom: true, balcony: false, kitchen: false, lockInPeriod: "3 months" },
    { name: "Triple AC Sharing", type: "triple", price: 8500, capacity: "3 persons", size: "280", availableUnits: 9, totalUnits: 16, attachedBathroom: true, balcony: true, kitchen: false, lockInPeriod: "3 months" }
  ],
  p9: [
    { name: "Eco Single", type: "single", price: 22000, capacity: "1 person", size: "200", availableUnits: 4, totalUnits: 15, attachedBathroom: true, balcony: true, kitchen: false, lockInPeriod: "3 months" },
    { name: "Green Double", type: "double", price: 11000, capacity: "2 persons", size: "240", availableUnits: 8, totalUnits: 20, attachedBathroom: true, balcony: false, kitchen: false, lockInPeriod: "3 months" }
  ],
  p10: [
    { name: "Heritage Single", type: "single", price: 9500, capacity: "1 person", size: "160", availableUnits: 1, totalUnits: 2, attachedBathroom: true, balcony: false, kitchen: false, lockInPeriod: "1 month" },
    { name: "Classic Triple", type: "triple", price: 6000, capacity: "3 persons", size: "300", availableUnits: 6, totalUnits: 10, attachedBathroom: false, balcony: true, kitchen: false, lockInPeriod: "1 month" }
  ]
};

export const dummyReviews = {
  p1: [
    { user: "Amit Kumar", rating: 5, text: "Excellent food and WiFi speed.", date: "2023-10-15" },
    { user: "Sumit T", rating: 4, text: "Good place but slightly expensive.", date: "2023-09-20" }
  ]
};
