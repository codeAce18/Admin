import React, { useEffect, useState } from 'react';
import ScrollToTop from '../components/ScrollToTop.tsx';
import Title from '../components/Title.tsx';
import { viewAllTreasurePurchases } from '../scripts/fetch.ts';
import { useAppContext } from '../context/index.tsx';
import Table from '../components/tables/Table.tsx';

const TreasureChestPurchase = () => {
  const { token, treasurePurchases, setTreasurePurchases } = useAppContext();
  const [activeCategory, setActiveCategory] = useState<number | null>(1);
  const [filteredTreasures, setFilteredTreasures] = useState([]);

  // Flatten treasures before setting state
  const flattenTreasureData = (treasures) => {
    return treasures.map((purchase) => ({
      user_id: purchase.user_id,
      username: purchase.user.username,
      treasure_name: purchase.treasure.name,
      treasure_category: purchase.treasure.category,
      treasure_price: purchase.treasure.price,
      treasure_image_url: purchase.treasure.image_url,  // Flattening the image_url
    }));
  };

  // Filter treasures based on category
  useEffect(() => {
    const filtered = activeCategory
      ? treasurePurchases.filter((purchase) => purchase.treasure.category == activeCategory)
      : treasurePurchases;
    // Flatten the filtered data
    setFilteredTreasures(flattenTreasureData(filtered));
  }, [treasurePurchases, activeCategory]);

  // Fetch treasure purchases
  const load = async () => {
    const res = await viewAllTreasurePurchases(token);
    if (res && res.data) {
      setTreasurePurchases(res.data);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Define table columns (note that they refer to the flat structure now)
  const columns = [
    { name: 'treasure_image_url', label: 'Image', type: 'image' },
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'treasure_name', label: 'Treasure Name', type: 'text' },
    { name: 'treasure_category', label: 'Category', type: 'text' },
    { name: 'treasure_price', label: 'Price', type: 'price' },
    // { name: 'created_at', label: 'Purchase Date', type: 'text' },
  ];

  return (
    <div className='h-full'>
      <Title title="Treasure Purchases" />

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4">
        {[1, 2, 3].map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded ${activeCategory === category ? 'active-btn' : 'bg-gray-200 text-black'
              }`}
            onClick={() => setActiveCategory(category === activeCategory ? null : category)}
          >
            Category {category}
          </button>
        ))}
      </div>

      {/* Render Treasure Table */}
      <Table props={{ title: 'Treasure Purchases', columns, data: filteredTreasures, actions: null }} />

      <ScrollToTop />
    </div>
  );
};

export default TreasureChestPurchase;
