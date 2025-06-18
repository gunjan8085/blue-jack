'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '@/lib/const';
import { Loader2 } from 'lucide-react';

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

const ServiceManager = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [currentService, setCurrentService] = useState<Service>({
    title: '',
    description: '',
    hashtags: '',
    tags: '',
    price: '',
    duration: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [createdServices, setCreatedServices] = useState<CreatedService[]>([]);
  const [allServices, setAllServices] = useState<CreatedService[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);

  const getBusinessId = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('businessProfile');
      if (stored) return JSON.parse(stored)._id;
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
        console.error('Failed to fetch services:', error);
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

  const addServiceToList = () => {
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
    if (!businessId) return;

    const newCreated: CreatedService[] = [];

    for (let service of services) {
      const formData = new FormData();
      if (service.image) formData.append('image', service.image);
      formData.append('title', service.title);
      formData.append('description', service.description);
      formData.append('hashtags', service.hashtags);
      formData.append('tags', service.tags);
      formData.append('price', service.price);
      formData.append('duration', service.duration);

      try {
        const res = await axios.post(`${API_URL}/service-categories/${businessId}/service-categories`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        newCreated.push(res.data.data.serviceCategories.at(-1));
      } catch (err) {
        console.error('Upload error:', err);
      }
    }

    setCreatedServices([...createdServices, ...newCreated]);
    setServices([]);
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-10">
      <section>
        <h2 className="text-3xl font-semibold mb-6 border-b pb-2">Create New Services</h2>
        <div className="grid gap-4">
          <input name="title" value={currentService.title} onChange={handleChange} placeholder="Service Title" className="input" />
          <textarea name="description" value={currentService.description} onChange={handleChange} placeholder="Description" className="input h-24" />
          <input name="hashtags" value={currentService.hashtags} onChange={handleChange} placeholder="Hashtags (comma separated)" className="input" />
          <input name="tags" value={currentService.tags} onChange={handleChange} placeholder="Tags (comma separated)" className="input" />
          <div className="flex gap-4">
            <input name="price" type="number" value={currentService.price} onChange={handleChange} placeholder="Price (₹)" className="input w-full" />
            <input name="duration" type="number" value={currentService.duration} onChange={handleChange} placeholder="Duration (min)" className="input w-full" />
          </div>
          <input type="file" onChange={handleFileChange} className="input" />
          <button onClick={addServiceToList} className="btn btn-blue w-fit self-start">
            Add to Queue
          </button>
        </div>
      </section>

      {services.length > 0 && (
        <section>
          <h3 className="text-xl font-medium mb-3">Queued Services</h3>
          <div className="space-y-3">
            {services.map((s, i) => (
              <div key={i} className="border rounded p-4 bg-gray-50">
                <p className="font-semibold">{s.title} — ₹{s.price} / {s.duration}min</p>
                <p className="text-sm text-gray-600">{s.description}</p>
              </div>
            ))}
            <button onClick={uploadServices} className="btn btn-green mt-3">
              {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
              {loading ? 'Uploading...' : 'Submit All'}
            </button>
          </div>
        </section>
      )}

      {createdServices.length > 0 && (
        <section>
          <h3 className="text-xl font-medium mb-3 text-green-600">Successfully Created</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {createdServices.map((s, i) => (
              <div key={i} className="bg-green-50 border border-green-200 p-4 rounded">
                <p className="font-semibold">{s.title} — ₹{s.price} / {s.duration}min</p>
                <p className="text-sm text-gray-700">{s.description}</p>
                {s.imageUrl && <img src={s.imageUrl} alt={s.title} className="mt-2 h-24 object-cover rounded" />}
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-semibold mb-4">All Services</h2>
        {fetchLoading ? (
          <p className="text-gray-500">Loading services...</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {allServices.map((s) => (
              <div key={s._id} className="border p-4 rounded bg-gray-50 hover:shadow-md transition">
                <h4 className="font-semibold">{s.title}</h4>
                <p className="text-sm text-gray-600">{s.description}</p>
                <p className="text-sm mt-1">₹{s.price} • {s.duration} min</p>
                {s.imageUrl && <img src={s.imageUrl} className="h-28 w-full object-cover rounded mt-2" />}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ServiceManager;
