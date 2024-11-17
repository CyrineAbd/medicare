import Doctor from '../models/DoctorSchema.js';
import BookingSchema from '../models/BookingSchema.js';

export const createDoctor = async (req, res) => {
    try {
        const newDoctor = await Doctor.create(req.body);
        res.status(201).json({ success: true, message: 'Doctor created successfully', data: newDoctor });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to create doctor', error: err.message });
    }
};


export const updateDoctor = async (req, res) =>{
    const id = req.params.id;
    try{
        const updateDoctor = await Doctor.findByIdAndUpdate(id,{$set:req.body},{new:true});
        res.status(200).json({success:true,message:'Successfully updated', data:updateDoctor});
    }catch (err){
        res.status(500).json({success:false,message:'Failed to update'});

    }
};

export const deleteDoctor = async (req, res) =>{
    const id = req.params.id;
    try{
        await Doctor.findByIdAndDelete(id);
        res.status(200).json({success:true,message:'Successfully deleted'});
    }catch (err){
        res.status(500).json({success:false,message:'Failed to delete'});

    }
};
export const getSingleDoctor = async (req, res) =>{
    const id = req.params.id;
    try{
        const doctor = await Doctor.findById(id)
        .populate('reviews')
        .select("-password");
        
        res.status(200).json({success:true,message:'Doctor found', data:doctor});
    }catch (err){
        res.status(500).json({success:false,message:'No doctor found'});

    }
}
export const getAllDoctors= async (req, res) =>{

    try{
        const {query} = req.query;
        let doctors;

        if(query){
            doctors = await Doctor.find({
                isApproved:'approved',
                $or: [
                    { name: { $regex: query, $options: "i"}},
                    { specialization: { $regex:query, $options: "i" }},
                ],
            }).select('-password');
        } else {
             doctors = await Doctor.find({isApproved:"approved"}).select("-password");//to hide the attribut password on response for security reason
        }
        res.status(200).json({
            success:true,
            message:'Doctors found',
            data:doctors
        });
    }catch (err) {
        res.status(500).json({success:false,message:'Not found'});

    }
};

export const getDoctorProfile = async (req, res) => {
    try {
        console.log('Fetching doctor profile for userId:', req.userId);
        const doctor = await Doctor.findById(req.userId);
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }
        res.status(200).json({ success: true, data: doctor });
    } catch (err) {
        console.error('Error fetching doctor profile:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
export const getDoctorAppointments = async (req, res) => {
    try {
        const doctorId = req.userId; // Assurez-vous que req.userId contient l'ID du médecin connecté
        const doctor = await Doctor.findById(doctorId);

        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        const appointments = await Booking.find({ doctor: doctorId }).populate('user', 'name email');
        
        res.status(200).json({ success: true, message: 'Appointments retrieved successfully', data: appointments });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching appointments', error: err.message });
    }
};