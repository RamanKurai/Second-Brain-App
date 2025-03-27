import mongoose, { Schema, model } from "mongoose";
mongoose.connect("mongodb+srv://ramankurai27:Qnykw4n7N07iYMmi@cluster0.sh3z1.mongodb.net/Second-Brain-App")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB Connection Error:", err));

const userSchema = new Schema({
  username: { type: String, required: true, unique: true }, 
  password: { type: String, required: true }
});

const contentSchema = new Schema({
  title: { type: String, required: true }, 
  link: { type: String, required: false },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }], 
  type: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } 
});

const tagSchema = new Schema({
  title: { type: String, required: true, unique: true }
});

const linkSchema = new Schema({
  hash: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } // Consistent ref names
});

export const UserModel = model("User", userSchema);
export const ContentModel = model("Content", contentSchema);
export const TagModel = model("Tag", tagSchema);
export const LinkModel = model("Link", linkSchema);
