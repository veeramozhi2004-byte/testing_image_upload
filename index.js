import express from "express";
import multer from "multer";
import ejs from 'ejs';

const app=express();
const port = 3000;
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

app.use(express.static("uploads"));
const upload = multer({ storage });

app.get("/", (req, res)=>{
    res.render("index.ejs");
});

app.post("/upload", upload.single("image"), (req, res) => {
    console.log(req.file.filename);
    res.render("image.ejs", {
        imageUrl: "/" + req.file.filename
    });
});

app.listen(port, ()=>{
    console.log("server is running at port: "+port);
});