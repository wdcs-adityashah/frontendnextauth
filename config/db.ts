import mongoose from 'mongoose';

const connectDB = async ():Promise<void> => {
     try {
      const mongoUri = process.env.MONGO_URI as string;
      if (!mongoUri) {
          throw new Error("MongoDB connection URI is not defined in environment variables");
      }

      await mongoose.connect(mongoUri);
      console.log('Successfully connected to mongoDB');

     } catch (error:any) {
        console.error(`Error:${error.message}`);
        process.exit(1);
     }
}

export default connectDB;