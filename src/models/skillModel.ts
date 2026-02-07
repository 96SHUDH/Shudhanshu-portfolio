import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a skill name"],
    unique: true,
  },
  category: {
    type: String, 
    required: true,
    // This ensures you only pick valid categories that match your frontend
    enum: ["Backend", "Frontend", "Database", "Core", "Tools"], 
    default: "Backend",
  }
});

// This check prevents "OverwriteModelError" in Next.js
const Skill = mongoose.models.skills || mongoose.model("skills", skillSchema);

export default Skill;