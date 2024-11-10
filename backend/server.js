const express = require("express")
require("dotenv").config();
const app = express();

//cors
const cors = require("cors");
app.use(cors())

//multer
const multer = require("multer")
const storage = multer.memoryStorage();
const upload = multer({storage});


//pinata 
const { PinataSDK } = require("pinata-web3");
app.use(express.json())
app.post('/photo', upload.single('photo'), async(req,res) => {
    const img = req.file;
    console.log(img.mimetype);
    if(!img){
        return res.status(400).send("NO PHOTO UPLOADED");
    }

    console.log("PHOTO : " + typeof(file));
    const pinata = new PinataSDK({
        pinataJwt : process.env.PINATA_JWT_KEY,
        pinataGateway : "green-central-jay-496.mypinata.cloud",
    })

    console.log("PINATA OBJECT CREATED")

    try{
        const blob = new Blob([img.buffer], { type: img.mimetype });//creating binary large obj of img
        const file = new File([blob], img.originalname, { type: img.mimetype }); //creating a file obj
        const uploadResult = await pinata.upload.file(file);
        console.log("File uploaded to pinata :", uploadResult);
        res.status(200).json({
            message: "file uploaded successfully",
            pinataResponse : uploadResult
        })
    } catch(e) {
        res.status(500).json({error : "Error in uploading"+e})
    }


} )


const port = 5000;
app.listen(port, ()=>{
    console.log("server running at " + port)
})