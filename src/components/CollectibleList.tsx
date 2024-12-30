import { Plus } from 'lucide-react';
import { useEffect } from 'react';
import { useCollectibles } from '../hooks/useCollectibles';
import type { Collectible } from '../types/collectibles';
import { CollectibleCard } from './CollectibleCard';

interface Props {
  collectionId?: string;
  onEdit: (collectible: Collectible) => void;
  onAdd: () => void;
}

export function CollectibleList({ collectionId, onEdit, onAdd }: Props) {
  const {
    collectibles,
    isLoading,
    fetchCollectibles,
    deleteCollectible
  } = useCollectibles(collectionId);

  useEffect(() => {
    fetchCollectibles();
  }, [fetchCollectibles]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          {collectionId ? 'Collection Collectibles' : 'All Collectibles'}
        </h2>
        <button
          onClick={onAdd}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Collectible
        </button>
      </div>
      
      {collectibles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No collectibles found.</p>
          <button
            onClick={onAdd}
            className="mt-4 text-blue-600 hover:text-blue-500"
          >
            Add your first collectible
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collectibles.map((collectible) => (
            <CollectibleCard
              key={collectible.id}
              collectible={collectible}
              onEdit={() => onEdit(collectible)}
              onDelete={() => deleteCollectible(collectible.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}