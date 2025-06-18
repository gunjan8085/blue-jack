'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '@/lib/const';

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
    image: null
  });
  const [loading, setLoading] = useState(false);
  const [createdServices, setCreatedServices] = useState<CreatedService[]>([]);
  const [allServices, setAllServices] = useState<CreatedService[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);

  // Get business ID from localStorage
  const getBusinessId = () => {
    if (typeof window !== 'undefined') {
      const businessProfile = localStorage.getItem('businessProfile')
      if (businessProfile) {
        const parsed = JSON.parse(businessProfile)
        return parsed._id
      }
    }
    return null
  };

  // Fetch existing services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const businessId = getBusinessId();
        if (!businessId) {
          console.error('Business profile not found');
          return;
        }
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
      image: null
    });
  };

  const uploadServices = async () => {
    setLoading(true);
    const newCreated: CreatedService[] = [];
    const businessId = getBusinessId();
    
    if (!businessId) {
      console.error('Business profile not found');
      setLoading(false);
      return;
    }

    for (let service of services) {
      const formData = new FormData();
      if (service.image) {
        formData.append('image', service.image);
      }
      formData.append('title', service.title);
      formData.append('description', service.description);
      formData.append('hashtags', service.hashtags);
      formData.append('tags', service.tags);
      formData.append('price', service.price);
      formData.append('duration', service.duration);

      try {
        const res = await axios.post(
          `${API_URL}/service-categories/${businessId}/service-categories`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        newCreated.push(res.data.data.serviceCategories.at(-1));
      } catch (error) {
        console.error('Upload error:', error);
      }
    }
    setCreatedServices([...createdServices, ...newCreated]);
    setServices([]);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Services</h2>
      <div className="grid gap-3">
        <input name="title" value={currentService.title} onChange={handleChange} placeholder="Title" className="border p-2 rounded" />
        <textarea name="description" value={currentService.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded" />
        <input name="hashtags" value={currentService.hashtags} onChange={handleChange} placeholder="Hashtags (comma separated)" className="border p-2 rounded" />
        <input name="tags" value={currentService.tags} onChange={handleChange} placeholder="Tags (comma separated)" className="border p-2 rounded" />
        <input name="price" type="number" value={currentService.price} onChange={handleChange} placeholder="Price" className="border p-2 rounded" />
        <input name="duration" type="number" value={currentService.duration} onChange={handleChange} placeholder="Duration (in minutes)" className="border p-2 rounded" />
        <input type="file" onChange={handleFileChange} className="border p-2 rounded" />
        <button onClick={addServiceToList} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Add to List
        </button>
      </div>

      {services.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Queued Services:</h3>
          {services.map((s: Service, i: number) => (
            <div key={i} className="border p-3 my-2 rounded bg-gray-50">
              <p><strong>{s.title}</strong> — ₹{s.price} / {s.duration}min</p>
              <p>{s.description}</p>
            </div>
          ))}
          <button onClick={uploadServices} className="bg-green-600 text-white px-4 py-2 mt-2 rounded hover:bg-green-700 transition">
            {loading ? 'Uploading...' : 'Submit All'}
          </button>
        </div>
      )}

      {createdServices.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold">Created Services</h3>
          {createdServices.map((s: CreatedService, i: number) => (
            <div key={i} className="border p-3 my-2 bg-green-100 rounded">
              <p><strong>{s.title}</strong> — ₹{s.price} / {s.duration}min</p>
              <p>{s.description}</p>
              {s.imageUrl && <img src={s.imageUrl} alt="service" className="h-24 mt-2 rounded" />}
            </div>
          ))}
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">All Existing Services</h2>
        {fetchLoading ? (
          <p>Loading existing services...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {allServices.map((s: CreatedService) => (
              <div key={s._id} className="border p-4 rounded shadow-sm bg-gray-50 hover:shadow-md transition">
                <h4 className="font-semibold text-lg">{s.title || 'Untitled Service'}</h4>
                {s.description && <p className="text-sm text-gray-700">{s.description}</p>}
                {(s.price || s.duration) && (
                  <p className="mt-1 text-sm">₹{s.price || 'N/A'} • {s.duration || 'N/A'} min</p>
                )}
                {s.imageUrl && (
                  <img src={s.imageUrl} alt="service" className="w-full h-32 object-cover mt-2 rounded" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceManager;
