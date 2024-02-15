const Attendance = require('../models/Attendance');

exports.generateMonthlyReport = async (req, res) => {
    try {
        const { instructorId, month, year } = req.query;
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59);

        const idExists = await Attendance.findOne({instructorId})

        if(!idExists){
            res.status(400).json({
                status: 400,
                error: "no such id exists"
            })
            return
        }
        const totalCheckInTime = await Attendance.aggregate([
            {
                $match: {
                    instructorId,
                    checkInTime: { $gte: startDate, $lte: endDate },
                    checkOutTime: { $exists: true }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: { $subtract: ['$checkOutTime', '$checkInTime'] } }
                }
            }
        ]);

        const totalMilliseconds = totalCheckInTime.length > 0 ? totalCheckInTime[0].total : 0;
        let totalHours = totalMilliseconds / 3600000; // Convert milliseconds to hours

        console.log("totalHours", totalHours)

        //will round of the hrs to 2 decimal points

        // totelHours =  Math.floor(totalHours * (Math.pow(10, 2)))/100;
        totalHours = Math.round(totalHours * 100) / 100;

        console.log("totalHours22", totalHours)
        

        res.json({ instructorId, month, year, totalHours });
    } catch (err) {
        console.error('Error generating monthly report:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
