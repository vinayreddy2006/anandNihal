import Service from "../model/serviceModel.js";
import Review from "../model/reviewModel.js";



export const addReview = async (req, res) => {
  try {
    const { serviceId, rating, review } = req.body;
    const userId = req.user._id;

    if (!serviceId || !rating) {
      return res.status(400).json({
        success: false,
        msg: "Service ID and rating are required",
      });
    }

    // Check if service exists
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        success: false,
        msg: "Service not found",
      });
    }

    // Check if user already reviewed this service
    const existingReview = await Review.findOne({ user: userId, service: serviceId });

    let message = "";
    let reviewDoc;

    if (existingReview) {
      // 🔁 Update existing review — don't increment count
      existingReview.rating = rating;
      existingReview.review = review || "";
      reviewDoc = await existingReview.save();
      message = "Review updated successfully";
    } else {
      reviewDoc = await Review.create({
        user: userId,
        service: serviceId,
        rating,
        review,
      });

      service.reviewCount += 1;
      message = "Review added successfully";
    }

    // 🔹 Recalculate average rating
    const allReviews = await Review.find({ service: serviceId });
    const avgRating =
      allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    service.avgRating = avgRating.toFixed(1);
    await service.save();

    return res.status(201).json({
      success: true,
      msg: message,
      data: reviewDoc,
      serviceStats: {
        averageRating: service.avgRating,
        reviewCount: service.reviewCount,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: "Server error",
      error: error.message,
    });
  }
};


export const deleteReview = async (req, res) => {
  try {
    const userId = req.user._id;
    const { reviewId } = req.params;

    // Find and delete the review
    const review = await Review.findOneAndDelete({ _id: reviewId, user: userId });

    if (!review) {
      return res.status(404).json({
        success: false,
        msg: "Review not found or unauthorized",
      });
    }

    // Update the service's stats
    const service = await Service.findById(review.service);
    if (service) {
      // Decrement review count safely
      service.reviewCount = Math.max(service.reviewCount - 1, 0);

      // Recalculate average rating
      const remainingReviews = await Review.find({ service: service._id });
      const avgRating =
        remainingReviews.length > 0
          ? remainingReviews.reduce((sum, r) => sum + r.rating, 0) / remainingReviews.length
          : 0;

      service.avgRating = avgRating.toFixed(1);
      await service.save();
    }

    return res.status(200).json({
      success: true,
      msg: "Review deleted successfully",
      serviceStats: {
        averageRating: service?.avgRating || 0,
        reviewCount: service?.reviewCount || 0,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: "Server error",
      error: error.message,
    });
  }
};





export const getServiceReview = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const service = await Service.findById(serviceId).select(
      "name avgRating reviewCount"
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        msg: "Service not found",
      });
    }

    const reviews = await Review.find({ service: serviceId })
      .populate("user", "fullName email") // populate user details
      .sort({ createdAt: -1 }); // latest first

    return res.status(200).json({
      success: true,
      service,
      reviews,
      reviewCount: service.reviewCount,
      averageRating: service.avgRating,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: "Server error",
      error: error.message,
    });
  }
};



export const getUserReview = async (req, res) => {
  try {
    const userId = req.user._id;

    const reviews = await Review.find({ user: userId })
      .populate("service", "name avgRating reviewCount") // populate service details
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: "Server error",
      error: error.message,
    });
  }
};



export default {addReview,deleteReview,getUserReview,getServiceReview};







