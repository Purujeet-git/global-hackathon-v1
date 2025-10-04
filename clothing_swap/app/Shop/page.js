'use client';
import React from 'react'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import { useState, useEffect } from 'react';

const Page = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        console.log("Fetched products:", data.products); // Debug log
        setProducts(data.products);
      } catch(error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center text-xl mt-10">Loading products...</p>;
  }

  if (!products || products.length === 0) {
    return <p className="text-center text-xl mt-10">No products found.</p>;
  }

  return (
    <div>
      <div className='bg-[url(/shopImage.jpg)] h-[45vh]'>
        <Navbar/>
      </div>
      <div className='bg-[#CA5310] pb-24'>
        <p className='text-5xl p-16 pb-5'>All Products</p>
        <div className='mx-16 mb-10 bg-[#691E06] h-0.5'></div>
        
        {/* ✅ Map over products array */}
        <div className='mx-16 flex flex-wrap gap-6'>
          {products.map((product) => (
            <ProductCard 
              key={product._id} 
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page