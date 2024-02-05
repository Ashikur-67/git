
let http = require('http');
let fs=require('fs')
let multer=require('multer')


let server = http.createServer(function(req,res){

    if (req.url=="/"){
        res.end("This is Home Page")
    }
    else if (req.url=="/about"){
        res.end("This is About Page")
    }
    else if (req.url=="/contact"){
        res.end("This is Contact Page")
    }

    else if (req.url=="/file-write"){

        fs.writeFile("demo.txt","hello world",function(error){

            if (error){
                res.end("Write File Failed")
            }
            else {
                res.end("Write File Success")
            }
        })
    }

    else if (req.url=="/upload-file"){

        let storage = multer.diskStorage({
            destination:function(req,file,Callback){
                Callback(null,'./Uploads')
            },
            filename:function(req,file,callback){
                callback(null,file.originalname)
            }

        })

        let upload=multer({storage:storage}).single("Myfile")

        upload(req,res,function(error){
            if (error){
                res.end("File Upload Failed")
            }
            else {
                res.end("File Upload Success")
            }
        })

    }

})


server.listen(5500,function(){
    console.log("Run success")
})