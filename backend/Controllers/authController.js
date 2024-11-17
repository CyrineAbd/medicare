import User from '../models/UserSchema.js';
import Doctor from '../models/DoctorSchema.js';
import Admin from '../models/AdminSchema.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


const generateToken = user => {
    return jwt.sign(
        { id:user._id, role:user.role},
         process.env.JWT_SECRET_KEY,
        {
            expiresIn:"15d",
        }
    );
};

export const register = async (req, res) => {
    const { email, password, name, role, photo, gender } = req.body;

    try {
        let user = null;

        if (role === 'patient') {
            user = await User.findOne({ email });
        } else if (role === 'doctor') {
            user = await Doctor.findOne({ email });
        }else if (role === 'admin') {
          user = await Admin.findOne({ email });
        }
        
        // Check if user exists
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        if (role === 'patient') {
            user = new User({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role
            });
        } else if (role === 'doctor') {
            user = new Doctor({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role
            });
        } else if ( role==  'admin'){
            user= new Admin({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role
            })
        }

        await user.save();
        res.status(201).json({ success: true, message: 'User successfully created' });
    
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error, try again!" });
    }
};
export const login = async (req,res)=>{
    const { email, password } = req.body;
    try {

        let user = null;
        const patient = await User.findOne({ email });
        const doctor = await Doctor.findOne({ email });
        const admin = await Admin.findOne({ email });


        console.log('Patient:', patient);
        console.log('Doctor:', doctor);
        console.log('Admin:', admin);


        if(patient){
            user = patient;
        }
        if (doctor){
            user = doctor;
        }
        if (admin){
            user = admin;
        }

        // Check if user exists or not 
        if(!user){
            return res.status(404).json({ message:'User not found' });
        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(
            password,
            user.password
        );

        console.log('Password match:', isPasswordMatch);

        if(!isPasswordMatch){
            return res.status(400).json({ status:false, message:'Invalid credentials' });
        }

        // Get token
        const token = generateToken(user);

        // Send response
        res.status(200).json({
            status: true,
            message: 'Successfully logged in',
            token,
            data: user,
            role: user.role
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, message: 'Failed to login' });
    }
};
