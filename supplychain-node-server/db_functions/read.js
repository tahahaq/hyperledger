var exports = module.exports = {},
    axios = require('axios'),
    constants = require('../utils/constants'),
    sourceModel = require('../models/Source'),
    shipperModel = require('../models/Shipper'),
    designerModel = require('../models/Designer'),
    packagerModel = require("../models/Packager");

// Requesting the hyperledger composer to get data by timber_id
exports.getDataByTimberId = async (id) => {
    try {
        console.log(id)
        let requests = {
            source : {},
            shipper : {},
            designer : {},
            packager : {}
        };
        let ifSourceExist = await sourceModel.findOne({timber_id : id});
        if(ifSourceExist){
            let source = await axios.get(constants.hyperledgerUrl + `Source/${id}` );
            let returningData = source.data;
            delete returningData["$class"];
            console.log(returningData + "source")
            requests.source = returningData;
        }
       let ifShipperExist = await shipperModel.findOne({timber_id: id});
        if(ifShipperExist){
            let shipper =await axios.get(constants.hyperledgerUrl + `Shipper/${id}`);
            let returningData1 = shipper.data;
            delete returningData1["$class"];
            console.log(returningData1+ "shipper")
            requests.shipper =returningData1;
        }
        let ifDesignerExist = await  designerModel.findOne({timber_id : id});
        if(ifDesignerExist){
            let designer = await axios.get(constants.hyperledgerUrl + `Designer/${id}`);
            let returningData2 = designer.data;
            delete returningData2["$class"];
            console.log(returningData2 + 'desginer')
            requests.designer =returningData2;
        }
        let ifPackagerExist = await  packagerModel.findOne({timber_id : id});
        if(ifPackagerExist){
            let packager = await axios.get(constants.hyperledgerUrl + `Packager/${id}`);
            let returningData3 = packager.data;
            delete returningData3["$class"];
            console.log(returningData3 + 'packager')
            requests.packager = returningData3;
        }

        return requests;

    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};

// Getting the pending requests made by the partcipants
exports.getPendingRequests = async ({uid}) => {
    try {
        if(uid !== constants.adminUid){
            throw new Error("You don't have permission to view this!")
        }
        let requests = {
            source : [],
            shipper : [],
            designer : [],
            packager : []
        };
        requests.source = await sourceModel.find({is_approved : false});
        requests.shipper= await shipperModel.find({is_approved : false});
        requests.designer =await designerModel.find({is_approved : false});
        requests.packager = await packagerModel.find({is_approved : false});

        return requests;

    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};

