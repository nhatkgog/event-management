
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

async function connectWithRetry(uri, opts, retries = 5, backoff = 2000) {
    try {
        return await mongoose.connect(uri, opts);
    } catch (err) {
        if (retries <= 0) throw err;
        console.warn(
            `MongoDB connection failed. Retrying in ${backoff}ms... (${retries} left)`
        );
        await new Promise((r) => setTimeout(r, backoff));
        return connectWithRetry(uri, opts, retries - 1, backoff * 2);
    }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
      const opts = {
          bufferCommands: false,    // don’t queue model ops when disconnected
          serverSelectionTimeoutMS: 5000, // fail fast on initial connect
      };

      // Kick off the connection with retry logic
      cached.promise = connectWithRetry(MONGODB_URI, opts);

      // Once connected, keep a reference on `cached.conn`
      cached.promise = cached.promise.then((mongooseInstance) => {
          mongooseInstance.connection.on("error", (err) => {
              console.error("MongoDB error event:", err);
          });
          mongooseInstance.connection.on("disconnected", () => {
              console.warn("MongoDB disconnected. Will not buffer commands.");
          });
          return mongooseInstance;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// --- Định nghĩa Schema ---
const RoleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
}, { timestamps: true });

const UserSchema = new mongoose.Schema({
    clerkUserId:  { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // passwordHash: { type: Buffer, required: true },
    roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
    isActive: { type: Boolean, default: false },
    studentCode: { type: String, unique: true, sparse: true }
}, { timestamps: true });

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: String
}, { timestamps: true });

const ClubSchema = new mongoose.Schema({
    name:        { type: String, required: true, unique: true },
    description: String,
    imageUrl: { type: String },
    // Users who can create/manage events for this club
    organizerIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    // Optional: all members of the club
    memberIds:    [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

const ClubMembershipSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    clubId: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true },
    role:   { type: String, enum: ['member','organizer','admin'], default: 'member' },
}, { timestamps: true });

ClubMembershipSchema.index({ userId:1, clubId:1 }, { unique: true });

const EventSchema = new mongoose.Schema({
    clubId:      { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true },
    organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: String,
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    location: String,
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
    status: {
        type: String,
        enum: ['Draft', 'Open', 'Closed', 'Cancelled'],
        default: 'Draft'
    },
    capacity: { type: Number, min: 0 },
    isDeleted: { type: Boolean, default: false },

    imageUrl: { type: String },           // link ảnh sự kiện
    surveyLink: { type: String }          // link Google Form khảo sát
}, { timestamps: true });

EventSchema.pre('save', function (next) {
    if (this.startAt >= this.endAt) {
        return next(new Error("StartAt must be earlier than EndAt"));
    }
    next();
});

const RegistrationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    status: {
        type: String,
        enum: ['Registered', 'Cancelled', 'Attended', 'NoShow'],
        default: 'Registered'
    },
    registeredAt: { type: Date, default: Date.now },
    cancelledAt: Date,
    attendedAt: Date,
    isCheckedIn: { type: Boolean, default: false },
    isCheckedOut: { type: Boolean, default: false },
    notes: String
}, { timestamps: true });

RegistrationSchema.index({ userId: 1, eventId: 1 }, { unique: true });

const NotificationSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    title: { type: String, required: true },
    content: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    sentAt: Date,
    metadata: mongoose.Schema.Types.Mixed
}, { timestamps: true });

NotificationSchema.index({ receiverId: 1 });

// ---------------- Schedule Schema ----------------
const ScheduleSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    title: { type: String, required: true, maxlength: 255 },
    // Option A: full JS Date
    // time: { type: Date, required: true },

    // Option B: time-only string (e.g. "08:30" or "08:30–10:00")
    time: { type: String, required: true, maxlength: 50, match: /^([01]\d|2[0-3]):([0-5]\d)(–([01]\d|2[0-3]):([0-5]\d))?$/ }
}, { timestamps: true });

// ————— GUARD & EXPORT MODELS —————
// In dev, Next.js hot‐reload can re‐import this file multiple times.
// We check mongoose.models first to avoid OverwriteModelError.
export const Role           = mongoose.models.Role           || mongoose.model("Role", RoleSchema);
export const User           = mongoose.models.User           || mongoose.model("User", UserSchema);
export const Category       = mongoose.models.Category       || mongoose.model("Category", CategorySchema);
export const Club           = mongoose.models.Club           || mongoose.model('Club', ClubSchema);
export const ClubMembership = mongoose.models.ClubMembership || mongoose.model('ClubMembership', ClubMembershipSchema);
export const Event          = mongoose.models.Event          || mongoose.model("Event", EventSchema);
export const Registration   = mongoose.models.Registration   || mongoose.model("Registration", RegistrationSchema);
export const Notification   = mongoose.models.Notification   || mongoose.model("Notification", NotificationSchema);
export const Schedule       = mongoose.models.Schedule       || mongoose.model('Schedule', ScheduleSchema);

export default dbConnect;

export async function migrateAddFields(Model, fields = {}) {
    if (!Model || typeof Model.updateMany !== 'function') {
        throw new Error('First argument must be a Mongoose model');
    }

    const summary = { applied: {}, totalModified: 0 };

    for (const [field, descriptor] of Object.entries(fields)) {
        // remove-case when caller passed { remove: true }
        if (descriptor && typeof descriptor === 'object' && descriptor.remove === true) {
            const filter = { [field]: { $exists: true } };
            const update = { $unset: { [field]: '' } };
            const res = await Model.updateMany(filter, update);
            const modified = res.modifiedCount ?? res.nModified ?? 0;
            summary.applied[field] = { action: 'unset', modified };
            summary.totalModified += modified;
            continue;
        }

        // set-case: descriptor is the default value to set for missing docs
        const defaultValue = descriptor;
        const filter = { [field]: { $exists: false } };
        const update = { $set: { [field]: defaultValue } };
        const res = await Model.updateMany(filter, update);
        const modified = res.modifiedCount ?? res.nModified ?? 0;
        summary.applied[field] = { action: 'set', modified };
        summary.totalModified += modified;
    }

    return summary;
}

//Example of update database
/*const result = await migrateAddFields(User, {
    isAdmin: false,
    profileComplete: false,
    lastSeenAt: null,
    legacyFlag: { remove: true },
});*/
