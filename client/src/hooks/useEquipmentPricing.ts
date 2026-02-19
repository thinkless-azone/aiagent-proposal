import { useState, useEffect } from 'react';

export interface EquipmentPrice {
  id: string;
  name: string;
  basePrice: number;
  currentPrice: number;
  currency: string;
  lastUpdated: Date;
  trend: 'up' | 'down' | 'stable';
}

// Mock initial data based on proposal
const INITIAL_PRICES: Record<string, number> = {
  'graviton-h22i': 9122600,
  'das-storage': 900000,
  'eltex-mes2300-24': 186550,
  'yadro-g4208p': 18390000, // Per unit price
  'aerodisk-storage': 9800000,
  'eltex-mes5324': 499000, // Per unit price
  // Software licenses
  'alt-linux': 48600,
  'alt-virtualization': 101200,
  // '1c-enterprise': 180000, // Removed: Assumed already installed
  'postgres-pro': 238781,
  'ml-platform': 800000,
  'data-connectors': 850000,
  // Implementation phases (Basic Variant Total: 11M)
  'impl-basic-phase-1': 3000000, // Analysis & Design
  'impl-basic-phase-2': 5000000, // Deployment & Config
  'impl-basic-phase-3': 3000000, // Testing & Training

  // Implementation phases (Optimal Variant Total: ~12-20M)
  'impl-optimal-phase-1': 5000000, // Analysis & Design
  'impl-optimal-phase-2': 7000000, // Deployment & Config
  'impl-optimal-phase-3': 4000000, // Testing & Training

  // Budget Alternatives
  'server-budget': 1200000, // Entry-level server
  'storage-budget': 300000, // Basic NAS
  'switch-budget': 45000, // Basic L2 switch
  'linux-free': 0, // Community Linux (e.g., Ubuntu/Debian/CentOS)
  'postgres-free': 0, // PostgreSQL Community
  'virtualization-free': 0, // KVM/Proxmox (Community)
  'ml-platform-opensource': 0, // Open source ML tools
  'connectors-opensource': 0, // Custom scripts/Open source
  'impl-budget-phase-1': 1000000, // Simplified Analysis
  'impl-budget-phase-2': 1500000, // Basic Deployment
  'impl-budget-phase-3': 500000, // Minimal Training
};

export function useEquipmentPricing() {
  const [prices, setPrices] = useState<Record<string, EquipmentPrice>>({});
  const [isLive, setIsLive] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    // Initialize prices
    const initialData: Record<string, EquipmentPrice> = {};
    Object.entries(INITIAL_PRICES).forEach(([id, price]) => {
      initialData[id] = {
        id,
        name: id, // Simplified, mapping happens in UI
        basePrice: price,
        currentPrice: price,
        currency: 'RUB',
        lastUpdated: new Date(),
        trend: 'stable'
      };
    });
    setPrices(initialData);

    // Simulate live updates
    const interval = setInterval(() => {
      if (!isLive) return;

      setPrices(prev => {
        const next = { ...prev };
        const randomKey = Object.keys(next)[Math.floor(Math.random() * Object.keys(next).length)];
        const item = next[randomKey];
        
        // Random fluctuation +/- 2%
        const fluctuation = (Math.random() - 0.5) * 0.04; 
        const newPrice = Math.round(item.currentPrice * (1 + fluctuation) / 1000) * 1000; // Round to nearest 1000
        
        next[randomKey] = {
          ...item,
          currentPrice: newPrice,
          lastUpdated: new Date(),
          trend: newPrice > item.currentPrice ? 'up' : newPrice < item.currentPrice ? 'down' : 'stable'
        };
        
        return next;
      });
      setLastUpdate(new Date());
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [isLive]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', { 
      style: 'currency', 
      currency: 'RUB', 
      maximumFractionDigits: 0 
    }).format(price);
  };

  return { prices, isLive, setIsLive, lastUpdate, formatPrice };
}
