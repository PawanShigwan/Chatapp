# Real-Time Chat App

A modern, real-time chat application built with Spring Boot, WebSockets, and React. 

## 🚀 Tech Stack

### Frontend
- **Framework:** React + Vite
- **Styling:** Tailwind CSS + Radix UI (shadcn/ui)
- **Authentication:** Clerk
- **WebSockets:** `@stomp/stompjs` and `sockjs-client`
- **Routing:** React Router DOM

### Backend
- **Framework:** Spring Boot 3.4.0 (Java 21)
- **Database:** MongoDB Atlas (Spring Data MongoDB)
- **WebSockets:** Spring Boot Starter WebSocket
- **Build Tool:** Maven

## ✨ Features
- **Real-Time Messaging:** Instant message delivery using WebSockets (STOMP protocol).
- **Rooms System:** Create custom chat rooms or join existing ones using a Room ID.
- **Authentication:** Secure user authentication provided by Clerk.
- **Modern UI/UX:** Responsive, dark-themed UI built with Tailwind CSS and Radix primitives.
- **Message History:** Persisted chat history stored in MongoDB Atlas, loaded instantly upon joining a room.

## 🛠️ Local Development

### Prerequisites
- Node.js & npm
- Java 21 & Maven
- MongoDB Atlas cluster URL
- Clerk API keys

### Setup the Backend
1. Navigate to the `chat-app-backend` directory.
2. Ensure your MongoDB Atlas connection string is correctly configured in `src/main/resources/application.properties`:
   ```properties
   spring.data.mongodb.uri=mongodb+srv://<user>:<password>@cluster0...
   ```
3. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```
   *The backend will start on `http://localhost:8080`.*

### Setup the Frontend
1. Navigate to the `chatapp-frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Ensure your Clerk keys and backend API URL are set up (e.g., in `AxiosHelper.js` or via `.env` files).
4. Run the Vite dev server:
   ```bash
   npm run dev
   ```
   *The frontend will start on `http://localhost:5173`.*

## 🚀 Deployment

This project is configured for deployment:
- **Frontend:** Vercel (Ready out-of-the-box. Ensure you set your Clerk environment variables in the Vercel dashboard).
- **Backend:** Render (Ensure you set up a Web Service, select the Java environment, and provide the command `./mvnw spring-boot:run` or configure a `.jar` build). 

**Note:** Global CORS has been configured in `ChatAppBackendApplication.java` to support any frontend origin (`allowedOriginPatterns("*")`), making it seamlessly compatible with Vercel domains.
