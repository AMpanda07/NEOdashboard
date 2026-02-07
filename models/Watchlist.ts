import mongoose, { Schema, model, models } from 'mongoose';

const WatchlistSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    asteroidId: {
        type: String,
        required: true,
    },
    asteroidName: String,
    addedAt: {
        type: Date,
        default: Date.now,
    },
    notes: String,
    alertThreshold: {
        type: Number, // e.g., max miss distance in km
        default: 1000000,
    },
});

// Compound index to prevent duplicate saves of same asteroid by same user
WatchlistSchema.index({ userId: 1, asteroidId: 1 }, { unique: true });

const Watchlist = models.Watchlist || model('Watchlist', WatchlistSchema);

export default Watchlist;
