'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { API_URL } from '@/lib/const';
import AppSidebar from '@/components/for-bussiness/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'For individual owners starting out.',
    features: ['Up to 100 appointments/month', 'Basic analytics', 'Email support'],
    pricingPlanId: '686f9df74f83f7961e538f2a',
  },
  {
    name: 'Pro',
    price: '$49',
    description: 'For growing businesses.',
    features: ['Up to 1,000 appointments/month', 'Advanced analytics', 'Priority email support', 'Custom branding'],
    pricingPlanId: '686f9e944f83f7961e538f2c',
  },
  {
    name: 'Premium',
    price: '$999',
    description: 'For enterprises and unlimited scale.',
    features: ['Unlimited appointments', 'Dedicated success manager', 'Full API access', '24/7 support'],
    pricingPlanId: '686d2fe6473d6f4e912f032d',
  },
];

export default function DashboardSubscriptionPlans() {
  const router = useRouter();
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  useEffect(() => {
    const business = localStorage.getItem('businessProfile');
    if (business) {
      try {
        const parsed = JSON.parse(business);
        setBusinessId(parsed._id);
      } catch (error) {
        console.error('Invalid business profile in localStorage:', error);
      }
    } else {
      router.push('/');
    }
  }, [router]);

  async function handlePurchase(pricingPlanId: string) {
    try {
      if (!businessId) throw new Error("Missing business ID");

      setLoadingPlan(pricingPlanId);
      const res = await fetch(`${API_URL}/business/purchase-subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ businessId, pricingPlanId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong!');
      
      alert(`✅ Subscription successful`);
      router.push('/dashboard');
    } catch (err: any) {
      console.error(err);
      alert(`❌ Error: ${err.message}`);
    } finally {
      setLoadingPlan(null);
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main content */}
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-8">Choose Your Plan</h1>
            <p className="text-center text-muted-foreground mb-12">Simple pricing to grow with your business.</p>

            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedPlan(plan.pricingPlanId)}
                  className={`cursor-pointer transform transition-transform hover:scale-[1.03] ${
                    selectedPlan === plan.pricingPlanId ? 'scale-[1.05]' : ''
                  }`}
                >
                  <Card
                    className={`flex flex-col justify-between shadow-xl rounded-2xl border-2 transition-all ${
                      selectedPlan === plan.pricingPlanId
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
                      <p className="text-3xl font-bold mb-4">{plan.price}</p>
                      <p className="text-muted-foreground mb-4">{plan.description}</p>
                      <ul className="space-y-2 mb-6 text-sm">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2">
                            ✅ {feature}
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePurchase(plan.pricingPlanId);
                        }}
                        disabled={loadingPlan === plan.pricingPlanId}
                      >
                        {loadingPlan === plan.pricingPlanId
                          ? 'Processing...'
                          : selectedPlan === plan.pricingPlanId
                          ? 'Selected'
                          : 'Select Plan'}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
