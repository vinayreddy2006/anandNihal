// /controllers/service.js
import Category from "../model/categoryModel.js";
import Service from "../model/serviceModel.js";
import ServiceProvider from "../model/serviceProviderModel.js";


const generateSlug = (name) => {
  return name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-').replace(/[^\w-]+/g, '');
};



export const addService = async (req, res) => {
  const { name, description, images, priceInfo, categoryName } = req.body;
  
  if (!name || !priceInfo || !categoryName) {
    res.status(400).json({success:false,msg:"All fields are required"});
  }

  let category = await Category.findOne({ name: categoryName });

  if (!category) {
    // If category doesn't exist, create it automatically
    category = await Category.create({
      name: categoryName,
      slug: generateSlug(categoryName),
    });
  }

  const providerId = req.provider._id;
  const service = await Service.create({
    name, description, images, priceInfo,
    categories: category._id,
    providers: providerId,
  });

  const provider = await ServiceProvider.findById(providerId);
  provider.services.push(service._id);
  await provider.save();
  
  category.services.push(service._id);
  await category.save();

  res.status(201).json({success:true,msg:"Service entered"});
};




// export const getServices = async (req, res) => {
//   const services = await Service.find({})
//     .populate('categories', 'name slug')
//     .populate('providers', 'name location');
 
//   res.status(201).json({success:true,msg:"Service Fetched"});
// };


// export const getServiceById = async (req, res) => {
//   const service = await Service.findById(req.params.id)
//     .populate('categories', 'name slug')
//     .populate('providers', 'name location email phone');
    
//   if (service) {
//     res.json({success:true,msg:"Service Fetched"});
//   } else {
//     res.status(404).json({success:false,msg:'Service not found'});
//   }
// };


export default addService;