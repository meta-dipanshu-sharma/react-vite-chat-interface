💬 Real-Time Chat Application
=============================

A high-performance, responsive chat interface built with **React**, **TypeScript**, and **SCSS**. This project demonstrates modern frontend patterns including Optimistic UI updates, custom hooks for state management, and efficient API polling.

🚀 Key Features
---------------

*   **Real-Time Sync:** Implemented a polling "heartbeat" (3s) that only fetches new messages using a createdAt timestamp filter (after parameter).
    
*   **Optimistic UI:** Messages appear instantly in the UI with a temporary ID before being "swapped" for the permanent MongoDB \_id upon successful server confirmation.
    
*   **Responsive Design:** Fully fluid layouts targeting **S** (Mobile), **M** (Tablet), and **L** (Desktop) screen sizes.
    
*   **Auto-Scrolling:** Intelligent scroll-to-bottom behavior when new messages arrive.
    
*   **Type Safety:** End-to-end TypeScript integration for API payloads, component props, and event handling.
    

🛠 Tech Stack
-------------

*   **Frontend:** React 18+, TypeScript, SCSS (BEM Architecture).
    
*   **State Management:** Custom useChat hook for encapsulated business logic.
    
*   **API:** Native Fetch API with Bearer Token authentication.
    
*   **Utilities:** Native Intl.DateTimeFormat for localized, lightweight date formatting.
    

🏗 Architectural Decisions
--------------------------

### 1\. The "After" Polling Strategy

Instead of re-fetching the entire message history every few seconds, the application tracks the createdAt timestamp of the last message in the local state. By sending this as an after parameter to the API, we significantly reduce bandwidth and prevent unnecessary re-renders.

### 2\. Optimistic Updates & ID Swapping

To ensure a "zero-latency" feel, the app pushes messages to the UI immediately with a temporary local ID. Once the backend returns the official MongoDB \_id, the hook silently swaps the temporary object for the server-validated one. This maintains data integrity without making the user wait for a loading spinner.

### 3\. Semantic HTML & Accessibility
*   The "Enter" key works natively on Desktop.
    
*   The "Send/Go" button works natively on mobile virtual keyboards.
    
*   Better support for screen readers.
    

📥 Getting Started
------------------

### Prerequisites

*   Node.js (v20+)
    
*   Docker (to run the provided backend container)

*   Backend API: This project is designed to interface with the [Doodle Frontend Challenge Chat API](https://github.com/DoodleScheduling/frontend-challenge-chat-api). Ensure the local server is running at http://localhost:3000 before starting the frontend.
    

### Installation

1.  **Clone the repository**
    
2.  `npm install`
    
3.  `npm run dev`
    

🧪 Testing Focus
----------------

*   Verified message deduplication logic to handle React 18 Strict Mode double-mounting.
    
*   Tested mobile responsiveness (375px width) to ensure bubbles wrap correctly.
    
*   Validated error states (rollback) by simulating API failures during message sending.