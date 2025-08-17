import { Router } from "express";
import { AdminController } from "../controllers/index.js";
import { authenticate, isAdmin } from "../middlewares/auth.middleware.js";
const admin = Router();
admin.post("/login", AdminController.loginAdmin);
admin.post("/logout", AdminController.logoutAdmin);
// admin.use(authenticate, isAdmin)
admin.post("/create", AdminController.createAdmin);
admin.get("/all", AdminController.getAllAdmins);
admin.get("/:id", AdminController.getAdminById);
admin.post("/:id", AdminController.updateAdmin);
admin.delete("/:id", AdminController.deleteAdmin);
export default admin;
//# sourceMappingURL=admin.routes.js.map