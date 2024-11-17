import Admin from '../models/AdminSchema.js';
import User from '../models/UserSchema.js';
import Doctor from '../models/DoctorSchema.js';
import Booking from '../models/BookingSchema.js';

export const createAdmin = async (req, res) => {
    try {
        const newAdmin = await Admin.create(req.body);
        res.status(201).json({ success: true, message: 'Admin created successfully', data: newAdmin });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to create admin', error: err.message });
    }
};

export const updateAdmin = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.status(200).json({ success: true, message: 'Admin updated successfully', data: updatedAdmin });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update admin', error: err.message });
    }
};

export const deleteAdmin = async (req, res) => {
    const id = req.params.id;
    try {
        await Admin.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Admin deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete admin', error: err.message });
    }
};

export const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find({}).select("-password");
        res.status(200).json({ success: true, message: 'Admins found', data: admins });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to get admins', error: err.message });
    }
};

export const getSingleAdmin = async (req, res) => {
    const id = req.params.id;
    try {
        const admin = await Admin.findById(id).select("-password");
        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }
        res.status(200).json({ success: true, message: 'Admin found', data: admin });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to get admin', error: err.message });
    }
};

export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json({ success: true, message: 'Doctors retrieved successfully', data: doctors });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching doctors', error: err.message });
    }
};

// Function to get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, message: 'Users retrieved successfully', data: users });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching users', error: err.message });
    }
};



export const   getAdminProfile
= async (req, res) => {
    try {
        console.log('Fetching admin profile for userId:', req.userId);
        const admin = await Admin.findById(req.userId);
        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }
        res.status(200).json({ success: true, data: admin });
    } catch (err) {
        console.error('Error fetching admin profile:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
export const createDoctor = async (req, res) => {
    try {
        const newDoctor = await Doctor.create(req.body);
        res.status(201).json({ success: true, message: 'Doctor created successfully', data: newDoctor });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to create doctor', error: err.message });
    }
};
