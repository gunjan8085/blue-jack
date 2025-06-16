'use client'; // Required for interactivity in Next.js App Router

import React, { useState } from 'react';
import { Plus, Settings, Edit, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Service {
  id: string;
  name: string;
  serviceType: string;
  category: string;
  description?: string;
  price: {
    priceType: string;
    amount: number;
  };
  duration: number;
  teamMembers: string[];
  resourcesRequired: boolean;
  availableFor: string;
  isOnline: boolean;
  status: string;
  rebookReminderAfter: {
    count: number;
    period: string;
  };
  costOfService: number;
}

interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  services: Service[];
}

const AddCategoryModal: React.FC<{
  onClose: () => void;
  onAdd: (category: { name: string; description: string; color: string }) => void;
  isLoading?: boolean;
}> = ({ onClose, onAdd, isLoading = false }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#3B82F6');
  const [error, setError] = useState<string | null>(null);

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
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Adding...' : 'Add Category'}
            </Button>
          </div>
          {error && (
            <div className="text-red-500 text-sm mt-2">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

const AddServiceDialog: React.FC<{
  onAdd: (service: {
    name: string;
    description?: string;
    price: number;
    duration: string;
  }, categoryId: string) => void;
  categoryName: string;
  categoryId: string;
}> = ({ onAdd, categoryName, categoryId }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && price.trim() && duration.trim()) {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        // Convert duration from string (e.g., "1-2 weeks") to minutes
        const durationInMinutes = parseInt(duration) * 60; // Assuming duration is in hours

        const serviceData = {
          name,
          serviceType: "project",
          category: categoryId,
          description,
          price: {
            priceType: "fixed",
            amount: parseFloat(price)
          },
          duration: durationInMinutes,
          teamMembers: [],
          resourcesRequired: false,
          availableFor: "all",
          isOnline: true,
          status: "active",
          rebookReminderAfter: {
            count: 3,
            period: "weeks"
          },
          costOfService: parseFloat(price) * 0.8 // Assuming 20% margin
        };

        console.log('Sending service data:', serviceData);

        const response = await fetch('http://localhost:5001/api/v1/catalog/services', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(serviceData)
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to create service');
        }

        const data = await response.json();
        onAdd({ name, description, price: parseFloat(price), duration }, categoryId);
        setName('');
        setDescription('');
        setPrice('');
        setDuration('');
        setOpen(false);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to create service';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full mt-3" variant="outline">
          <Plus className="w-4 h-4 mr-2" /> Add Service
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Service</DialogTitle>
          <DialogDescription>
            Add a new service to {categoryName}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="service-name">Service Name</Label>
            <Input
              id="service-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., SEO Audit"
              required
              disabled={isLoading}
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
              disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="service-duration">Duration (hours)</Label>
              <Input
                id="service-duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="2"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Adding...' : 'Add Service'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const ServiceManagement = () => {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    console.log('Fetching categories...');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('http://localhost:5001/api/v1/catalog/categories', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Categories API Response status:', response.status);
      const responseData = await response.json();
      console.log('Categories API Response data:', responseData);

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to fetch categories');
      }

      // Handle the response data structure properly
      const categoriesData = Array.isArray(responseData) ? responseData : 
                           responseData.data ? responseData.data : 
                           [];
      
      console.log('Transformed categories data:', categoriesData);
      
      // Transform the API response to match our ServiceCategory interface
      const transformedCategories = categoriesData.map((cat: any) => ({
        id: cat.id,
        name: cat.name,
        description: cat.description,
        color: cat.appointmentColor,
        services: cat.services || []
      }));
      console.log('Setting categories state with:', transformedCategories);
      setCategories(transformedCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch categories';
      setError(errorMessage);
    }
  };

  // Fetch categories when component mounts
  React.useEffect(() => {
    fetchCategories();
  }, []);

  const createCategory = async (categoryData: { name: string; description: string; color: string }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('http://localhost:5001/api/v1/catalog/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: categoryData.name,
          description: categoryData.description,
          appointmentColor: categoryData.color,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create category');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  };

  const handleAddCategory = async (category: Omit<ServiceCategory, 'id' | 'services'>) => {
    setIsLoading(true);
    try {
      const response = await createCategory(category);
      setCategories([...categories, { ...category, id: response.id, services: [] }]);
      setShowAddCategory(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create category';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddService = async (service: { name: string; description?: string; price: number; duration: string }, categoryId: string) => {
    console.log('Starting service creation with:', service);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Convert duration from string (e.g., "1-2 weeks") to minutes
      const durationInMinutes = parseInt(service.duration) * 60; // Assuming duration is in hours

      const payload = {
        name: service.name,
        serviceType: "project",
        category: categoryId,
        description: service.description,
        price: {
          priceType: "fixed",
          amount: service.price
        },
        duration: durationInMinutes,
        teamMembers: [],
        resourcesRequired: false,
        availableFor: "all",
        isOnline: true,
        status: "active",
        rebookReminderAfter: {
          count: 3,
          period: "weeks"
        },
        costOfService: service.price * 0.8 // Assuming 20% margin
      };

      console.log('Sending payload to API:', payload);

      const response = await fetch('http://localhost:5001/api/v1/catalog/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      console.log('API Response status:', response.status);
      const responseData = await response.json();
      console.log('API Response data:', responseData);

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to create service');
      }

      // Refresh the categories list to show the new service
      console.log('Refreshing categories...');
      await fetchCategories();
      console.log('Categories refreshed');
      
      setShowAddCategory(false);
    } catch (error) {
      console.error('Error creating service:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to create service';
      setError(errorMessage);
    }
  };

  const deleteCategory = (id: string) => setCategories(categories.filter(c => c.id !== id));
  const deleteService = (catId: string, svcId: string) =>
    setCategories(categories.map(cat =>
      cat.id === catId
        ? { ...cat, services: cat.services.filter(s => s.id !== svcId) }
        : cat
    ));

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

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Category Cards */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {isLoading ? (
          <div className="col-span-full text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading categories...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-12">
            No categories yet. Start by adding your first one.
          </div>
        ) : (
          categories.map((cat) => (
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
                        ${s.price.amount} • {Math.floor(s.duration / 60)} hours
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => deleteService(cat.id, s.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
                <AddServiceDialog
                  onAdd={handleAddService}
                  categoryName={cat.name}
                  categoryId={cat.id}
                />
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Category Modal */}
      {showAddCategory && (
        <AddCategoryModal 
          onClose={() => setShowAddCategory(false)} 
          onAdd={handleAddCategory}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default ServiceManagement;
