# Freelancing Platform for Palestinian Freelancers - Wasla 

<img width="6001" height="4501" alt="Galaxy Tab S8 Ultra" src="https://github.com/user-attachments/assets/095d4429-8cb8-4e0a-948f-7346202c861f" />

## 📌 Project Overview
Many Palestinian freelancers struggle to find work because of unstable internet and electricity.  
This creates mistrust from clients, even though the freelancers have the skills to complete projects.  
Our platform provides a trustworthy environment where freelancers can showcase their skills and portfolios, while clients can find reliable talent efficiently.

**Problem Solved:**
- Our platform helps freelancers show their skills and portfolios.
- Clients can post projects and choose reliable freelancers.
- Ratings and feedback build trust.
- New graduates get training and certificates.
- Future AI recommendations will match freelancers to projects based on skills and personal challenges.

  <img width="1000" height="880" alt="logo" src="https://github.com/user-attachments/assets/e1f7a02e-7bba-4040-bc03-bb330c46edbf" />


---

## 👥 Team Members & Roles
| Name | Role |
|------|------|
| [Eman Hjazi](https://github.com/Eman-Hjazi) | Backend Developer |
| [Mustafa](https://github.com/MustafaGitHub) | Backend Developer |
| [Saad](https://github.com/SaadGitHub) | Frontend Developer |
| [Doaa](https://github.com/DoaaGitHub) | UX/UI Designer |
| [Raghad](https://github.com/RaghadGitHub) | Frontend Developer |

---


## ⚙️ Technologies Used
- **UI/UX:** Figma.
- **Backend:** PHP, Laravel  
- **Frontend:** React, TypeScript, JavaScript, CSS, Tailwind CSS, Material-UI, NextAuth, Fetch API.
- **Database:** MySQL  
- **Version Control:** Git, GitHub  
- **Task Management:** [Trello](https://trello.com/b/o6qmPKz1/freelance-palestine)

---

## 🚀 Features (MVP)
- **User Management:** Secure registration, login, and profile management for freelancers and clients.  
- **Project Management:** Clients can post projects; freelancers can browse and submit proposals.  
- **Applications/Proposals:** Freelancers apply; clients accept/reject.  
- **Ratings & Reviews:** Clients can rate freelancers after project completion.  
- **Search & Filtering:** Projects filtered by skills or categories.


<img width="4500" height="3000" alt="HandsHoldingTabletProMockup" src="https://github.com/user-attachments/assets/28f76c98-7165-4ce6-bf3c-572d5ec0bb61" />

---

## 🌟 Future Enhancements
- AI-powered recommendations for matching freelancers to projects.  
- Support Us page for sponsorships/donations.  
- Advanced analytics and dashboards.  
- Payment gateway integration.  

---

## 🎨 UX/UI Designs


---


## 📝 Class Diagram / ERD
> Add your **class diagram** or **entity relationship diagram** here.

- [ERD Diagram](backend/docs/erd/index.html)
- ![Class Diagram]()

---

## 🏗️ System Architecture
>Our platform uses a **client–server model** with:

- **Frontend:** React + TypeScript communicates with the backend via REST APIs.
- **Backend:** Laravel (PHP) following the **MVC architecture**:
  - **Models:** Handle the database logic (Users, Projects, Proposals …).
  - **Controllers:** Process incoming requests and return responses.
  - **Views / API Resources:** Format data for the frontend.
  - **Routes:** Define API endpoints.
- **Database:** MySQL stores all persistent data.

- ![System Architecture Diagram](/backend/docs/mvc_structure.png)

---

## 🔄 User Flow
> Current implemented flow in the platform

## 1. Authentication & Onboarding
- User registers or logs in.  
- Completes profile setup (personal info, skills, portfolio, etc.).  

## 2. Project Lifecycle
- **Client**: Creates and publishes a project.  
- **Freelancer**: Browses available projects and submits proposals.  
- **Client**: Reviews proposals and selects a freelancer.  

---

📌 *Upcoming flows: Collaboration, Payment, and Feedback will be added in future releases.*


## 📡 API Documentation
>  link to API Collection.  
[Apidog Documents](https://12r27tnz98.apidog.io/).

| Endpoint                              | Method | Description                                                    |
| ------------------------------------- | ------ | -------------------------------------------------------------- |
| `/register`                           | POST   | Register a new user (Freelancer/Client).                       |
| `/login`                              | POST   | Login with email & password to get access token.               |
| `/logout`                             | POST   | Logout and revoke current access token.                        |
| `/freelancer/certifications`          | GET    | Get all freelancer certifications.                             |
| `/freelancer/certifications`          | POST   | Add a new certification.                                       |
| `/freelancer/certifications/:id`      | PUT    | Update a freelancer certification.                             |
| `/freelancer/certifications/:id`      | DELETE | Delete a freelancer certification.                             |
| `/freelancer/educations`              | GET    | Get all freelancer educations.                                 |
| `/freelancer/educations`              | POST   | Add a new education.                                           |
| `/freelancer/social-links`            | GET    | Get all freelancer social links.                               |
| `/freelancer/social-links`            | POST   | Add a social link.                                             |
| `/freelancer/social-links/:id`        | PATCH  | Update a social link.                                          |
| `/freelancer/social-links/:id`        | DELETE | Delete a social link.                                          |
| `/projects/:project/apply`            | POST   | Apply for a project as freelancer (proposal).                  |
| `/freelancer/proposals/:proposal`     | PUT    | Update a proposal.                                             |
| `/freelancer/proposals/:proposal`     | DELETE | Delete a proposal.                                             |
| `/freelancer/profile`                 | GET    | Show freelancer profile.                                       |
| `/freelancer/profile`                 | PUT    | Update freelancer profile.                                     |
| `/freelancer/profile`                 | DELETE | Delete freelancer profile.                                     |
| `/freelancer/skills`                  | POST   | Add skills to freelancer profile.                              |
| `/freelancer/image`                   | POST   | Upload/update freelancer profile image.                        |
| `/projects`                           | POST   | Post a new client project.                                     |
| `/projects/:project`                  | GET    | Show project details.                                          |
| `/projects/:project`                  | PUT    | Update project details.                                        |
| `/projects/:project`                  | DELETE | Delete a project.                                              |
| `/projects/{project}/reviews`         | POST   | Add a review for a project.                                    |
| `/reviews/{review}` | PUT    | Update a review for a project.                                 |
| `/client/profile`                     | GET    | Show client profile.                                           |
| `/client/profile`                     | PUT    | Update client profile.                                         |
| `/skills`                             | GET    | Get all skills list.                                           |
| `/projects`                           | GET    | Get all projects (with filters: skills, budget, search, etc.). |


---

## 📂 Project Structure

```plaintext
project/
│
├── backend/ # Laravel backend
├── frontend/ # React + TypeScript frontend
├── README.md # Project documentation
└── ...
```

## 📸 Screenshots / Demo

[Demo Project](https://drive.google.com/file/d/1tZnFJcazXO_As75dhbD0SrQeaaGTAaO4/view?usp=sharing)

## 📌 How to Run Locally
Make sure Node.js, npm, and PHP are installed on your system.

1. **Clone the repository**

```bash
git clone https://github.com/username/projectname.git
cd projectname
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
