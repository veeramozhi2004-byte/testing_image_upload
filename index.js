import express from "express";
import multer from "multer";

const app=express();
const port = process.env.PORT || 3000;
app.set("view engine", "ejs");

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
if (!req.file) {
    return res.status(400).send("No image was uploaded.");
}
console.log(req.file.filename);
res.render("image.ejs", {
    imageUrl: "/" + req.file.filename
});
});

app.listen(port, ()=>{
    console.log("server is running at port: "+port);
});
