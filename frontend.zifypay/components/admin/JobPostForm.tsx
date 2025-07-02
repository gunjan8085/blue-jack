"use client";
import { useState } from "react";

export default function AdminPostJobForm() {
  const [form, setForm] = useState({
    title: "",
    department: "",
    location: "",
    type: "Full-Time",
    description: "",
    qualifications: "",
    responsibilities: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    const res = await fetch("/api/v1/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        qualifications: form.qualifications.split(",").map((q) => q.trim()),
        responsibilities: form.responsibilities.split(",").map((r) => r.trim()),
      }),
    });
    if (res.ok) setSuccess(true);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Post New Job</h2>
      {success && <p className="text-green-600">Job posted successfully!</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Job Title" className="w-full p-2 border" onChange={handleChange} required />
        <input name="department" placeholder="Department" className="w-full p-2 border" onChange={handleChange} />
        <input name="location" placeholder="Location" className="w-full p-2 border" onChange={handleChange} />
        <select name="type" className="w-full p-2 border" onChange={handleChange}>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>
        <textarea name="description" placeholder="Job Description" className="w-full p-2 border" onChange={handleChange}></textarea>
        <textarea name="qualifications" placeholder="Qualifications (comma-separated)" className="w-full p-2 border" onChange={handleChange}></textarea>
        <textarea name="responsibilities" placeholder="Responsibilities (comma-separated)" className="w-full p-2 border" onChange={handleChange}></textarea>
        <button className="bg-green-600 text-white px-4 py-2">Post Job</button>
      </form>
    </div>
  );
}

