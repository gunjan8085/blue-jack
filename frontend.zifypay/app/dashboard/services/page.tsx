'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '@/lib/const';
import { ImageIcon, Upload, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface Service {
  title: string;
  description: string;
  hashtags: string;
  tags: string;
  price: string;
  duration: string;
  image: File | null;
}

interface CreatedService {
  _id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  imageUrl?: string;
  [key: string]: any;
}

const ServiceManagerPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [createdServices, setCreatedServices] = useState<CreatedService[]>([]);
  const [allServices, setAllServices] = useState<CreatedService[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [currentService, setCurrentService] = useState<Service>({
    title: '',
    description: '',
    hashtags: '',
    tags: '',
    price: '',
    duration: '',
    image: null,
  });

  const getBusinessId = () => {
    if (typeof window !== 'undefined') {
      const profile = localStorage.getItem('businessProfile');
      if (profile) return JSON.parse(profile)?._id;
    }
    return null;
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const businessId = getBusinessId();
        if (!businessId) return;
        const res = await axios.get(`${API_URL}/service-categories/${businessId}/service-categories`);
        setAllServices(res.data.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setFetchLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentService({ ...currentService, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCurrentService({ ...currentService, image: e.target.files[0] });
    }
  };

  const addToQueue = () => {
    setServices([...services, currentService]);
    setCurrentService({
      title: '',
      description: '',
      hashtags: '',
      tags: '',
      price: '',
      duration: '',
      image: null,
    });
  };

  const uploadServices = async () => {
    setLoading(true);
    const businessId = getBusinessId();
    const newCreated: CreatedService[] = [];

    for (const s of services) {
      const formData = new FormData();
      if (s.image) formData.append('image', s.image);
      formData.append('title', s.title);
      formData.append('description', s.description);
      formData.append('hashtags', s.hashtags);
      formData.append('tags', s.tags);
      formData.append('price', s.price);
      formData.append('duration', s.duration);

      try {
        const res = await axios.post(`${API_URL}/service-categories/${businessId}/service-categories`, formData);
        newCreated.push(res.data.data.serviceCategories.at(-1));
      } catch (err) {
        console.error('Upload failed:', err);
      }
    }

    setCreatedServices([...createdServices, ...newCreated]);
    setServices([]);
    setLoading(false);
  };

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-purple-800">Service Manager</h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <Input name="title" placeholder="Title" value={currentService.title} onChange={handleChange} />
          <Input name="price" type="number" placeholder="Price" value={currentService.price} onChange={handleChange} />
          <Textarea name="description" placeholder="Description" value={currentService.description} onChange={handleChange} />
          <Input name="duration" type="number" placeholder="Duration (in min)" value={currentService.duration} onChange={handleChange} />
          <Input name="hashtags" placeholder="Hashtags (comma separated)" value={currentService.hashtags} onChange={handleChange} />
          <Input name="tags" placeholder="Tags (comma separated)" value={currentService.tags} onChange={handleChange} />
          <Input type="file" onChange={handleFileChange} />
        </div>

        <div className="mt-4 flex gap-4">
          <Button onClick={addToQueue} className="bg-purple-700 hover:bg-purple-800">
            Add to Queue
          </Button>
          {services.length > 0 && (
            <Button onClick={uploadServices} className="bg-green-600 hover:bg-green-700">
              {loading ? <Loader2 className="animate-spin" /> : 'Upload All'}
            </Button>
          )}
        </div>
      </div>

      {services.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Queued Services</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {services.map((s, i) => (
              <div key={i} className="p-4 bg-gray-100 rounded shadow">
                <h4 className="font-semibold">{s.title}</h4>
                <p>{s.description}</p>
                <p className="text-sm">₹{s.price} / {s.duration}min</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {createdServices.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2 text-green-800">Successfully Created</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {createdServices.map((s, i) => (
              <div key={i} className="p-4 bg-green-100 rounded">
                <h4 className="font-semibold">{s.title}</h4>
                <p>{s.description}</p>
                <p>₹{s.price} / {s.duration}min</p>
                {s.imageUrl && <img src={s.imageUrl} alt="Service" className="rounded mt-2 h-24 object-cover" />}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">All Existing Services</h2>
        {fetchLoading ? (
          <p>Loading services...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {allServices.map((s) => (
              <div key={s._id} className="bg-white p-4 rounded shadow-sm hover:shadow-md transition">
                <h4 className="font-semibold text-lg">{s.title}</h4>
                <p className="text-sm text-gray-600">{s.description}</p>
                <p className="text-sm mt-1">₹{s.price} • {s.duration} min</p>
                {s.imageUrl && <img src={s.imageUrl} alt="Service" className="w-full h-32 object-cover mt-2 rounded" />}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default ServiceManagerPage;
