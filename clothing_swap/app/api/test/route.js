import connectDB from "@/lib/mongo";

export async function  GET() {
    try{
        await connectDB();
        return Response.json({message:"MongoDB Created successfully"});

    }catch(error){
        return Response.json({error:"Failed to connect"},{status:500});
    }
}