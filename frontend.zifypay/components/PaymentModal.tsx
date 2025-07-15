import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { API_URL } from '@/lib/const';
import qs from 'qs';

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  plan: any;
  businessId: string;
}

const initialForm = {
  cardNumber: '',
  expDate: '',
  cvv: '',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  state: '',
  zip: '',
};

export default function PaymentModal({ open, onClose, onSuccess, plan, businessId }: PaymentModalProps) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      // Generate batchId (YYYYMMDD) and tranNbr (random for MVP)
      const now = new Date();
      const batchId = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
      const tranNbr = Math.floor(100000 + Math.random() * 900000); // 6-digit random
      // Convert expDate from MMYY to YYMM
      let expDate = form.expDate;
      if (expDate.length === 4) {
        expDate = expDate.slice(2, 4) + expDate.slice(0, 2); // MMYY -> YYMM
      }
      // Build payload with camelCase keys
      const payload = {
        amount: Number(plan.price.replace(/[^\d.]/g, '')).toFixed(2),
        accountNbr: String(form.cardNumber),
        expDate: String(expDate),
        cvv2: String(form.cvv),
        firstName: String(form.firstName),
        lastName: String(form.lastName),
        address: String(form.address),
        city: String(form.city),
        state: String(form.state),
        zipCode: String(form.zip),
        batchId: String(batchId),
        tranNbr: String(tranNbr),
      };
      const encoded = qs.stringify(payload);
      const res = await fetch(`${API_URL}/payments/charge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encoded,
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Payment failed');
      }
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1200);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <Card className="w-full max-w-md p-6 relative">
        <CardContent>
          <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={onClose} disabled={loading}>&times;</button>
          <h2 className="text-2xl font-bold mb-4 text-center">Pay for {plan.name} Plan</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input name="cardNumber" type="text" placeholder="Card Number" value={form.cardNumber} onChange={handleChange} className="w-full border rounded px-3 py-2" required maxLength={19} />
            <div className="flex gap-2">
              <input name="expDate" type="text" placeholder="MMYY" value={form.expDate} onChange={handleChange} className="w-1/2 border rounded px-3 py-2" required maxLength={4} />
              <input name="cvv" type="text" placeholder="CVV" value={form.cvv} onChange={handleChange} className="w-1/2 border rounded px-3 py-2" required maxLength={4} />
            </div>
            <div className="flex gap-2">
              <input name="firstName" type="text" placeholder="First Name" value={form.firstName} onChange={handleChange} className="w-1/2 border rounded px-3 py-2" required />
              <input name="lastName" type="text" placeholder="Last Name" value={form.lastName} onChange={handleChange} className="w-1/2 border rounded px-3 py-2" required />
            </div>
            <input name="address" type="text" placeholder="Address" value={form.address} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
            <div className="flex gap-2">
              <input name="city" type="text" placeholder="City" value={form.city} onChange={handleChange} className="w-1/2 border rounded px-3 py-2" required />
              <input name="state" type="text" placeholder="State" value={form.state} onChange={handleChange} className="w-1/2 border rounded px-3 py-2" required />
            </div>
            <input name="zip" type="text" placeholder="Zip Code" value={form.zip} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            {success && <div className="text-green-600 text-sm text-center">Payment successful!</div>}
            <Button type="submit" className="w-full mt-2" disabled={loading}>{loading ? 'Processing...' : `Pay ${plan.price}`}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 