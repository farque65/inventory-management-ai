import { LogOut } from 'lucide-react';
import { useState } from 'react';
import { CollectibleForm } from './components/CollectibleForm';
import { CollectibleList } from './components/CollectibleList';
import CollectionButton from './components/CollectionButton';
import { CollectionForm } from './components/CollectionForm';
import { useAuth } from './hooks/useAuth';
import type { Collectible } from './types/collectibles';
import type { Collection } from './types/collections';

export default function App() {
  const { user, signOut } = useAuth();
  const [selectedCollectible, setSelectedCollectible] = useState<Collectible | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCollectionFormOpen, setIsCollectionFormOpen] = useState(false);

  const handleEdit = (collectible: Collectible) => {
    setSelectedCollectible(collectible);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setSelectedCollectible(null);
    setIsFormOpen(true);
  };

  const handleAddCollection = () => {
    setIsCollectionFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Collectibles Inventory</h1>
            <div className="flex items-center gap-4">
              <CollectionButton onAdd={handleAddCollection}/>
              <span className="text-sm text-gray-600">Welcome, {user?.email}</span>
              <button
                onClick={signOut}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CollectibleList
          onEdit={handleEdit}
          onAdd={handleAdd}
        />
      </main>

      {isFormOpen && (
        <CollectibleForm
          collectible={selectedCollectible}
          onClose={() => setIsFormOpen(false)}
          user_id={user?.id}
        />
      )}

      {isCollectionFormOpen && (
        <CollectionForm
          collection={selectedCollection}
          onClose={() => setIsCollectionFormOpen(false)}
          user_id={user?.id}
        />
      )}
    </div>
  );
}