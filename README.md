
# 🩺 CEMA Health System – Internship Task

This is a basic Health Information System developed as part of the **Software Engineer Intern** recruitment process at the **Centre for Epidemiological Modelling and Analysis (CEMA)**.

## Features

- Create Health Programs (e.g. TB, Malaria, HIV)
- Register new clients with basic details (name, age, gender)
- Enroll clients into one or more programs
- View full client profiles with enrolled programs
- Public API to access client data (for integration with other systems)
- Simple interactive frontend using HTML, CSS, and JavaScript

---

## Technologies Used

- **Backend**: Node.js + Express
- **Database**: SQLite (lightweight, file-based)
- **Frontend**: Plain HTML + CSS + Vanilla JavaScript (for simplicity)
- **API Format**: RESTful JSON APIs

---

## How to Run

1. **Clone the repo**
   ```bash
   git clone https://github.com/nathan101117/cema-health-system.git
   cd cema-health-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Visit in browser**
   ```bash
   http://localhost:5000/index.html
   ```

---

## 🔗 API Endpoints

| Method | Endpoint                        | Description                     |
|--------|----------------------------------|---------------------------------|
| GET    | `/programs`                     | List all programs               |
| POST   | `/programs`                     | Create a new program            |
| POST   | `/clients`                      | Register a new client           |
| GET    | `/clients?search=`              | Search clients by name          |
| POST   | `/clients/:id/enroll`           | Enroll client to program(s)     |
| GET    | `/clients/:id`                  | View full client profile        |
| GET    | `/api/clients/:id`              | Public API view of client       |

---

## Screenshots

> Screenshots available in the PowerPoint presentation for clarity and demonstration.

---

## Optional Enhancements

- [ ] Deploy on Render or Railway
- [ ] Add Swagger API Docs
- [ ] Add unit tests using Jest

---

## License

MIT License – for educational and demonstration purposes.
