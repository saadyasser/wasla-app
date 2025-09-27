# Freelancing Platform for Palestinian Freelancers
**Wasla APP** 
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

---

## 🌟 Future Enhancements
- AI-powered recommendations for matching freelancers to projects.  
- Support Us page for sponsorships/donations.  
- Advanced analytics and dashboards.  
- Payment gateway integration.  

---

## 🎨 UX/UI Designs
> Add screenshots or links to your wireframes / mockups (Figma, XD …)

- [Figma](https://www.figma.com/design/NVcLpqeada1B1irccKxkTC/Palestinian-Freelancer-Connection-Platform?node-id=0-1&p=f&t=L90lO7AxSkAurNVO-0)

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

## Screenshots

<img width="527" height="915" alt="signup" src="https://github.com/user-attachments/assets/a8927cc2-d0d0-44f6-938c-c9c4c0e7750b" />

<img width="502" height="871" alt="signin" src="https://github.com/user-attachments/assets/803991b4-2f6b-4c83-9552-2dd6e2f865b7" />

<img width="1890" height="800" alt="1" src="https://github.com/user-attachments/assets/a1ac73fb-0f98-4d23-882f-32f4339b16dd" />

<img width="1899" height="919" alt="2" src="https://github.com/user-attachments/assets/29cf0f2a-8182-45ba-a7bb-2c1cf9ca8572" />

<img width="1920" height="904" alt="3" src="https://github.com/user-attachments/assets/cd8c45a1-3d21-4c6a-a01e-04d5b0298420" />

<img width="1920" height="921" alt="4" src="https://github.com/user-attachments/assets/319bee9a-6ce9-492c-87d5-9be1e1dc6439" />

<img width="1920" height="924" alt="5" src="https://github.com/user-attachments/assets/85cac871-1b48-47f2-b226-fc45c87d7a35" />

<img width="1920" height="923" alt="6" src="https://github.com/user-attachments/assets/818c7fa5-6a2d-45fa-adb6-340e7f61f139" />

<img width="1920" height="863" alt="7" src="https://github.com/user-attachments/assets/34052fcc-8b40-4849-9e38-51578e9a374c" />

<img width="1920" height="911" alt="8" src="https://github.com/user-attachments/assets/81c79ef8-1631-43bc-9eef-8b9128ae63e8" />

<img width="1920" height="915" alt="9" src="https://github.com/user-attachments/assets/685d808d-0bcb-4689-8e38-c58879b99021" />

<img width="1920" height="912" alt="10" src="https://github.com/user-attachments/assets/8bb07cca-52a9-4b04-bf10-64ad14043566" />

<img width="1920" height="909" alt="11" src="https://github.com/user-attachments/assets/0969b17b-b63a-4208-ae7d-da29b7a9bb45" />

<img width="1920" height="773" alt="12" src="https://github.com/user-attachments/assets/44853144-0be4-415c-8f5f-dd3e67053b7e" />

<img width="1542" height="835" alt="13 (2)" src="https://github.com/user-attachments/assets/3eebf966-b6ba-45d4-adeb-517ad83950c6" />

<img width="891" height="338" alt="pomp" src="https://github.com/user-attachments/assets/1a7b669f-7ecf-49cd-9814-9a33fd5e8d43" />

<img width="1920" height="922" alt="14" src="https://github.com/user-attachments/assets/b9e988e4-18da-4ae6-96b5-e061fbd8ab0d" />

<img width="1920" height="910" alt="15" src="https://github.com/user-attachments/assets/66c3fdc5-1ad4-4c2a-8c7f-bc5bf044fa0e" />

<img width="1920" height="833" alt="16" src="https://github.com/user-attachments/assets/ceac15fa-05a7-4b63-9755-ba3ded6a0908" />



MIT License
