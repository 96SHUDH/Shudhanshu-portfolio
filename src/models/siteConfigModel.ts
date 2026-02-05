import mongoose from "mongoose";

const siteConfigSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    default: "global_config", // We only need one document for the whole site
  },
  resumeUrl: {
    type: String,
    default: "", // Default to empty
  },
});

// Prevent model overwrite error
const SiteConfig = mongoose.models.siteconfigs || mongoose.model("siteconfigs", siteConfigSchema);

export default SiteConfig;