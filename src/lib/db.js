
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, enum: ['upcoming', 'registered', 'completed'], default: 'upcoming' },
  participants: { type: Number, default: 0 },
  maxParticipants: { type: Number, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
  organizer: { type: String, required: true },
  tags: [{ type: String }],
});

const ClubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  members: { type: Number, default: 0 },
  events: { type: Number, default: 0 },
  successRate: { type: String },
  image: { type: String, required: true },
});

const CategorySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  label: { type: String, required: true },
  color: { type: String, required: true },
});

export const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);
export const Club = mongoose.models.Club || mongoose.model('Club', ClubSchema);
export const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

export default dbConnect;
