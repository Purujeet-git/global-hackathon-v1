// File: app/api/products/[id]/route.js

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongo';
import Product from '@/models/Products';

export async function GET(request, { params }) {
  try {
    await connectDB();

    // Get the ID directly from the params object
    const { id } = params;

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ product });

  } catch (error) {
    console.error('Error fetching product:', error);
    if (error.kind === 'ObjectId') {
        return NextResponse.json({ error: 'Invalid product ID format' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}