import { Router } from "express";
import { EnquiryController } from "../controllers/index.js";

const enquiry = Router();

enquiry.post("/create", EnquiryController.createEnquiry);
enquiry.get("/all", EnquiryController.getAllEnquiries);
enquiry.get("/:id", EnquiryController.getEnquiryById);
enquiry.delete("/:id", EnquiryController.deleteEnquiry);

export default enquiry;