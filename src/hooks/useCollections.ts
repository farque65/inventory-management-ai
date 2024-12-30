import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import * as collectionsApi from '../services/collections';
import type { Collection, NewCollection } from '../types/collections';

export function useCollections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCollections = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await collectionsApi.getCollections();
      setCollections(data);
    } catch (error) {
      toast.error('Failed to load collections');
      console.error('Error fetching collections:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

    const addCollection = useCallback(async (collection: NewCollection) => {
      try {
        console.log("add collection: ",collection);
        const newCollections = await collectionsApi.createCollection(collection);
        setCollections(prev => [...prev, newCollections]);
        toast.success('Collection added successfully');
      } catch (error) {
        toast.error('Failed to add Collection');
        console.error('Error adding collection:', error);
      }
    }, []);
  
    const updateCollection = useCallback(async (id: string, collection: Partial<NewCollection>) => {
      try {
        const updatedCollection = await collectionsApi.updateCollection(id, collection);
        setCollections(prev => 
          prev.map(item => item.id === id ? updatedCollection : item)
        );
        toast.success('Collection updated successfully');
      } catch (error) {
        toast.error('Failed to update collection');
        console.error('Error updating collection:', error);
      }
    }, []);
  
    const deleteCollection = useCallback(async (id: string) => {
      try {
        await collectionsApi.deleteCollection(id);
        setCollections(prev => prev.filter(item => item.id !== id));
        toast.success('Collection deleted successfully');
      } catch (error) {
        toast.error('Failed to delete collection');
        console.error('Error deleting collection:', error);
      }
    }, []);

  return {
    collections,
    isLoading,
    fetchCollections,
    addCollection,
    updateCollection,
    deleteCollection
  };
}