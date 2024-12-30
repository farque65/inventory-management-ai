import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import * as collectiblesApi from '../services/collectibles';
import type { Collectible, NewCollectible } from '../types/collectibles';

export function useCollectibles(collectibleId?: string) {
  const [collectibles, setCollectibles] = useState<Collectible[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCollectibles = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await collectiblesApi.getCollectibles(collectibleId);
      setCollectibles(data);
    } catch (error) {
      toast.error('Failed to load collectibles');
      console.error('Error fetching collectibles:', error);
    } finally {
      setIsLoading(false);
    }
  }, [collectibleId]);

  const addCollectible = useCallback(async (collectible: NewCollectible) => {
    try {
      const newCollectible = await collectiblesApi.createCollectible(collectible);
      setCollectibles(prev => [...prev, newCollectible]);
      toast.success('Collectible added successfully');
    } catch (error) {
      toast.error('Failed to add collectible');
      console.error('Error adding collectible:', error);
    }
  }, []);

  const updateCollectible = useCallback(async (id: string, collectible: Partial<NewCollectible>) => {
    try {
      const updatedCollectible = await collectiblesApi.updateCollectible(id, collectible);
      setCollectibles(prev => 
        prev.map(item => item.id === id ? updatedCollectible : item)
      );
      toast.success('Collectible updated successfully');
    } catch (error) {
      toast.error('Failed to update collectible');
      console.error('Error updating collectible:', error);
    }
  }, []);

  const deleteCollectible = useCallback(async (id: string) => {
    try {
      await collectiblesApi.deleteCollectible(id);
      setCollectibles(prev => prev.filter(item => item.id !== id));
      toast.success('Collectible deleted successfully');
    } catch (error) {
      toast.error('Failed to delete collectible');
      console.error('Error deleting collectible:', error);
    }
  }, []);

  return {
    collectibles,
    isLoading,
    fetchCollectibles,
    addCollectible,
    updateCollectible,
    deleteCollectible,
  };
}