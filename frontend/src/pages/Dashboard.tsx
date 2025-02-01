import React, { useState, useEffect } from 'react';
import { accountService } from '../services/api';
import { RefreshCw, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';

export const Dashboard = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchBalance = async () => {
    try {
      setLoading(true);
      const response = await accountService.getBalance();
      setBalance(response.data.balance);
    } catch (error) {
      toast.error('Failed to fetch balance');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Account Balance</h2>
            <button
              onClick={fetchBalance}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">Current Balance</p>
                {loading ? (
                  <div className="animate-pulse h-8 w-32 bg-gray-200 rounded"></div>
                ) : (
                  <p className="text-3xl font-bold text-gray-900">
                    ${balance?.toFixed(2)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};