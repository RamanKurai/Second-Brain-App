import  express  from "express";
import { userModel } from "./db";
const app = express();

app.use(express.json());

app.post("/api/v1/signup" , async ( req , res)=> {

  const email = req.body.email;
  const password = req.body.password; 
try {
    await userModel.create({
        email : email,
        password : password
     })
     res.json({
           message : "Signed up Successfully"
       }) 
} catch (error) {
    res.status(411).json({
        message : "User Already Exists"
    })
}

})

// app.post("/api/v1/signin" ,  ( req , res)=> {
    
// })

// app.get("/api/v1/content" ,  ( req , res)=> {
    
// })

// app.delete("/api/v1/content" ,  ( req , res)=> {
    
// })

// app.post("/api/v1/brain/share" ,  ( req , res)=> {
    
// })

// app.get("/api/v1/brain/:shareLink" ,  ( req , res)=> {
    
// })


app.listen(3000)