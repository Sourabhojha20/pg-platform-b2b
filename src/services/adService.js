// adService.js - Mock service for Advertisements and Promotions
const MOCK_ADS = [
  {
    _id: 'ad1',
    title: 'Super Saver PG deals!',
    subtitle: 'Get up to 20% off on first month booking',
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80',
    link: '/listings',
    location: 'home_hero',
    status: 'active',
    priority: 1
  },
  {
    _id: 'ad2',
    title: 'Safe & Secure Stays for Girls',
    subtitle: 'Verified properties with 24/7 security and home-like food',
    imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80',
    link: '/listings?gender=female',
    location: 'home_mid',
    status: 'active',
    priority: 2
  },
  {
    _id: 'ad3',
    title: 'Premium Hostels in Bangalore',
    subtitle: 'Starting from ₹8,000/month',
    imageUrl: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500&q=80',
    link: '/listings?city=Bangalore',
    location: 'listing_sidebar',
    status: 'active',
    priority: 1
  }
];

class AdService {
  async getAds() {
    // In a real app, this would be an API call
    return { advertisements: MOCK_ADS };
  }

  async getAdsByLocation(location) {
    const ads = MOCK_ADS.filter(ad => ad.location === location && ad.status === 'active');
    return { advertisements: ads };
  }

  async createAd(adData) {
    console.log('Creating ad:', adData);
    return { success: true, ad: { ...adData, _id: Date.now().toString() } };
  }

  async updateAd(id, adData) {
    console.log('Updating ad:', id, adData);
    return { success: true };
  }

  async deleteAd(id) {
    console.log('Deleting ad:', id);
    return { success: true };
  }
}

export default new AdService();
