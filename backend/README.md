# Wasla Backend - Core API

Welcome to the backend repository of **Wasla APP**. This subsystem handles the core business logic, secure data persistence, and RESTful API endpoints powering the Palestinian Freelancers Connection Platform.

## 🏗️ Architectural Overview

This system is built on top of Laravel, expanding the standard MVC pattern into a highly scalable and decoupled architecture designed to enforce clean code and maintainability.

### Key Design Patterns Implemented:
* **Services Layer:** Business logic is isolated from controllers into dedicated, reusable services (e.g., `ProposalService`).
* **Factory Design Pattern:** Dynamic creation of role-specific profiles (`Client` or `Freelancer`) using a unified `ProfileFactory` interface.
* **Granular Authorization:** Secure access control managed via dedicated Laravel Policies (`ProjectPolicy`, `ProposalPolicy`, `ReviewPolicy`).
* **SOLID Principles:** Strictly adhered to throughout development (SRP, LSP, ISP, DIP) to maintain clean code and high testability.

> 📘 **Full Architectural Blueprint:**
> For a deep-dive analysis into the code structures, concrete examples of our design patterns, and SOLID implementations, please refer to the comprehensive [System Architecture Documentation](./docs/architecture.md).

## 📡 API Documentation & Live Collection

Our endpoints follow strict RESTful standards and are fully documented, with structured validation rules (`FormRequests`) and safe API responses (`JsonResources`).

* **Interactive API Docs:** Browse endpoints, examples, and try out live requests via [Apidog Documents](https://12r27tnz98.apidog.io/).
