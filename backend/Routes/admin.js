import express from 'express';
import {
    createAdmin,
    updateAdmin,
    deleteAdmin,
    getAllAdmins,
    getSingleAdmin,
    getAllDoctors,
    getAllUsers,
    
    getAdminProfile
} from '../Controllers/adminController.js';
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.post('/admins', authenticate, restrict(['admin']), createAdmin);
router.put('/admins/:id', authenticate, restrict(['admin']), updateAdmin);
router.delete('/admins/:id', authenticate, restrict(['admin']), deleteAdmin);
router.get('/admins', authenticate, restrict(['admin']), getAllAdmins);
router.get('/admins/:id', authenticate, restrict(['admin']), getSingleAdmin);
router.get('/doctors', authenticate, restrict(['admin']), getAllDoctors);
router.get('/users', authenticate, restrict(['admin']), getAllUsers);
router.get('/profile/me',  authenticate, restrict(['admin']) ,getAdminProfile);

export default router;
