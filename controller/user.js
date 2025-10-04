import User from "../model/userModel.js";


export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    await user.deleteOne();
    return res.status(200).json({ success: true, msg: "User account deleted successfully" });
  } catch (err) {
    console.error("Delete User Error:", err);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
};

// --- Get Favorites ---
export const getUserFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    return res.status(200).json({
      success: true,
      favorites: user.favorites || [],
    });
  } catch (err) {
    console.error("Get Favorites Error:", err);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
};

// --- Add Favorite ---
export const addFavorite = async (req, res) => {
  try {
    const { serviceId } = req.body;

    if (!serviceId) {
      return res.status(400).json({ success: false, msg: "Service ID is required" });
    }

    await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { favorites: serviceId } }, // no duplicates
      { new: true }
    );

    const updatedUser = await User.findById(req.user._id).populate("favorites");
    return res.status(201).json({ success: true, favorites: updatedUser.favorites });
  } catch (err) {
    console.error("Add Favorite Error:", err);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
};

// --- Remove Favorite ---
export const removeFavorite = async (req, res) => {
  try {
    const { serviceId } = req.body;

    if (!serviceId) {
      return res.status(400).json({ success: false, msg: "Service ID is required" });
    }

    await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { favorites: serviceId } },
      { new: true }
    );

    const updatedUser = await User.findById(req.user._id).populate("favorites");
    return res.status(200).json({ success: true, favorites: updatedUser.favorites });
  } catch (err) {
    console.error("Remove Favorite Error:", err);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
};


export const getUserDetails=async(req,res)=>{
    try{
       const id=req.user._id;

       const userDetails=await User.findById(id);

       if(!userDetails) {
        return res.status(200).json({success:false,msg:"No such User"}); 
       }

       return res.status(200).send(userDetails);
    }
    catch(err){
        return res.json({success:false,msg:"Failed"});
    }
}

export default {
    getUserDetails,removeFavorite,addFavorite,getUserFavorites,deleteUser
}