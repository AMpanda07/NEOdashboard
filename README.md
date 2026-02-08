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

