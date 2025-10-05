import ServiceProvider from "../model/serviceProviderModel.js";
import Service from "../model/serviceModel.js";


const getAllServices=async(req ,res) =>{

    try{
const pid=req.provider._id;


const services=await Service.find({providers:pid});

return res.status(200).json({services});
    }



catch(err){
    return res.status(400).json({success:false,msg:'Failed'});
}

}

// export const updateService = async (req, res) => {
//   try {
//     const providerId = req.provider._id;
//     const { serviceId, name, description, priceInfo, images, categoryName } = req.body;

//     // 1️⃣ Check if service exists and belongs to provider
//     const service = await Service.findOne({ _id: serviceId, providers: providerId });
//     if (!service) {
//       return res.status(404).json({ success: false, msg: "Service not found or unauthorized" });
//     }

//     // 2️⃣ Update category if needed
//     let category = service.categories;
//     if (categoryName) {
//       let newCategory = await Category.findOne({ name: categoryName });
//       if (!newCategory) {
//         newCategory = await Category.create({
//           name: categoryName,
//           slug: categoryName.toLowerCase().replace(/ /g, "-"),
//         });
//       }

//       // Update category reference in service
//       category = newCategory._id;

//       // Remove service from old category and add to new
//       await Category.findByIdAndUpdate(service.categories, { $pull: { services: service._id } });
//       await Category.findByIdAndUpdate(newCategory._id, { $addToSet: { services: service._id } });
//     }

//     // 3️⃣ Update fields
//     service.name = name || service.name;
//     service.description = description || service.description;
//     service.priceInfo = priceInfo || service.priceInfo;
//     service.images = images || service.images;
//     service.categories = category;

//     await service.save();

//     res.status(200).json({ success: true, msg: "Service updated successfully", service });
//   } catch (err) {
//     console.error("Update Service Error:", err);
//     res.status(500).json({ success: false, msg: "Server error" });
//   }
// };




export default getAllServices;






