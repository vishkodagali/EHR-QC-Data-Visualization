# Multimodal Medical Data Visualization Web Application

This project is a web application that enables accessible visualization of graphs and statistics from the EHR-QC pipeline. The primary goal of this project is to create an intuitive, user-friendly interface for processing electronic health records, providing data standardization, and offering dynamic data visualization options.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)

## Features
- **Data Querying and Filtering:** Users can query and filter data using a dynamic interface with various filtering criteria.
- **Dynamic Data Visualization:** Multiple visualization options like bar charts, scatter plots, violin plots, and more.
- **Data Standardization:** Standardizes and preprocesses imported CSV data using the EHR-QC pipeline.
- **Report Generation:** Users can generate custom charts and export them in PDF format.

## Tech Stack
- **Frontend:** React.js, JavaScript
- **Backend:** Python Flask
- **Server:** Node.js, Docker
- **Database:** PostgreSQL
- **Version Control:** GitLab
- **Testing:** Jest for frontend, pytest for backend, Selenium for end-to-end testing

## Getting Started
These instructions will help you set up the project on your local machine for development and testing.

### Prerequisites
- Docker and Docker Compose
- Node.js (14.x or higher)
- npm (Node Package Manager)
- Python (3.9 or higher)
- PostgreSQL
- Git for version control
- Flask and React libraries

### Installation
1. **Clone the Repository:**
    ```bash
    git clone https://gitlab.com/datascience5722112/ehrqc-web.git
    cd ehrqc-web
    ```
2. **Install Submodules:**
    ```bash
    git submodule init && git submodule update
    ```
3. **Build the Docker Container:**
    ```bash
    docker compose build
    ```
4. **Run the Application:**
    ```bash
    sudo docker compose up -d
    ```
5. Access the application through `localhost:80` after completing the setup.

## Usage
- **Data Standardization:** Upload CSV files for data standardization and processing using the EHR-QC pipeline.
- **Graphing:** Select columns to generate different types of plots such as bar charts, pie charts, violin plots, and more.
- **Data Import:** Import SQL staging files for further data visualization.

### Importing Data
- Upload the required CSV and SQL files as per the application instructions.
- For graph generation, select the appropriate columns and click on the "Generate" button for each chart type.

## Testing
- **Unit Tests:** Located in the `/tests` directory, written using Jest for frontend and pytest for the backend.
- **Integration Testing:** Ensures the seamless interaction between the Flask backend and the React frontend.
- **Manual Testing:** Run through different user scenarios to validate the application functionalities.

### Running Unit Tests
- **Backend Tests:**
    ```bash
    pytest
    ```
- **Frontend Tests:**
    ```bash
    npm test
    ```

## Project Structure
- `react-ehrqc-web/`: Contains the React frontend code.
- `server/`: Contains the Python Flask backend code.
- `reverse_proxy/`: Configuration for Nginx to connect the React frontend and Flask backend in Docker.
- `tests/`: Contains unit and functional test cases for the application.

## Contributing
- Follow the GitLab flow with feature branches and merge requests.
- Keep code clean and well-commented.
- Use Prettier for code formatting.

## Acknowledgements
- Project sponsors: Sonika Tyagi and Yashpal from RMIT.
- Supervisor: Prabha.
- The entire team for their efforts in building this application.

