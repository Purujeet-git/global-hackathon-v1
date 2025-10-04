import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import Product from "@/models/Products";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";


export async function GET(req){
    try{
        await connectDB();

        const products = await Product.find({}).sort({createdAt:-1});

        return NextResponse.json({products});
    }catch(error){
        console.error("Error fetching products:",error);
        return NextResponse.json({error:"Internal Server Error"},{status:500});
    }
}


export async function POST(request) {

    const session = await getServerSession(authOptions);

    if(!session || !session.user?.email){
        return NextResponse.json({error:"Unauthorized:You must be a user to upload a product."},{status:401});
    }


    try {
        await connectDB();

        const formData = await request.formData();
        const name = formData.get('name');
        const price = formData.get('price');
        const age = formData.get('age');
        const description = formData.get('description');
        const images = formData.getAll('images');

        if (!name || !price || !age || !description || images.length === 0) {
            return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
        }

        const imageUrls = [];

        for (const imageFile of images) {
            const blob = await put(imageFile.name, imageFile, {
                access: 'public',
            });
            imageUrls.push(blob.url);
        }

        const newProduct = new Product({
            name,
            price,
            age,
            description,
            images: imageUrls,
            email:session.user.email,
        });

        await newProduct.save();

        return NextResponse.json({ message: "Product created successfully", product: newProduct }, { status: 201 });

    }catch(err){
        console.error("Error creating product:",err);
        return NextResponse.json({error:"Internal Server Error"},{status:500});
    }
}