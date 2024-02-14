const Attendance = require('../models/Attendance');

exports.checkOut = async (req, res) => {
    try {
        const { instructorId } = req.body;

        const existingCheckIn = await Attendance.findOne({ instructorId, checkOutTime: null });
        if (!existingCheckIn) {
            return res.status(400).json({ error: 'No check-in found for the instructor' });
        }

        const checkOutTime = new Date();
        const attendance = await Attendance.findOneAndUpdate(
            { instructorId, checkOutTime: { $exists: false } },
            { $set: { checkOutTime } },
            { new: true }
        );
        if (!attendance) {
            return res.status(404).json({ error: 'No active check-in found for the instructor' });
        }
        res.json({ message: 'Checked out successfully', attendance });
    } catch (err) {
        console.error('Error checking out:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};