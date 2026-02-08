# 🌌 Cosmic Watch – Near-Earth Object Monitoring Dashboard

Cosmic Watch is a full-stack web application that visualizes **Near-Earth Objects (NEOs)** using real data from **NASA’s Near-Earth Object Web Service (NeoWs)**.  
The project aims to convert complex asteroid telemetry into a **clear, public-friendly risk dashboard**.

This repository contains the complete source code for the backend API and frontend dashboard.

---

## 🚀 Features

- 🌍 **Near-Real-Time NEO Data**
  - Fetches daily close-approach asteroid data from NASA NeoWs
  - Displays velocity, size, miss distance, and hazard status

- ⚠️ **Risk Classification Engine**
  - Rule-based risk scoring inspired by the Torino Scale
  - Categorizes asteroids into Low / Medium / High risk

- 📊 **Interactive Dashboard**
  - Responsive dark-themed UI
  - Card-based layout with color-coded alerts
  - Dynamic rendering using JavaScript

- 🔐 **User Authentication (MERN Stack)**
  - Secure login system for researchers and enthusiasts
  - Allows saving watched asteroids and preferences

- 🔔 **Alert & Monitoring System**
  - Highlights upcoming close-approach events on the dashboard

- 🐳 **Containerized Deployment**
  - Docker-ready setup for frontend, backend, and database
  - Easy orchestration using Docker Compose

---

## 🧠 System Architecture


- Frontend communicates **only** with the backend  
- Backend handles all NASA API requests  
- External data is processed before visualization  

---

## 🛠 Tech Stack

### Frontend
- HTML, CSS, JavaScript
- React (for MERN version)
- Tailwind CSS

### Backend
- Node.js
- Express
- Axios

### Database
- MongoDB

### External API
- NASA Near-Earth Object Web Service (NeoWs)

### Deployment
- Docker
- Docker Compose

---

## 📦 Project Structure


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/AMpanda07/NEOdashboard.git
cd NEOdashboard
