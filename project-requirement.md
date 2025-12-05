Legend (Context)
You are developing a dashboard for an organization that captures yokai (spirits). Operators need to see spikes in spiritual energy in different areas of Tokyo in real time and be able to dispatch cleanup teams.

Task
Develop an SPA based on Next.js (App Router) to monitor anomalies (spirits) in real time.

🛠 Stack and Restrictions
Core: React 18+, Next.js (App Router).
Architecture: Strict Feature Sliced ​​Design (FSD).
State & Async: TanStack Query.
Styling: SCSS Modules. Disabled: Tailwind, Styled Components.
Validation: Zod (validate all incoming data).
DevOps: Docker Compose for launch.

📋 Functional Requirements
The application consists of a single page, /monitoring, which contains:

1. Anomaly List
• Display a list of spirits (a set of cards).
• Mock data using Next.js Route Handlers.
• Fields: Name (e.g., Kitsune), Threat Level (color code), Location, Status (Active/Caught).

2. Interaction
• The spirit card should have a "Capture" button.
• On click:
— Sends a mutation to the API.
— Optimistic Update is applied (the interface is updated instantly).
— With a 30% probability, the API should return an error—the interface should correctly roll back and display a notification.

3. Real-time Update
Implement Server-Sent Events (SSE) or simulate a WebSocket.
Every 5 seconds, a random spirit should change its threat level (for example, from "Low" to "Critical").
The UI should respond to this event without reloading the page.

📦 Result
Link to the GitHub repository. The root should contain a docker-compose.yml file, allowing you to run the project with a single command: docker-compose up.