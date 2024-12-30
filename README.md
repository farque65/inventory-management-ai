# Inventory Management AI

Collectibles Inventory is a web application designed to help users manage their collections of various items. The application allows users to create, update, and delete collectibles and organize them into collections. It also provides authentication and authorization features to ensure that users can only manage their own data.

## Features

- User authentication and registration
- Create, update, and delete collectibles
- Organize collectibles into collections
- Upload images for collectibles
- Responsive design with Tailwind CSS
- Integration with Supabase for backend services

## Technologies Used

- Frontend: React, TypeScript, Tailwind CSS, Vite
- Backend: Django, Django REST Framework, PostgreSQL
- Authentication: dj-rest-auth, Django Allauth
- Database: Supabase
- Containerization: Docker, Docker Compose

## Getting Started

### Prerequisites

- Node.js and npm
- Docker and Docker Compose

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/collectibles-inventory.git
   cd collectibles-inventory

2. Install frontend dependencies:

    ```sh
    npm install

3. Create a .env file in the root directory and add the following environment variables:
    
    ```sh
    VITE_SUPABASE_URL=your-supabase-url
    VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

4. Start the frontend development server:
    cd ..
    npm run dev

## Usage

1. Open your browser and navigate to http://localhost:5173.
2. Register a new account or log in with an existing account.
3. Start managing your collectibles and collections.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
