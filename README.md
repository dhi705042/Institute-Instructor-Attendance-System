# Institute-Instructor-Attendance-System

The Institute Instructor Attendance System is a backend system that enables institutes to track their instructors' check-in and check-out times throughout the day and view their total working hours on a monthly basis. This system provides APIs for storing check-in/check-out information into the database and generating aggregated monthly reports.

## Installation

To use the Institute Instructor Attendance System, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-username/Institute-Instructor-Attendance-System.git

Install dependencies:

Start the server:
node src/app.js


The server will start running on port 3000 by default.

APIs
The Institute Instructor Attendance System provides the following APIs:

1. Check-in API
Endpoint: POST /api/checkin
Description: Allows instructors to check in by providing their instructor ID and check-in time.
Input: JSON body containing instructorId (string) and checkInTime (string in ISO 8601 format).
Validation: Validates the input data to ensure the instructor ID is provided and the check-in time is in a valid format. Additionally, it checks for overlaps to prevent multiple check-ins without corresponding check-outs.
Logic: Stores the check-in information into the database.
2. Check-out API
Endpoint: POST /api/checkout
Description: Allows instructors to check out by providing their instructor ID and check-out time.
Input: JSON body containing instructorId (string) and checkOutTime (string in ISO 8601 format).
Validation: Validates the input data to ensure the instructor ID is provided and the check-out time is in a valid format. Additionally, it checks for ongoing sessions to prevent check-outs without corresponding check-ins.
Logic: Updates the corresponding check-in record in the database with the check-out time.
3. Generate Monthly Report API
Endpoint: GET /api/report
Description: Generates an aggregated monthly report of total working hours for a given instructor in a specific month and year.
Input: Query parameters instructorId (string), month (number), and year (number).
Validation: Validates the input parameters to ensure all required parameters are provided and in the correct format.
Logic: Queries the database to calculate the total working hours for the specified instructor within the specified month and year. Returns the total working hours in hours.
Logic Details
Check-in API: The logic validates the input data and checks for overlaps to ensure data integrity. It stores the check-in information into the database.
Check-out API: The logic validates the input data and checks for ongoing sessions to ensure consistency. It updates the corresponding check-in record with the check-out time.
Generate Monthly Report API: The logic validates the input parameters and queries the database to calculate the total working hours for the specified instructor within the specified month and year. It returns the total working hours in hours.