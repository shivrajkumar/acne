'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const OrderSummary = () => {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    // Simulating static data for now
    const staticData = {
      doctor: {
        name: 'Dr. Aditi Sharma',
        qualification: 'MBBS, MD - Dermatology',
        experience: '10+ years experience',
        tagline: 'Expert in Skin & Hair Treatments',
        image: '/doctor-image.jpg', // Make sure this image exists in your public folder
      },
      products: [
        { name: 'Acne Face Wash', price: '299' },
        { name: 'Skin Repair Serum', price: 'FREE' },
        { name: 'SPF 50 Sunscreen', price: '499' },
      ],
      subtotal: 798,
      shipping: 'FREE',
      total: 798,
    };

    // Simulate async load
    setTimeout(() => {
      setOrderData(staticData);
      setLoading(false);
    }, 500);

    // ❌ Uncomment below when API is ready
    /*
    const fetchData = async () => {
      try {
        const res = await fetch('/api/order-summary'); 
        const data = await res.json();
        setOrderData(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching order data:', err);
        setLoading(false);
      }
    };

    fetchData();
    */
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!orderData) return <p className="text-center py-10 text-red-500">Failed to load order summary.</p>;

  const { doctor, products, subtotal, shipping, total } = orderData;

  return (
    <div className="bg-white p-4 rounded-lg w-full max-w-md mx-auto border border-[#E3E3E2]">
      <h2 className="text-lg font-semibold mb-4">
        {isMobile ? 'Order Summary' : 'Your Order Summary'}
      </h2>

      {isMobile && doctor && (
        <div className="flex items-start gap-4 mb-4">
          <Image
            src={doctor.image}
            alt="Doctor"
            width={64}
            height={64}
            className="w-16 h-16 rounded-md object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-sm">{doctor.name}</h3>
            <p className="text-xs text-gray-600">{doctor.qualification}</p>
            <p className="text-xs text-gray-500">{doctor.experience}</p>
            <div className="mt-1 inline-block px-2 py-[2px] text-xs bg-green-100 text-green-700 rounded-md">
              {doctor.tagline}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {products.map((product, index) => (
          <div className="flex justify-between text-sm" key={index}>
            <span>{product.name}</span>
            <span className={`${product.price === 'FREE' ? 'bg-[#19785D] text-white px-4 py-1 rounded-lg' : ''}`}>
              {product.price === 'FREE' ? product.price : `₹${parseFloat(product.price).toFixed(2)}`}
            </span>
          </div>
        ))}
      </div>

      <hr className="my-4" />

      <div className="flex justify-between text-sm mb-1">
        <span>Subtotal ({products.length} {products.length > 1 ? 'items' : 'item'})</span>
        <span>₹{parseFloat(subtotal).toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-sm mb-1">
        <span>Shipping</span>
        <span className="bg-[#19785D] text-white px-4 py-1 rounded-lg">{shipping}</span>
      </div>

      <div className="flex justify-between font-semibold text-base mt-2">
        <span>Total (pre-tax)</span>
        <span>₹{parseFloat(total).toFixed(2)}</span>
      </div>

      <p className="text-xs text-gray-500 mt-3">
        No additional duties and taxes collected upon delivery.
      </p>
    </div>
  );
};

export default OrderSummary;
