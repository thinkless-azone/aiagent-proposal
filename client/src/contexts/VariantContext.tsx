import React, { createContext, useContext, useState, ReactNode } from 'react';

type VariantType = 'all' | 'basic' | 'optimal';

interface VariantContextType {
  selectedVariant: VariantType;
  setSelectedVariant: (variant: VariantType) => void;
}

const VariantContext = createContext<VariantContextType | undefined>(undefined);

export function VariantProvider({ children }: { children: ReactNode }) {
  const [selectedVariant, setSelectedVariant] = useState<VariantType>('all');

  return (
    <VariantContext.Provider value={{ selectedVariant, setSelectedVariant }}>
      {children}
    </VariantContext.Provider>
  );
}

export function useVariant() {
  const context = useContext(VariantContext);
  if (context === undefined) {
    throw new Error('useVariant must be used within a VariantProvider');
  }
  return context;
}
