import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const BANNER_HEIGHT = Math.round(width * 0.45);

type Banner = { id: string; title: string; subtitle: string; image: string };
type Category = { id: string; name: string; icon: string };
type Deal = { id: string; title: string; img: string };
type Brand = { id: string; img: string };

// ✅ Mock data
const banners: Banner[] = [
  { id: 'b1', title: 'Flat 30% off on Fresh Fruits', subtitle: 'Limited time', image: 'https://images.unsplash.com/photo-1576402187870-40e7bbf43d45?w=800' },
  { id: 'b2', title: 'Buy 1 Get 1 Free on Snacks', subtitle: 'Today only', image: 'https://images.unsplash.com/photo-1604908811634-3b3e9c7e62d2?w=800' },
  { id: 'b3', title: 'Free Delivery above ₹499', subtitle: 'Use code: FREEDEL', image: 'https://images.unsplash.com/photo-1606813902851-dfca0cb58c94?w=800' },
];

const categories: Category[] = [
  { id: 'c1', name: 'Fruits & Veg', icon: 'https://images.unsplash.com/photo-1611078489935-ec59c779843f?w=200' },
  { id: 'c2', name: 'Breakfast', icon: 'https://images.unsplash.com/photo-1506089676908-3592f7389d4d?w=200' },
  { id: 'c3', name: 'Beverages', icon: 'https://images.unsplash.com/photo-1509043759401-136742328bb3?w=200' },
  { id: 'c4', name: 'Meat & Fish', icon: 'https://images.unsplash.com/photo-1604908176997-51b1a3e20e41?w=200' },
  { id: 'c5', name: 'Dairy', icon: 'https://images.unsplash.com/photo-1580910051074-3f0b2dcf83e0?w=200' },
];

