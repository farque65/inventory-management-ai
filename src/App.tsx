import React, { useState } from 'react';
import { Plus, FolderPlus, Search, LogOut } from 'lucide-react';
import { CollectibleCard } from './components/CollectibleCard';
import { CollectibleForm } from './components/CollectibleForm';
import { GroupForm } from './components/GroupForm';
import { AuthForm } from './components/AuthForm';
import { useAuth } from './context/AuthContext';
import { Collectible, Group } from './types';

function App() {
  const { isAuthenticated, user, login, register, logout } = useAuth();
  const [authType, setAuthType] = useState<'login' | 'register'>('login');
  const [collectibles, setCollectibles] = useState<Collectible[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCollectibleForm, setShowCollectibleForm] = useState(false);
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [editingCollectible, setEditingCollectible] = useState<Collectible | undefined>();

  const handleAuth = async (email: string, password: string, name?: string) => {
    try {
      if (authType === 'login') {
        await login(email, password);
      } else {
        await register(email, password, name!);
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <AuthForm
        type={authType}
        onSubmit={handleAuth}
        onToggle={() => setAuthType(authType === 'login' ? 'register' : 'login')}
      />
    );
  }

  const filteredCollectibles = collectibles.filter((collectible) => {
    const matchesGroup = !selectedGroup || collectible.groupId === selectedGroup;
    const matchesSearch = collectible.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collectible.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  const handleAddCollectible = (newCollectible: Omit<Collectible, 'id' | 'userId'>) => {
    setCollectibles([
      ...collectibles,
      { ...newCollectible, id: Date.now().toString(), userId: user!.id },
    ]);
    setShowCollectibleForm(false);
  };

  const handleEditCollectible = (collectible: Collectible) => {
    setEditingCollectible(collectible);
    setShowCollectibleForm(true);
  };

  const handleUpdateCollectible = (updatedCollectible: Omit<Collectible, 'id' | 'userId'>) => {
    setCollectibles(collectibles.map((c) =>
      c.id === editingCollectible?.id
        ? { ...updatedCollectible, id: c.id, userId: c.userId }
        : c
    ));
    setShowCollectibleForm(false);
    setEditingCollectible(undefined);
  };

  const handleDeleteCollectible = (id: string) => {
    setCollectibles(collectibles.filter((c) => c.id !== id));
  };

  const handleAddGroup = (newGroup: Omit<Group, 'id' | 'userId'>) => {
    setGroups([
      ...groups,
      { ...newGroup, id: Date.now().toString(), userId: user!.id },
    ]);
    setShowGroupForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Collectibles Inventory</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowGroupForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <FolderPlus className="h-5 w-5 mr-2" />
                  New Group
                </button>
                <button
                  onClick={() => setShowCollectibleForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Collectible
                </button>
                <button
                  onClick={logout}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search collectibles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="block w-full sm:w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="">All Groups</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>

        {filteredCollectibles.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="mt-2 text-sm font-medium text-gray-900">No collectibles</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by adding a new collectible to your inventory.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setShowCollectibleForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Collectible
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCollectibles.map((collectible) => (
              <CollectibleCard
                key={collectible.id}
                collectible={collectible}
                onEdit={handleEditCollectible}
                onDelete={handleDeleteCollectible}
              />
            ))}
          </div>
        )}
      </main>

      {showCollectibleForm && (
        <CollectibleForm
          collectible={editingCollectible}
          groups={groups}
          onSubmit={editingCollectible ? handleUpdateCollectible : handleAddCollectible}
          onClose={() => {
            setShowCollectibleForm(false);
            setEditingCollectible(undefined);
          }}
        />
      )}

      {showGroupForm && (
        <GroupForm
          onSubmit={handleAddGroup}
          onClose={() => setShowGroupForm(false)}
        />
      )}
    </div>
  );
}

export default App;