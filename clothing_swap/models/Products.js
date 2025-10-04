import mongoose,{Schema} from "mongoose";

const productSchema = new Schema(
    {
        name:{
            type:String,
            required:[true,"Product name is required."],
            trim:true,
        },
        price:{
            type:Number,
            required:[true,'Price is required.'],
        },
        age:{
            type:String,
            required:[true,'Product age is required'],
        },
        description:{
            type:String,
            required:[true,'Description is required'],
        },
        images:{
            type:[String],
            required:true,
            validate:[v => v.length > 0, 'At least one image is required.'],
        },
        email:{
            type:String,
            required:[true,'User email is required'],
        },
    },
    {timestamps:true}
);

const Product = mongoose.models.Product || mongoose.model('Product',productSchema);

export default Product;