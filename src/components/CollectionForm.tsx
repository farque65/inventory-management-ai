import { X } from 'lucide-react';
import React from 'react';
import { useCollections } from '../hooks/useCollections';
import type { Collection, NewCollection } from '../types/collections';

interface Props {
  collection?: Collection;
  onSubmit: (collection: Omit<Collection, 'id'>) => void;
  onClose: () => void;
  user_id?: string;
}

export function CollectionForm({ user_id, collection, onClose }: Props) {
  const { addCollection, updateCollection } = useCollections();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const collectionData = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      user_id: user_id || null,
    };

    try {
      if (collection) {
        // Update collection
        updateCollection(collection.id, collectionData);
      } else {
        // Create new collection
        addCollection(collectionData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving collection:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">
            {collection ? 'Edit collection' : 'Create New collection'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
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
              defaultValue={collection?.name}
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
              defaultValue={collection?.description}
              rows={3}
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
              {collection ? 'Save Changes' : 'Create Collection'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}