const Attendance = require('../models/Attendance');

exports.checkIn = async (req, res) => {
    try {
        const { instructorId } = req.body;

        const existingCheckIn = await Attendance.findOne({ instructorId, checkOutTime: null });
        if (existingCheckIn) {
            return res.status(400).json({ error: 'Instructor has already checked in' });
        }
        
        const checkInTime = new Date();
        const attendance = new Attendance({
            instructorId,
            checkInTime
        });
        await attendance.save();
        res.status(201).json({ message: 'Checked in successfully', attendance });
    } catch (err) {
        console.error('Error checking in:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
