import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema.Types


const bookingSchema = new mongoose.Schema({
    car : {type: ObjectId, ref: "Car", required: true},
    user : {type: ObjectId, ref: "User", required: true},
    owner : {type: ObjectId, ref: "User", required: true},

    pickupAt: {type: Date, required: true},
    returnAt: {type: Date, required: true},

    status: {type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending"},


    // Store computed values (important for enterprise apps)
    durationInHours:{
        type: Number,
        required: true
    },

    price: {type: Number, required: true},

    
    // Payment fields
    paymentStatus: {
        type: String,
        enum: ["unpaid", "paid", "failed"],
        default: "unpaid"
    },

    paymentIntentId: {
        type: String
    },

    paidAt: {
        type: Date
    }

}, {timestamps: true})

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking