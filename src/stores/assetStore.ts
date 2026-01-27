import { create } from 'zustand';
import { AssetData } from '../components/ui/AssetCard';

export interface AssetState {
  assets: AssetData[];
  addAsset: (asset: AssetData) => void;
  updateAsset: (id: string, asset: Partial<AssetData>) => void;
  removeAsset: (id: string) => void;
  getAssetById: (id: string) => AssetData | undefined;
  reorderAssets: (fromIndex: number, toIndex: number) => void;
}

// Mock data for demonstration
const mockAssets: AssetData[] = [
  {
    id: 'hydrants',
    name: 'Fire Hydrants',
    totalCount: 32,
    classifications: [
      { name: 'Commercial', count: 12, workingCount: 10, notWorkingCount: 2 },
      { name: 'Residential', count: 20, workingCount: 17, notWorkingCount: 3 },
    ],
  },
  {
    id: 'reports-dispatched',
    name: 'Dispatched Reports',
    totalCount: 7,
    classifications: [
      { name: 'Mainline', count: 3 },
      { name: 'Service Line', count: 2 },
      { name: 'Meter', count: 2 },
    ],
  },
  {
    id: 'reports-total',
    name: 'Total Reports',
    totalCount: 11,
    classifications: [
      { name: 'Mainline', count: 5 },
      { name: 'Service Line', count: 4 },
      { name: 'Meter', count: 2 },
    ],
  },
  {
    id: 'reports-pending',
    name: 'Pending (Un-Dispatch)',
    totalCount: 4,
    classifications: [
      { name: 'Mainline', count: 2 },
      { name: 'Service Line', count: 2 },
    ],
  },
];

export const useAssetStore = create<AssetState>((set, get) => ({
  assets: mockAssets,
  
  addAsset: (asset) =>
    set((state) => ({
      assets: [...state.assets, asset],
    })),
  
  updateAsset: (id, updatedAsset) =>
    set((state) => ({
      assets: state.assets.map((asset) =>
        asset.id === id ? { ...asset, ...updatedAsset } : asset
      ),
    })),
  
  removeAsset: (id) =>
    set((state) => ({
      assets: state.assets.filter((asset) => asset.id !== id),
    })),
  
  getAssetById: (id) => get().assets.find((asset) => asset.id === id),

  reorderAssets: (fromIndex, toIndex) =>
    set((state) => {
      const next = [...state.assets];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return { assets: next };
    }),
}));

// Mock API functions for demonstration
export const fetchAssetData = async (assetType?: string): Promise<AssetData> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  if (assetType === 'hydrants') {
    const commercial = Math.floor(Math.random() * 20) + 8;
    const residential = Math.floor(Math.random() * 30) + 12;
    const comWorking = Math.floor(commercial * 0.8);
    const resWorking = Math.floor(residential * 0.85);
    const classifications = [
      { name: 'Commercial', count: commercial, workingCount: comWorking, notWorkingCount: commercial - comWorking },
      { name: 'Residential', count: residential, workingCount: resWorking, notWorkingCount: residential - resWorking },
    ];
    return {
      id: `hydrants-${Date.now()}`,
      name: 'Fire Hydrants',
      totalCount: commercial + residential,
      classifications,
    };
  }

  // Default dynamic asset with generic categories
  const typeA = Math.floor(Math.random() * 25) + 10;
  const typeB = Math.floor(Math.random() * 25) + 10;
  const aWorking = Math.floor(typeA * 0.7);
  const bWorking = Math.floor(typeB * 0.75);
  const classifications = [
    { name: 'Type A', count: typeA, workingCount: aWorking, notWorkingCount: typeA - aWorking },
    { name: 'Type B', count: typeB, workingCount: bWorking, notWorkingCount: typeB - bWorking },
  ];

  return {
    id: `dynamic-${Date.now()}`,
    name: 'Dynamic Asset',
    totalCount: typeA + typeB,
    classifications,
  };
};
