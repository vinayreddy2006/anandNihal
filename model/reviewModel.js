import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Refers to the user who gave the review
      required: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service", // Refers to the service being reviewed
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    review: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
  }
);

// Optional: Prevent multiple reviews by the same user for the same service
reviewSchema.index({ user: 1, service: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);

export default Review;
