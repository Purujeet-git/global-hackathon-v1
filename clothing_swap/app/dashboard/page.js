// components/ProductUploadForm.jsx

'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import { ShootingStars } from '../components/ui/ShootingStars';
import { StarsBackground } from '../components/ui/StarsBackground';

export default function ProductUploadForm() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files.map(file => file.name));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsUploading(true);
    setMessage('');

    const formData = new FormData(event.currentTarget);
    
    const imageInput = event.currentTarget.querySelector('input[type="file"]');
    if (!imageInput.files || imageInput.files.length === 0) {
      setMessage('Please select at least one image.');
      setIsUploading(false);
      return;
    }

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong');
      }
      
      setMessage(`Success! Product "${result.product.name}" created.`);
      event.target.reset(); // Clear the form
      setSelectedFiles([]); // Clear the file list on success

    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    // Set up the main container for stacking
    <div className="relative min-h-screen">
      {/* 1. Render background elements first (bottom layer) */}
      <ShootingStars />
      <StarsBackground />

      {/* 2. Render content on top of the background */}
      <div className="relative z-10">
        <Navbar />
        <div className="max-w-xl my-10 mx-auto p-8 bg-[#BB4D00]  rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Upload New Product</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
              <input type="text" name="name" id="name" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (₹)</label>
              <input type="number" name="price" id="price" step="0.01" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
            </div>
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">How old is the product?</label>
              <input type="text" name="age" id="age" placeholder="e.g., 2 months" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea name="description" id="description" rows="4" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"></textarea>
            </div>
            <div>
              <label htmlFor="images" className="block text-sm font-medium text-gray-700">Product Images</label>
              <input 
                type="file" 
                name="images" 
                id="images" 
                required 
                multiple 
                onChange={handleFileChange} 
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
              />
            </div>

            {selectedFiles.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700">Selected files:</p>
                <ul className="list-disc list-inside bg-gray-50 p-3 rounded-md border">
                  {selectedFiles.map((fileName, index) => (
                    <li key={index} className="text-sm text-gray-600 truncate">{fileName}</li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <button type="submit" disabled={isUploading} className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400">
                {isUploading ? 'Uploading...' : 'Upload Product'}
              </button>
            </div>
          </form>
          {message && <p className={`mt-4 text-sm ${message.startsWith('Error') ? 'text-red-600' : 'text-green-600'}`}>{message}</p>}
        </div>
      </div>
    </div>
  );
}