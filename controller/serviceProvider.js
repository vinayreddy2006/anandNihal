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


export default getAllServices;


