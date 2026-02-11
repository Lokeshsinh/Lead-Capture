const mongoose  =  require("mongoose")

const LeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String
    },
    company: {
      type: String
    },
    message: {
      type: String
    },
    source: {
      type: String,
      enum: ["Website", "Instagram", "Referral", "Other"],
      required: true
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: false }
  }
);

module.exports =  mongoose.model("Lead", LeadSchema);
