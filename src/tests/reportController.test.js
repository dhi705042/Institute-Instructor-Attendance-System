// Import the necessary modules and functions
const { generateMonthlyReport } = require('../controllers/reportController');
const Attendance = require('../models/Attendance');

// Mock the request and response objects
const req = {
  query: {
    instructorId: '123456',
    month: 2,
    year: 2024
  }
};

const res = {
  json: jest.fn(),
  status: jest.fn()
};

// Mock the MongoDB aggregate function
Attendance.aggregate = jest.fn();

// Test cases for generateMonthlyReport function
describe('generateMonthlyReport', () => {
  it('should return total hours worked for the specified instructor, month, and year', async () => {
    // Mock the result of the MongoDB aggregate function
    Attendance.aggregate.mockResolvedValue([
      { _id: null, total: 3600000 } // 1 hour (in milliseconds)
    ]);

    // Call the generateMonthlyReport function
    await generateMonthlyReport(req, res);

    // Verify that the response is correct
    expect(res.json).toHaveBeenCalledWith({
      instructorId: '123456',
      month: 2,
      year: 2024,
      totalHours: 1 // 1 hour worked
    });
  });

  it('should return 0 hours worked if no data is found for the specified parameters', async () => {
    // Mock the result of the MongoDB aggregate function
    Attendance.aggregate.mockResolvedValue([]);

    // Call the generateMonthlyReport function
    await generateMonthlyReport(req, res);

    // Verify that the response is correct
    expect(res.json).toHaveBeenCalledWith({
      instructorId: '123456',
      month: 2,
      year: 2024,
      totalHours: 0 // No hours worked
    });
  });

  it('should handle errors and return a 500 status code', async () => {
    // Mock an error thrown by the MongoDB aggregate function
    const error = new Error('Internal server error');
    Attendance.aggregate.mockRejectedValue(error);

    // Call the generateMonthlyReport function
    await generateMonthlyReport(req, res);

    // Verify that the response status code is 500
    expect(res.status).toHaveBeenCalledWith(500);
    // Verify that the response contains the error message
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });
});
