import connectDB from "@/lib/mongo";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password, name } = await req.json();

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    return Response.json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
