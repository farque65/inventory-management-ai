import { Loader2, X } from 'lucide-react';
import { useEffect } from 'react';
import { useCollectibles } from '../hooks/useCollectibles';
import { useCollections } from '../hooks/useCollections';
import type { Collectible } from '../types/collectibles';

interface Props {
  collectible?: Collectible;
  onClose: () => void;
  user_id?: string;
}

export function CollectibleForm({ user_id, collectible, onClose }: Props) {
  const { collections, isLoading: isLoadingCollections, fetchCollections } = useCollections();
  const { addCollectible, updateCollectible, fetchCollectibles } = useCollectibles();

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const collectibleData = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      acquisition_date: formData.get('acquisition_date') as string,
      estimated_value: Number(formData.get('estimated_value')),
      condition: formData.get('condition') as Collectible['condition'],
      image_url: formData.get('image_url') as string || null,
      collection_id: formData.get('collection_id') as string || null,
      user_id: user_id || null,
    };

    try {
      if (collectible) {
        await updateCollectible(collectible.id, collectibleData);
      } else {
        await addCollectible(collectibleData);
      }
      fetchCollectibles();
      onClose();
    } catch (error) {
      console.error('Error saving collectible:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">
            {collectible ? 'Edit Collectible' : 'Add New Collectible'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={collectible?.name}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={collectible?.description || ''}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="acquisition_date" className="block text-sm font-medium text-gray-700">
                Acquisition Date
              </label>
              <input
                type="date"
                id="acquisition_date"
                name="acquisition_date"
                defaultValue={collectible?.acquisition_date}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="estimated_value" className="block text-sm font-medium text-gray-700">
                Estimated Value ($)
              </label>
              <input
                type="number"
                id="estimated_value"
                name="estimated_value"
                defaultValue={collectible?.estimated_value}
                required
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
                Condition
              </label>
              <select
                id="condition"
                name="condition"
                defaultValue={collectible?.condition || 'good'}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="mint">Mint</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>
            <div>
              <label htmlFor="collection_id" className="block text-sm font-medium text-gray-700">
                Collection
              </label>
              {isLoadingCollections ? (
                <div className="mt-1 flex items-center">
                  <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                </div>
              ) : (
                <select
                  id="collection_id"
                  name="collection_id"
                  defaultValue={collectible?.collection_id || ''}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">No Group</option>
                  {collections.map((collection) => (
                    <option key={collection.id} value={collection.id}>
                      {collection.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="url"
              id="image_url"
              name="image_url"
              defaultValue={collectible?.image_url || ''}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              {collectible ? 'Save Changes' : 'Add Collectible'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}