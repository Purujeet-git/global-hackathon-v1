import { NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import Product from "@/models/Products";


export async function GET(request,{params}){
    try{
        await connectDB();

        const {id} = params;
        const product = await Product.findById(id);

        if(!product){
            return NextResponse.json({error:"Product not Found"},{status:404});
        }

        return NextResponse.json({product});
    }catch(error){
        console.error("Error Fetching product:", error);

        if(error.kind === 'ObjectId'){
            return NextResponse.json({error:'Invalid product ID format'},{status:400});
        }
        return NextResponse.json({error:"Internal Server Error"},{status:500});
    }
}