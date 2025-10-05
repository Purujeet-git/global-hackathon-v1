// File: app/products/[id]/page.jsx

'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/app/components/Navbar';
import { FocusCardsDemo } from '@/app/components/FocusCardDemo';
import ChatBox from '@/app/components/ChatBox';
import { useSession } from 'next-auth/react';

export default function ProductDetailPage() {
  const [product, setProduct] = useState(null);
  // Renamed for clarity to distinguish from session loading
  const [productLoading, setProductLoading] = useState(true);
  const { data: session, status: sessionStatus } = useSession();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data.product);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        // Update the product-specific loading state
        setProductLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ✅ Create a single loading state that waits for both operations
  const isLoading = productLoading || sessionStatus === 'loading';

  // ✅ Use the combined loading state for the initial check
  if (isLoading) {
    return <p className="text-center text-xl mt-20">Loading...</p>;
  }

  if (!product) {
    return <p className="text-center text-xl mt-20">Product not found.</p>;
  }

  return (
    <div className='bg-[#CA5310]'>
      <Navbar />
      <FocusCardsDemo />
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Details Section */}
          <div className="text-[#FBBA72]">
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-3xl text-[#691E06] mb-6">₹{product.price}</p>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Details</h2>
              <p><span className="font-semibold">Age:</span> {product.age}</p>
              <p><span className="font-semibold">Owner:</span> {product.email}</p>
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2 font-serif">Description</h2>
              <p>{product.description}</p>
            </div>
            {/* Note: This button is now handled by the ChatBox */}
          </div>
          {/* ChatBox and Image Gallery Section */}
          <div>
            {/* The ChatBox will now correctly appear when ready */}
            {sessionStatus === 'authenticated' && (
              <ChatBox
                productId={product._id}
                ownerEmail={product.email}
                productName={product.name}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}