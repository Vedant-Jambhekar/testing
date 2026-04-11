import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', ()=> console.log('Database connected'))
        const con = await mongoose.connect(`${process.env.MONGODB_URI}/pingup`)
        console.log('Success: Database connected.')
    } catch (error) {
        console.log("Error: ",error.message)
        process.exit(1);
    }
}

export default connectDB