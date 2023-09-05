<h1 align="center" id="title"> TaskTack </h1>

<a href="https://todo-list-five-sooty.vercel.app/tasks/all" target="_blank">TaskTack</a>
is a simple task management application inspired by 
<a href="https://www.ticktick.com/" target="_blank">TickTick</a>.
It allows users to organize their tasks and to-do items efficiently.

![TaskTack](https://github.com/henghuisan/tasktack/assets/76814491/c2ca55d2-f768-437a-be6b-50bf5261d63d)


## Table of Contents

[💻 Tech Stack](#tech-stack) <br />
[🛠️ Getting Started](#getting-started) <br />
[☎️ Contact](#contact) <br />


## 💻 Tech Stack

### Frontend Development

- Framework: [React](https://reactjs.org/)
- State Management: [Redux](https://redux.js.org/)
- Routing: [React Router](https://reactrouter.com/)
- UI Framework: [Material-UI](https://mui.com/)

### Backend Development

- Framework: [Django](https://www.djangoproject.com/)
- API Framework: [Django Rest Framework](https://www.django-rest-framework.org/)


### Database

- [MongoDB](https://www.mongodb.com/) for efficient database management.
- Implemented collections and embedded data for streamlined data organization.
- [Djongo](https://www.djongomapper.com/) used for connecting Django to MongoDB.



## 🛠️ Getting Started

### Step 1: Prerequisite
Before you begin, ensure you have the following requirements in place:

- **Python**: Install Python from the [Python website](https://www.python.org/downloads/).

- **Node.js**: Download Node.js from the [Node.js website](https://nodejs.org/).

- **npm**: Ensure npm is up to date by running:
  ```sh
  npm install -g npm
  ```
- **MongoDB**: Create account from the [MongoDB website](https://www.mongodb.com/).

### Step 2: Clone Repository
Clone this repository to your local machine using:

``` bash
git https://github.com/henghuisan/tasktack.git
```

Now, navigate to the cloned directory:


### Step 3: Backend Setup 
To run the backend of TaskTack locally, follow these steps:

#### 3.1 Create a Virtual Environment
Navigate to the cloned directory:

``` bash
cd furniture-store-recommendation-system
```

Create a virtual environment:

- On macOS and Linux:
``` bash
python4 -m venv venv
source venv/bin/activate
```

- On Windows:
``` bash
python -m venv venv
venv\Scripts\activate
```

#### 3.2 Install Dependencies
Install the required Python packages using pip:
```bash
pip install -r requirements.txt
```

#### 3.3 Define Environment Variables
Create a `.env` file by coping and paste the `.env.example` file from root directory and define the necessary environment variables.

#### 3.4 Apply Migrations
Apply database migrations to set up the database schema:
```bash
python manage.py migrate
```

#### 3.5 Run the Development Server
Start the development server and run the app:
```bash
python manage.py runserver
```

Open your browser and visit http://127.0.0.1:8000/api/ to manage CRUD operation.


### Step 4: Frontend
To run the frontend of TaskTack locally, follow these steps:

```bash
cd frontend
npm install
npm start
```

Open your browser and visit http://localhost:3000

## ☎️ Contact

For questions or feedback, feel free to reach out:

- Email: gracehenghuisan@gmail.com
