import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Collectible } from '../types';

interface Props {
  collectible: Collectible;
  onEdit: (collectible: Collectible) => void;
  onDelete: (id: string) => void;
}

export function CollectibleCard({ collectible, onEdit, onDelete }: Props) {
  const conditionColors = {
    mint: 'bg-green-100 text-green-800',
    excellent: 'bg-blue-100 text-blue-800',
    good: 'bg-yellow-100 text-yellow-800',
    fair: 'bg-orange-100 text-orange-800',
    poor: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="aspect-square overflow-hidden">
        <img
          src={collectible.imageUrl || 'https://images.unsplash.com/photo-1595079676601-f1adf5be5dee?q=80&w=800'}
          alt={collectible.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{collectible.name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${conditionColors[collectible.condition]}`}>
            {collectible.condition}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{collectible.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-green-600 font-medium">
            ${collectible.estimatedValue.toLocaleString()}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(collectible)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => onDelete(collectible.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}