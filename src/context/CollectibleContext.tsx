import React, { createContext, useState, useContext, useCallback } from 'react';

interface CollectiblesContextProps {
  fetchCollectibles: () => void;
  triggerFetch: () => void;
}

const CollectiblesContext = createContext<CollectiblesContextProps | undefined>(undefined);

export const CollectiblesProvider: React.FC = ({ children }) => {
  const [action, setAction] = useState(0);

  const fetchCollectibles = useCallback(() => {
    // Fetch collectibles logic
    console.log('Fetching collectibles...');
  }, []);

  const triggerFetch = () => {
    setAction(prev => prev + 1);
  };

  React.useEffect(() => {
    fetchCollectibles();
  }, [action, fetchCollectibles]);

  return (
    <CollectiblesContext.Provider value={{ fetchCollectibles, triggerFetch }}>
      {children}
    </CollectiblesContext.Provider>
  );
};

export const useCollectibles = () => {
  const context = useContext(CollectiblesContext);
  if (!context) {
    throw new Error('useCollectibles must be used within a CollectiblesProvider');
  }
  return context;
};