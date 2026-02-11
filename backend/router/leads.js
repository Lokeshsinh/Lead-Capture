const express =  require("express");
const Lead  =  require("../models/Lead")
const router   =  express.Router();


router.post("/", async (req, res) => {
  try {
    const { name, email, phone, company, message, source } = req.body;

  
    if (!name || !email || !source) {
      return res.status(400).json({
        message: "Required fields missing"
      });
    }

    const newLead = new Lead({
      name,
      email,
      phone,
      company,
      message,
      source
    });

    await newLead.save();

    res.status(201).json({message: "Data Added Sucessful"});

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


// GET ALL LEADS
router.get("/", async (req, res) => {
  try {
    const leads = await Lead.find()
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const lead = await Lead.findOne(req.params.name);
    if (!lead) return res.status(404).json({ message: "Not found" });

    res.json(lead);
  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
});



module.exports =  router 