const deals: Deal[] = [
  { id: 'd1', title: 'Apple - ₹99/kg', img: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=300' },
  { id: 'd2', title: 'Potato - ₹20/kg', img: 'https://images.unsplash.com/photo-1567370649635-5c7af3f1822b?w=300' },
  { id: 'd3', title: 'Milk - ₹45', img: 'https://images.unsplash.com/photo-1580910051074-3f0b2dcf83e0?w=300' },
];

const brands: Brand[] = [
  { id: 'br1', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Amul_Logo.svg/2560px-Amul_Logo.svg.png' },
  { id: 'br2', img: 'https://1000logos.net/wp-content/uploads/2021/05/Nestle-logo.png' },
  { id: 'br3', img: 'https://1000logos.net/wp-content/uploads/2017/05/Pepsi-Logo.png' },
  { id: 'br4', img: 'https://1000logos.net/wp-content/uploads/2017/05/Coca-Cola-logo.png' },
];

export default function TrueValueLandingScreen() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [search, setSearch] = useState<string>('');

  const renderBanner = ({ item }: { item: Banner }) => (
    <TouchableOpacity activeOpacity={0.9} style={styles.bannerCard}>
      <Image source={{ uri: item.image }} style={styles.bannerImage} resizeMode="cover" />
      <View style={styles.bannerTextWrap}>
        <Text style={styles.bannerTitle}>{item.title}</Text>
        <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity style={styles.categoryCard} activeOpacity={0.8}>
      <Image source={{ uri: item.icon }} style={styles.categoryIcon} />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderDeal = ({ item }: { item: Deal }) => (
    <TouchableOpacity style={styles.dealCard} activeOpacity={0.85}>
      <Image source={{ uri: item.img }} style={styles.dealImage} />
      <Text style={styles.dealTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderBrand = ({ item }: { item: Brand }) => (
    <View style={styles.brandCard}>
      <Image source={{ uri: item.img }} style={styles.brandImage} />
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.projectTitle}>TrueValue</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={{ marginRight: 12 }}>
            <Icon name="notifications-outline" size={24} color="#2A8F5A" />
          </TouchableOpacity>
          <View style={styles.profileCircle}>
            <Text style={styles.profileInitial}>S</Text>
          </View>
        </View>
      </View>

      {/* 🔎 Search Bar */}
      <View style={styles.searchWrap}>
        <Icon name="search-outline" size={20} color="#6B7280" style={{ marginHorizontal: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for products..."
          placeholderTextColor="#9CA3AF"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Body */}
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 90 }}>

        {/* Banner */}
        <FlatList
          data={banners}
          keyExtractor={(i) => i.id}
          renderItem={renderBanner}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToInterval={width * 0.9 + 12}
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: 12, marginTop: 10 }}
        />

        {/* Deals */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today’s Best Deals</Text>
          <TouchableOpacity><Text style={styles.sectionAction}>See all</Text></TouchableOpacity>
        </View>
        <FlatList
          data={deals}
          keyExtractor={(i) => i.id}
          renderItem={renderDeal}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 12, paddingBottom: 10 }}
        />

        {/* Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Shop by Category</Text>
          <TouchableOpacity><Text style={styles.sectionAction}>View all</Text></TouchableOpacity>
        </View>
        <FlatList
          data={categories}
          keyExtractor={(i) => i.id}
          renderItem={renderCategory}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 12, paddingBottom: 10 }}
        />

        {/* Recommended */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended for you</Text>
          <TouchableOpacity><Text style={styles.sectionAction}>Refresh</Text></TouchableOpacity>
        </View>
        <View style={styles.recommendedGrid}>
          {deals.concat(deals).map((item, idx) => (
            <TouchableOpacity key={item.id + idx} style={styles.recItem} activeOpacity={0.85}>
              <Image source={{ uri: item.img }} style={styles.recImage} />
              <Text style={styles.recTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Brands */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Brands</Text>
        </View>
        <FlatList
          data={brands}
          keyExtractor={(i) => i.id}
          renderItem={renderBrand}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 12, paddingBottom: 10 }}
        />

        {/* Trust Badges */}
        <View style={styles.trustWrap}>
          <View style={styles.trustItem}><Text style={styles.trustIcon}>🌿</Text><Text style={styles.trustText}>Fresh & Organic</Text></View>
          <View style={styles.trustItem}><Text style={styles.trustIcon}>🚚</Text><Text style={styles.trustText}>Fast Delivery</Text></View>
          <View style={styles.trustItem}><Text style={styles.trustIcon}>🔒</Text><Text style={styles.trustText}>Secure Payments</Text></View>
        </View>

      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('home')}>
          <Icon name="home-outline" size={24} color={activeTab === 'home' ? '#10B981' : '#111'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('search')}>
          <Icon name="search-outline" size={24} color={activeTab === 'search' ? '#10B981' : '#111'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('cart')}>
          <Icon name="cart-outline" size={24} color={activeTab === 'cart' ? '#10B981' : '#111'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('profile')}>
          <Icon name="person-outline" size={24} color={activeTab === 'profile' ? '#10B981' : '#111'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F9FAFB' },
  container: { flex: 1 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 16,
  },
  projectTitle: { fontSize: 22, fontWeight: '700', color: '#2A8F5A' },
  profileCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#EDF7EE', justifyContent: 'center', alignItems: 'center' },
  profileInitial: { color: '#2A8F5A', fontWeight: '700' },

  // 🔎 Search bar style
  searchWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', marginHorizontal: 16, borderRadius: 10, paddingHorizontal: 8, marginBottom: 6, height: 40 },
  searchInput: { flex: 1, fontSize: 14, color: '#111827' },

  bannerCard: { width: Math.round(width * 0.9), height: BANNER_HEIGHT, marginRight: 12, borderRadius: 12, overflow: 'hidden', backgroundColor: '#F3FDF4' },
  bannerImage: { width: '100%', height: '100%' },
  bannerTextWrap: { position: 'absolute', left: 16, bottom: 16, backgroundColor: 'rgba(255,255,255,0.75)', padding: 8, borderRadius: 8 },
  bannerTitle: { fontSize: 16, fontWeight: '700', color: '#0B6B3A' },
  bannerSubtitle: { fontSize: 12, color: '#065F33' },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginTop: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#111827' },
  sectionAction: { fontSize: 13, color: '#10B981' },

  dealCard: { width: 120, marginRight: 12, borderRadius: 12, backgroundColor: '#FFF', padding: 8, alignItems: 'center', elevation: 2 },
  dealImage: { width: 100, height: 80, borderRadius: 8 },
  dealTitle: { marginTop: 8, fontSize: 13, fontWeight: '600', textAlign: 'center' },

  categoryCard: { width: 80, marginRight: 12, alignItems: 'center' },
  categoryIcon: { width: 64, height: 64, borderRadius: 12, marginBottom: 6 },
  categoryName: { fontSize: 12, textAlign: 'center' },

  recommendedGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 12, marginTop: 12 },
  recItem: { width: (width - 48) / 2, marginBottom: 12, backgroundColor: '#FFF', borderRadius: 12, padding: 8, elevation: 1 },
  recImage: { width: '100%', height: 110, borderRadius: 8 },
  recTitle: { marginTop: 8, fontSize: 13, fontWeight: '600' },

  brandCard: { width: 80, height: 80, marginRight: 12, borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', elevation: 1 },
  brandImage: { width: 60, height: 40, resizeMode: 'contain' },

  trustWrap: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 16, backgroundColor: '#FBFFF9', marginTop: 12 },
  trustItem: { alignItems: 'center' },
  trustIcon: { fontSize: 22 },
  trustText: { marginTop: 6, fontSize: 12, color: '#374151' },

  bottomNav: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 60, backgroundColor: '#FFFFFF', borderTopWidth: 0.5, borderTopColor: '#E5E7EB', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  navItem: { alignItems: 'center' },
});
