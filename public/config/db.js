import mongoose from "mongoose";
import ENV from "./env.js";
const connectDB = async () => {
    try {
        const connection = await mongoose.connect(ENV.dbUrl, { dbName: ENV.dbName });
        console.log(`MongoDB connected To: ${connection.connection.host}`);
    }
    catch (error) {
        console.log("failed to connect to Database", error);
        process.exit(1);
    }
};
export default connectDB;
//# sourceMappingURL=db.js.map