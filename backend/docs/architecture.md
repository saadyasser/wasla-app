# Project Architecture

This document provides an overview of the architectural components and design principles used in the project to ensure scalability, maintainability, and ease of development.

## Table of Contents

-   [Entity-Relationship Diagram (ERD)](#entity-relationship-diagram-erd)
-   [MVC Structure](#mvc-structure)
-   [Factory Pattern](#factory-pattern)
-   [Testing](#testing)
-   [Services Layer](#services-layer)
-   [Authorization Policies](#authorization-policies)
-   [SOLID Principles](#solid-principles)

## Entity-Relationship Diagram (ERD)

The ERD provides a comprehensive overview of the project's database structure, detailing the tables, their relationships (e.g., one-to-one, one-to-many), and the data flow between them. It serves as a critical reference for developers to understand the database schema and streamline development tasks.

-   **Location**: `docs/erd/index.html`
-   **Generated Using**: `kevincobain2000/laravel-erd` (installed via `composer require kevincobain2000/laravel-erd --dev`)
-   **Features**:
    -   Interactive diagram with filtering options by table name and relationship type
    -   Visual representation of all tables and their connections
-   **Purpose**: Facilitates quick understanding of the database structure, aiding in development, debugging, and maintenance

[View ERD](/docs/erd/index.html)

## MVC Structure with Advanced Layers

Laravel follows the **MVC architecture**, which separates concerns and makes the code easier to maintain and scale. MVC organizes the project into three main layers: Models, Views/Resources, and Controllers.

-   **Models**: Represent data and interact with the database. Example: `Project.php`
-   **Resources/Views**: Format JSON responses. Example: `FreelancerProjectResource.php`
-   **Controllers**: Handle HTTP requests and connect Models to Views. Example: `ProposalController.php`

### Additional Layers for Better Organization

To keep our Controllers slim and organized, we added extra layers:

-   **Services**: Handle main business logic outside Controllers. Example: `ProposalService.php`
-   **Requests**: Validate and authorize incoming data. Example: `ProposalRequest.php`
-   **Policies**: Manage user permissions based on roles. Example: `ProposalPolicy.php`
-   **Middleware**: Filter or process requests (e.g., check roles or authentication). Example: `CheckFreelancer.php`

Below is an example MVC diagram illustrating the structure:

![MVC Structure](/docs/Images/mvc_structure.png)
This structure keeps the code **clean, modular, and easy to maintain**.

## Factory Pattern

The Factory Pattern is used to create objects without specifying the exact class of the object to be created.  
In this project, it is used to create user-specific profile objects based on roles (Client or Freelancer).

-   **Usage**: Factories are used for generating test data, seeding the database, and creating user-specific profiles through a unified interface.

```php
    $user = User::factory()->create(['role' => UserRole::Client]);

    $creator = ProfileFactory::make($user);

```

**Location:**

-   **Factory classes:** `database/factories`
-   **Creator classes:** `app/Services/Profile`

**Key Components:**

-   **ProfileFactory:** Determines the correct creator based on `UserRole`
-   **ProfileCreator Interface:** Defines the contract for profile creation
-   **ClientProfileCreator & FreelancerProfileCreator:** Concrete implementations for creating respective profiles

## Testing

Testing is a core component of the project to ensure code quality and reliability:

-   **Unit Tests**: Test individual components and functions using **PHPUnit**.  
    Example: `tests/Unit/ProfileFactoryTest` ensures the correct profile creator is returned for each user role.

-   **Feature Tests**: Validate the integrated behavior of features, including end-to-end flows like proposal submission.  
    Example: `tests/Feature/ApplyToProjectTest` is written using **Pest**, which provides a modern, expressive syntax.

-   **Automated API Testing**: Using **Apidog** to validate endpoints, parameters, and responses.  
    Example test scenarios:

    -   `Check: Client can successfully create a project`
    -   `Check: Freelancer can apply to a project`

-   **Tools**:

    -   PHPUnit for Unit testing.
    -   Pest for Feature testing (modern syntax, readable, and compatible with Laravel).
    -   Laravel's testing utilities for database factories, HTTP requests, Sanctum authentication, and storage fakes.

-   **Location**: Tests are stored in the `tests` directory.

-   **Running tests**:

```bash
  # Run all tests via Artisan
  php artisan test

  # Or run PHPUnit directly for Unit tests
  vendor/bin/phpunit

  # Or run Pest directly for Feature tests
  vendor/bin/pest
```

Below is an example of PHPUnit test results demonstrating successful test runs:

![Unit and Feature Testing](/docs/Images/Unit&FeatureTesting.png)

Example of Test Scenarios test results `Check: Freelancer can apply to a project`
![Testing Scenario Apply of Project](/docs/Images/ApiTesting.jpg)

`Check: Freelancer can apply to a project`
![Testing Scenario Apply of Project](/docs/Images/ApiTesting_Client_CanPost.png)

## Services Layer

The Services Layer encapsulates business logic, keeping controllers thin and reusable:

-   **Purpose**: Centralizes complex logic, making it easier to maintain and test.
-   **Location**: Service classes are located in `app/Services`.
-   **Usage**: Services handle tasks such as data processing, external API calls, and business rule enforcement.
    Ex: `FreelancerProfileServicis`

```php

interface ProposalServiceInterface
{
    public function createProposal(Request $request, int $freelancerId, int $projectId): Proposal;
    public function updateProposal(Proposal $proposal, array $data): Proposal;
    public function deleteProposal(Proposal $proposal): void;
}

class ProposalService implements ProposalServiceInterface
{
    /**
     * Proposal Submission
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int   $freelancerId
     * @param  int   $projectId
     * @return Proposal
     *
     * @throws \Exception إذا تمت محاولة التقديم مرتين
     */
    public function createProposal(Request $request, int $freelancerId, int $projectId): Proposal
    {

        $alreadyApplied = Proposal::where('project_id', $projectId)
            ->where('freelancer_profile_id', $freelancerId)
            ->exists();

        if ($alreadyApplied) {
            throw new \Exception('You have already applied to this project.');
        }


        $attachmentPath = $request->hasFile('attachment')
            ? $this->storeAttachment($request->file('attachment'), $freelancerId)
            : null;


        $data = $request->validated();
        $data['project_id'] = $projectId;
        $data['freelancer_profile_id'] = $freelancerId;
        $data['attachment'] = $attachmentPath;


        return Proposal::create($data);
    }


    protected function storeAttachment($file, int $freelancerId): ?string
    {
        $filename = time() . '_' . $file->getClientOriginalName();

        return $file->storeAs("attachments/{$freelancerId}", $filename, 'public');
    }
}

// Controlller Request & Responce

class ProposalController extends Controller
{
    use ApiResponse;
    use AuthorizesRequests;

 public function __construct(protected ProposalServiceInterface $proposalService){}

    public function store(ProposalRequest $request, $projectId)
    {
        $project = Project::find($projectId);

        if (! $project) {
            return $this->errorResponse('Project not found', 404);
        }

        $freelancer = Auth::user()->freelancerProfile;

        $this->authorize('create', [Proposal::class, $project]);

        try {
            $proposal = $this->proposalService->createProposal($request, $freelancer->id, $project->id);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 409);
        }

        return $this->successResponse(new ProposalResource($proposal), 'Proposal submitted successfully', 201);
    }
}
```

## Authorization Policies

Laravel Policies are used to manage authorization logic across the application, ensuring secure and consistent access control for critical resources.

-   **Location**: All policy classes are located in `app/Policies`.

-   **Implemented Policies**:

    -   **ProjectPolicy**

        -   Only project owners can update or delete their projects.
        -   Projects must be in the `Open` status to be editable or deletable.
        -   Ensures only clients with a profile can create projects.

    -   **ProposalPolicy**

        -   Only freelancers with a profile can apply to projects.
        -   Applications are restricted to `Open` projects.
        -   Prevents duplicate proposals from the same freelancer.
        -   Clients can accept proposals only for their own projects.

    -   **ReviewPolicy**
        -   Only clients can leave a review after the project is marked as `Completed`.
        -   Ensures one review per project.
        -   Allows clients to edit their reviews within 24 hours of creation.

-   **Usage in Code**:  
    Policies are enforced inside controllers  using Laravel's `authorize` helper.

    **Example – Applying to a Project (ProposalController):**

```php
  public function store(Request $request, Project $project)
  {
      // Ensure the user is authorized to apply for this project
      $this->authorize('create', [Proposal::class, $project]);

      return $this->proposalService->createProposal($request->user(), $project, $request->validated());
  }
```

## SOLID Principles Applied

### 1. Single Responsibility Principle (SRP)

**Definition:** Each class should have only one reason to change.  
**Example from Project:**  
`ProjectService` handles only the business logic related to projects, such as creating, updating, and deleting projects.  
Controllers remain slim and only handle HTTP requests and responses.

```php
    $project = $this->service->createProject(Auth::user(), $request->validated());
```

### 2. Liskov Substitution Principle (LSP)

**Definition:** Subclasses should be replaceable for their parent class without affecting the correctness of the program.

**Example from Project:**  
`ClientProfileCreator` and `FreelancerProfileCreator` both implement `ProfileCreator` interface.
`ProfileFactory` can return any of these without the calling code knowing the exact subclass.

```php
    $creator = ProfileFactory::make($user);
    $creator->createProfile($user); // Works regardless of actual subclass
```

### 3. Interface Segregation Principle (ISP)

**Definition:** Clients should not be forced to implement interfaces they do not use

**Example from Project:**

`ProposalServiceInterface` contains only the methods required by controllers, avoiding unnecessary functions.

```php
interface ProposalServiceInterface
{
    public function createProposal(Request $request, int $freelancerId, int $projectId): Proposal;
    public function updateProposal(Proposal $proposal, array $data): Proposal;
    public function deleteProposal(Proposal $proposal): void;
}

```


### 4. Dependency Inversion Principle (DIP)

**Definition:** High-level modules should not depend on low-level modules; both should depend on abstractions.

**Example from Project:**

`ProposalController` depends on ProposalServiceInterface (abstraction), not directly on ProposalService.

```php

public function __construct(protected ProposalServiceInterface $proposalService){}

```



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
