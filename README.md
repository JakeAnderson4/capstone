Introduction
SoundStage solves the problem of fragmented concert discovery by offering a centralized platform to find live music events. Users can search for events by city, view event details, and explore venues on an interactive map.

Event Discovery: Search for events by city.

Prerequisites
Node.js installed on your machine.
MySQL installed and running.
A .env file with the required environment variables.
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/soundstage.git
cd soundstage
Install dependencies:

For the backend:
bash
Copy code
cd backend
npm install
For the frontend:
bash
Copy code
cd frontend/soundstage
npm install
Set up the database:

Import the provided SQL schema (capstone_schema.sql) into your MySQL instance.
Run the application:

Start the backend:
bash
Copy code
cd backend
node app.js
Start the frontend:
bash
Copy code
cd frontend/soundstage
npm run dev
Environment Variables
Create a .env file in the backend directory with the following variables:

makefile
Copy code
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
EVENTBRITE_API_KEY=your_eventbrite_api_key
Usage
Navigate to the frontend URL:
arduino
Copy code
http://localhost:5173
Log in or sign up to access the platform.
Search for events by entering a city name in the search bar.
View events on the map and click on markers for more details.
Save events for easy reference.
API Endpoints
Auth Routes
POST /api/auth/register - Register a new user.
POST /api/auth/login - Log in an existing user.
Event Routes
GET /api/events?city=Perth - Fetch events for a specified city.
Venue Routes
GET /api/venues?city=Perth - Fetch venues for a specified city.
Saved Events Routes
POST /api/savedevents - Save an event to the user's list.
GET /api/savedevents - Retrieve saved events.
Future Enhancements
Event popup for that event after city searching
purchase options.
Contributing
Fork the repository.
Create a new branch:
bash
Copy code
git checkout -b feature-name
Commit changes:
bash
Copy code
git commit -m "Add feature-name"
Push to your fork:
bash
Copy code
git push origin feature-name
Open a pull request.
