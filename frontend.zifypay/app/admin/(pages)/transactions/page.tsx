"use client";
import React, { useEffect, useState } from 'react';
import { API_URL } from '@/lib/const';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface Transaction {
  _id: string;
  tranNbr: string;
  batchId: string;
  amount: number;
  accountNbr: string;
  expDate: string;
  status: string;
  responseCode?: string;
  responseMessage?: string;
  createdAt: string;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_URL}/payments/transactions`);
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Failed to fetch transactions');
        }
        setTransactions(data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen rounded-br-4xl">
      {error && (
        <div className="mb-4 p-4 bg-red-900/50 border border-red-700 text-red-200 rounded-lg">
          {error}
          <button onClick={() => setError(null)} className="float-right text-red-400 hover:text-red-200">×</button>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">Transactions</h2>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <ArrowPathIcon className="w-8 h-8 animate-spin mx-auto text-blue-400" />
          <p className="mt-2 text-blue-200">Loading transactions...</p>
        </div>
      ) : (
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-gray-700">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                {['Date', 'Amount', 'Status', 'Card', 'Batch ID', 'Transaction #', 'Response'].map((head) => (
                  <th
                    key={head}
                    className="px-6 py-4 text-left text-sm font-medium text-blue-300 uppercase tracking-wider"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {transactions.map((tx) => (
                <tr key={tx._id} className="hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 text-white">{new Date(tx.createdAt).toLocaleString()}</td>
                  <td className="px-6 py-4 text-white">${tx.amount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                      tx.status === 'success'
                        ? 'bg-green-900/50 text-green-300 border border-green-700'
                        : 'bg-red-900/50 text-red-300 border border-red-700'
                    }`}>
                      {tx.status === 'success' ? 'Success' : 'Failed'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{tx.accountNbr}</td>
                  <td className="px-6 py-4 text-gray-300">{tx.batchId}</td>
                  <td className="px-6 py-4 text-gray-300">{tx.tranNbr}</td>
                  <td className="px-6 py-4 text-gray-300">{tx.responseMessage || tx.responseCode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
