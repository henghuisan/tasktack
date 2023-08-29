<h1 align="center" id="title"> TaskTack </h1>

<a href="https://todo-list-five-sooty.vercel.app/tasks/all" target="_blank">TaskTack</a>
is a simple task management application inspired by 
<a href="https://www.ticktick.com/" target="_blank">TickTick</a>.
It allows users to organize their tasks and to-do items efficiently.


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

### Clone Repository
```
git https://github.com/henghuisan/tasktack.git
```

### Step 2: Frontend ####
To run the frontend of TaskTack locally, follow these steps:

```bash
cd frontend
npm install
npm start
```

Open your browser and visit http://localhost:3000.

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
python3 -m venv venv
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

## ☎️ Contact

For questions or feedback, feel free to reach out:

- Email: gracehenghuisan@gmail.com