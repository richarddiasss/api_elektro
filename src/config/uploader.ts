import multer from "multer";
import path from "path"

const storage = multer.diskStorage(
    {
        destination: function(request,file,callBack){
            let destinationFolder

            // Não esqueça de criar as pastas "videos", "audios" e "photos" como pastas filhas de uploads

            if(file.mimetype.startsWith("video/")){
                destinationFolder = path.join(__dirname,"..","..","uploads","videos")
            }
            else if(file.mimetype.startsWith("audio/")){
                destinationFolder = path.join(__dirname,"..","..","uploads","audios")

            }
            else{
                destinationFolder = path.join(__dirname,"..","..","uploads","photos")
            }
            
            callBack(null,destinationFolder)
        },
        filename:function(request,file,callBack){
            callBack(null,Date.now() + "_" + file.originalname)
        }
    }
)


const photoUpload = multer({
    storage:storage,
    limits:{
        // Até 9 arquivos de 50 MB
        fileSize: 1024 * 1024 * 50,
        files:9,
    },
    fileFilter:function(request,file,callBack){
        const allowedFileTypes = ["image/png","image/jpeg","image/jpg"]

        if(!allowedFileTypes.includes(file.mimetype)){
            const messsage = "Only the Jpeg, PNG and JPG types are supported"

            return callBack(new Error())
        }

        callBack(null,true) // Aceita o arquivo, caso seja do tipo suportado
    },
}) 

export{
    photoUpload
}