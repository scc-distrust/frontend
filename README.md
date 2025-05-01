# Distrust

**Real-Life Social Deduction Mobile Game**

---

## About the Project
Distrust is a cross-platform mobile game inspired by the popular hit game *Among Us*. It brings social deduction gameplay into real life, allowing players to interact in person while connecting through their phones. Players are assigned roles as "Workers" or "Traitors," completing tasks or eliminating others to win the game. The app uses geolocation, QR code scanning, and real-time mobile communication to make the experience immersive.

## Features
- **Cross-Platform Support:** iOS and Android mobile devices.
- **Role Assignment:** Random assignment of Workers and Traitors.
- **Task Completion:** Scan QR codes to complete tasks.
- **Eliminations:** Traitors can eliminate workers based on proximity.
- **Meetings and Voting:** Players can call meetings to discuss and vote.
- **Victory Conditions:**
  - Workers complete all tasks.
  - Traitors eliminate enough workers.
- **Flexible Setup:** Host games locally or remotely with desktop servers.

## Technologies Used
- **Frontend:** TypeScript, CapacitorJS, Svelte
- **Backend:** NestJS, NodeJS, Prisma ORM
- **Database:** SQLite (flat file)
- **Other Tools:** Docker, Visual Studio Code

## System Requirements
- **Mobile Devices:** Android/iOS Smartphones and Tablets
- **Server:** Windows, MacOS, or Linux machine to run the backend
- **Internet Connection:** Required for server connection and gameplay
- **Storage:** Minimum 250MB free space

## Installation and Setup
### Server Setup
1. Clone the repository.
2. Install dependencies:
```bash
npm install
```
3. Run the server:
```bash
npm run start
```
(Optional) Use Docker to containerize the backend for easy deployment.

### Mobile App Installation
1. Install the app from the App Store (iOS) or Google Play Store (Android).
2. Open the app and connect to the provided server address.

### Game Start
1. Host sets up printed QR codes at physical locations.
2. Players join by entering username and server address.
3. Host starts the game; players receive their roles.
4. Gameplay begins!

## Gameplay Overview
- **Workers:** Complete assigned QR-based tasks.
- **Traitors:** Eliminate workers while avoiding detection.
- **Meetings:** Discuss and vote to eject suspected traitors.
- **Winning:** Complete tasks (Workers) or eliminate the opposing side (Traitors).

## Promo Video
Check out the gameplay in action:  
[Watch the Promo Video](https://youtu.be/ZatgoWPPdko)

## Hi-Fi Mockups
Here's a preview of the Distrust application design:

### Login Screen
<img width="274" alt="Screenshot 2025-02-17 at 11 07 14 AM" src="https://github.com/user-attachments/assets/45b3b59c-6fc9-4a6e-8091-88467f7e21d7" />

### Waiting Room
<img width="274" alt="Screenshot 2025-02-17 at 11 12 23 AM" src="https://github.com/user-attachments/assets/b08aa7cf-e043-46be-9c77-c480b46e6a9a" />

### Gameplay Screen (Worker)
<img width="274" alt="Screenshot 2025-02-17 at 11 27 36 AM" src="https://github.com/user-attachments/assets/117f531e-4428-4fd9-9b64-963d425b54fa" />

### Gameplay Screen (Traitor)
<img width="274" alt="Screenshot 2025-02-17 at 11 27 36 AM" src="https://github.com/user-attachments/assets/6114f728-d3fc-4bce-8cf5-7ac5a8027aa8" />

### Meeting Room
<img width="274" alt="Screenshot 2025-02-17 at 11 30 06 AM" src="https://github.com/user-attachments/assets/6d2ccfd0-2076-45fe-897d-e5bfcddbb7e9" />

### Calibrate Distribution Task
<img width="274" alt="Screenshot 2025-02-17 at 11 31 48 AM" src="https://github.com/user-attachments/assets/c1cd740d-afed-49de-9c31-3e42e9a4eb26" />

## License
This project is for educational and non-commercial use. Please consult us for permission if you plan to build upon or commercialize this project.

## Team
- **Santio Yousif**
- **Devanshu Chiragkumar Suthar**

---

**"Trust no one. Play with everyone."**

