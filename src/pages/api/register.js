import connectDB from "@/lib/dbConnect";
import User from "@/lib/models/user";
import bcrypt from 'bcryptjs';


export default async function POST(req, res) {
    try {
        const { name, email, password, accountType } = await req.body;
        console.log(name, email, password, accountType);

        await connectDB();
        const existingUser = await User.findOne({ email:email });
        if (existingUser) {
            return res.status(409).json({ message: "Username already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const user = await User.create({name, email, password: hashedPassword, accountType:accountType });

        return res.status(201).json({ message: "User Registered", user });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
