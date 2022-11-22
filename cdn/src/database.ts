import mongoose from "mongoose";

export const connectDatabse = async () => {
    try {
        await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log("Database in port:", process.env.DATABASE);
    } catch (error) {
        console.log("error in database.ts/connectDatabse =>", error);
    }
};
