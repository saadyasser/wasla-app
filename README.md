# Freelancing Platform for Palestinian Freelancers

## 📌 Project Overview
Many Palestinian freelancers struggle to find work because of unstable internet and electricity.
This creates mistrust from clients, even though the freelancers have the skills to complete projects.
Our platform provides a trustworthy environment where freelancers can showcase their skills and portfolios, while clients can find reliable talent efficiently.

**Problem Solved:**
- Our platform helps freelancers show their skills and portfolios.
- Clients can post projects and choose reliable freelancers.
- Ratings and feedback build trust.
- Future AI recommendations will match freelancers to projects based on skills and personal challenges.


## 👥 Team Members & Roles
| Name | Role |
|------|------|
| [Eman Hjazi](https://github.com/Eman-Hjazi) | Backend Developer |
| [Saad](https://github.com/saadyasser) | Fullstack Developer |
| [Doaa](https://github.com/D0AAO) | UX/UI Designer |
| [Raghad](https://github.com/raghadabuzainih) | Frontend Developer |




## ⚙️ Technologies Used
- **Backend:** PHP Laravel  
- **Frontend:** React, TypeScript, JavaScript, tailwindcss  
- **Database:** MySQL  
- **Version Control:** Git, GitHub  
- **Task Management:** Trello  



## 🚀 Features (MVP)
- **User Management:** Secure registration, login, and profile management for freelancers and clients.  
- **Project Management:** Clients can post projects; freelancers can browse and submit proposals.  
- **Applications/Proposals:** Freelancers apply; clients accept/reject.  
- **Ratings & Reviews:** Clients can rate freelancers after project completion.  
- **Search & Filtering:** Projects filtered by skills or categories.  



## 🌟 Future Enhancements
- AI-powered recommendations for matching freelancers to projects.  
- Support Us page for sponsorships/donations.  
- Advanced analytics and dashboards.  
- Payment gateway integration.



## 📂 Project Structure

```plaintext
project/
│
├── backend/ # Laravel backend
├── frontend/ # React + TypeScript frontend
├── README.md # Project documentation
└── ...


## 📌 How to Run Locally
Make sure Node.js 20, npm 10, PHP 8.2 are installed on your system.

```bash
git clone https://github.com/saadyasser/wasla-app.git
cd wasla-app
```

2- **Install dependencies**

```bash
cd frontend
npm install
```

3- **Run the frontend**

```bash
npm run dev
```

4- **Setup backend (Laravel)**

```bash
cd ../backend
composer install
cp .env.example .env
php artisan key:generate
php artisan serve
```

5- Open browser at http://localhost:3000 (frontend) and http://127.0.0.1:8000 (backend)

## 📄 License

MIT License