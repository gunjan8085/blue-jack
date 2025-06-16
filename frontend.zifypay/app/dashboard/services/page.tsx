'use client'; // Required for interactivity in Next.js App Router

import React, { useState } from 'react';
import { Plus, Settings, Edit, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Service {
  id: number;
  name: string;
  description?: string;
  price: number;
  duration: string;
}

interface ServiceCategory {
  id: number;
  name: string;
  description: string;
  color: string;
  services: Service[];
}

const AddCategoryModal: React.FC<{
  onClose: () => void;
  onAdd: (category: { name: string; description: string; color: string }) => void;
}> = ({ onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#3B82F6');

  const colorOptions = [
    { value: '#3B82F6', name: 'Blue' },
    { value: '#10B981', name: 'Green' },
    { value: '#8B5CF6', name: 'Purple' },
    { value: '#F59E0B', name: 'Orange' },
    { value: '#EF4444', name: 'Red' },
    { value: '#6B7280', name: 'Gray' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd({ name, description, color });
      setName('');
      setDescription('');
      setColor('#3B82F6');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Add New Category</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <Label htmlFor="category-name">Category Name</Label>
            <Input
              id="category-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Web Development"
              required
            />
          </div>
          <div>
            <Label htmlFor="category-description">Description</Label>
            <Textarea
              id="category-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description..."
              rows={3}
            />
          </div>
          <div>
            <Label>Category Color</Label>
            <div className="grid grid-cols-6 gap-2 mt-2">
              {colorOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setColor(option.value)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    color === option.value ? 'border-gray-900' : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: option.value }}
                  title={option.name}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Add Category
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AddServiceModal: React.FC<{
  onClose: () => void;
  onAdd: (service: { name: string; description?: string; price: number; duration: string }) => void;
  categoryName: string;
}> = ({ onClose, onAdd, categoryName }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && price.trim() && duration.trim()) {
      onAdd({ name, description, price: parseFloat(price), duration });
      setName('');
      setDescription('');
      setPrice('');
      setDuration('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Add New Service</h2>
            <p className="text-sm text-gray-600 mt-1">to {categoryName}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <Label htmlFor="service-name">Service Name</Label>
            <Input
              id="service-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., SEO Audit"
              required
            />
          </div>
          <div>
            <Label htmlFor="service-description">Description</Label>
            <Textarea
              id="service-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Optional description..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="service-price">Price ($)</Label>
              <Input
                id="service-price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="500"
                required
              />
            </div>
            <div>
              <Label htmlFor="service-duration">Duration</Label>
              <Input
                id="service-duration"
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="1-2 weeks"
                required
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Add Service
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ServiceManagement = () => {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddService, setShowAddService] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const handleAddCategory = (category: Omit<ServiceCategory, 'id' | 'services'>) => {
    setCategories([...categories, { ...category, id: Date.now(), services: [] }]);
    setShowAddCategory(false);
  };

  const handleAddService = (service: Service) => {
    setCategories(categories.map(cat =>
      cat.id === selectedCategoryId
        ? { ...cat, services: [...cat.services, { ...service, id: Date.now() }] }
        : cat
    ));
    setShowAddService(false);
    setSelectedCategoryId(null);
  };

  const deleteCategory = (id: number) => setCategories(categories.filter(c => c.id !== id));
  const deleteService = (catId: number, svcId: number) =>
    setCategories(categories.map(cat =>
      cat.id === catId
        ? { ...cat, services: cat.services.filter(s => s.id !== svcId) }
        : cat
    ));

  const openServiceModal = (id: number) => {
    setSelectedCategoryId(id);
    setShowAddService(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Service Management</h1>
          <p className="text-gray-500">Create and manage your service offerings</p>
        </div>
        <Button onClick={() => setShowAddCategory(true)} className="bg-blue-600 text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Category
        </Button>
      </div>

      {/* Category Cards */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((cat) => (
          <Card key={cat.id}>
            <CardHeader>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  <CardTitle>{cat.name}</CardTitle>
                </div>
                <Button variant="ghost" size="icon" onClick={() => deleteCategory(cat.id)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
              <p className="text-sm text-gray-600">{cat.description}</p>
            </CardHeader>
            <CardContent>
              {cat.services.map((s) => (
                <div key={s.id} className="flex justify-between items-center mb-3">
                  <div>
                    <h4 className="font-medium">{s.name}</h4>
                    <div className="text-xs text-gray-600">
                      ${s.price} • {s.duration}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => deleteService(cat.id, s.id)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              ))}
              <Button onClick={() => openServiceModal(cat.id)} className="w-full mt-3" variant="outline">
                <Plus className="w-4 h-4 mr-2" /> Add Service
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          No categories yet. Start by adding your first one.
        </div>
      )}

      {/* Modals */}
      {showAddCategory && (
        <AddCategoryModal onClose={() => setShowAddCategory(false)} onAdd={handleAddCategory} />
      )}
      {showAddService && selectedCategoryId && (
        <AddServiceModal
          onClose={() => {
            setShowAddService(false);
            setSelectedCategoryId(null);
          }}
          onAdd={handleAddService}
          categoryName={categories.find((c) => c.id === selectedCategoryId)?.name || ''}
        />
      )}
    </div>
  );
};

export default ServiceManagement;
