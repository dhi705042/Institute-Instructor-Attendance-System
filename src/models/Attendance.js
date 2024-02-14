const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    instructorId: {
        type: String,
        required: true
    },
    checkInTime: {
        type: Date,
        required: true
    },
    checkOutTime: {
        type: Date
    }
});

module.exports = mongoose.model('Attendance', attendanceSchema);
