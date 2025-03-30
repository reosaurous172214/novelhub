import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://USERNAME:PASSWORD@cluster0.mongodb.net/novelhub?retryWrites=true&w=majority";

async function testConnection() {
    try {
        console.log("🟡 Connecting to MongoDB...");
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB Connection Successful!");
        mongoose.connection.close();
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error);
    }
}

testConnection();
