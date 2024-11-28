import mongoose from 'mongoose';

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connect successfully');
  } catch (error) {
    console.log('Connect Failed');
  }
}
export default connect;