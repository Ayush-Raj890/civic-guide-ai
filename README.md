# CivicGuide AI

![CivicGuide AI Header](./src/assets/hero-vote.jpg) *(Replace with actual banner image)*

---

## 1. Abstract / Overview
**CivicGuide AI** is an interactive, purely client-side web application designed to simplify and demystify the electoral process for voters worldwide. By offering a step-by-step interactive guide, visual timelines, and a smart chat assistant, CivicGuide AI aims to empower citizens with the knowledge they need to participate confidently in democracy. The application is built with an emphasis on extremely fast performance, local data privacy, and a stunning, highly accessible user interface.

## 2. Problem Statement
Electoral processes, including voter registration, absentee voting, and polling station procedures, are often bogged down by complex bureaucratic jargon. First-time voters and marginalized communities frequently struggle to find clear, concise, and non-partisan information. Existing government websites are often outdated, difficult to navigate, and lack interactive or contextual assistance, leading to lower voter turnout and disenfranchisement.

## 3. Objectives
- **Simplify Democracy:** Break down complex electoral laws into easily digestible steps and visual timelines.
- **Provide Instant Answers:** Offer a smart, interactive AI chatbot to answer specific user queries immediately.
- **Ensure Privacy:** Operate completely without a backend database so that user chat histories and queries never leave their personal device.
- **Deliver a Premium Experience:** Utilize modern web design (glassmorphism, micro-animations) to make learning about civics an engaging experience.

## 4. Features
- **Step-by-Step Voter Guide:** Detailed cards explaining the 5 key phases of an election (Registration, Campaigning, Voting Day, Counting, Results).
- **Interactive Visual Timeline:** Chronological mapping of election events.
- **CivicGuide AI Chatbot:** A fully responsive mock-AI assistant that parses user intent and answers civics questions. Includes drag-and-drop file attachment support.
- **Local History Persistence:** Uses browser `localStorage` to save user chat states safely without requiring a login or backend.
- **Robust Security & QA:** Features built-in XSS protection (HTML escaping) and strict MIME-type file upload validation.
- **100% Responsive Design:** Flawless experience across desktop, tablet, and mobile devices.

## 5. Technology Stack
- **Frontend Framework:** React 19
- **Build Tool / Bundler:** Vite
- **Routing:** TanStack Router (Client-Side Routing)
- **Styling:** Tailwind CSS (with custom CSS variables for gradients and glassmorphism)
- **Icons:** Lucide-React
- **Storage:** Browser `localStorage` API
- **Deployment:** Vercel / GitHub Pages (Static Site Generation)

## 6. System Architecture
CivicGuide AI follows a strict **Client-Side Rendering (CSR)** architecture. 
1. **Presentation Layer:** React components render the UI dynamically based on the current TanStack route (`/`, `/steps`, `/timeline`, `/chatbot`, `/faq`).
2. **State Management:** React Hooks (`useState`, `useEffect`, `useRef`) handle dynamic rendering, animation delays, and chat bubbling.
3. **Data Persistence Layer:** Instead of communicating with an external database via REST/GraphQL, the app interfaces directly with the browser's `localStorage` API. Chat logs are serialized to JSON and stored locally.
4. **Zero-Backend Flow:** Because no external API calls are made, the application operates with near-zero latency, fetching pre-compiled Vite chunks on demand.

## 7. Modules Description
- **Home Module (`index.jsx`):** The landing page featuring a hero section, value propositions, and direct links to start the learning journey.
- **Steps Module (`steps.jsx`):** A grid-based educational section utilizing Lucide icons and gradient cards to explain the 5 phases of voting.
- **Timeline Module (`timeline.jsx`):** A vertical timeline component tracking the chronological flow of an election year.
- **FAQ Module (`faq.jsx`):** An accordion-style list of the most frequently asked voter questions.
- **Chatbot Module (`chatbot.jsx`):** The core interactive component. Handles user input, drag-and-drop file processing, keyword matching (`knowledgeBase`), and local storage syncing.

## 8. Working / Methodology
1. **User Navigation:** The user lands on the Home page and selects a learning path (Steps, Timeline, or Chatbot).
2. **Chatbot Interaction:** When the user types a question in the Chatbot, the `send()` function trims the input and passes it to the `findReply()` matcher.
3. **Keyword Parsing:** The system scans the predefined `knowledgeBase` array for keyword matches (e.g., "register", "mail").
4. **Response Generation:** The bot delays artificially (`setTimeout`) to simulate typing, then renders the matching response along with contextual "follow-up" suggestion chips.
5. **Persistence:** A `useEffect` hook listens to the `messages` state. Whenever it updates, the array is sanitized (attachments removed to prevent quota limits) and written to `localStorage`.

## 9. Installation & Setup Guide
To run CivicGuide AI locally on your machine:

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/Ayush-Raj890/civic-guide-ai.git
   cd civic-guide-ai
   \`\`\`
2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`
3. **Start the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`
4. **Open in Browser:** Navigate to `http://localhost:5173` (or the port specified by Vite).

## 10. Usage Instructions
- **Browsing:** Use the top navigation bar to explore different educational sections.
- **Chatting:** Go to the "Chatbot" tab. Type a question like *"How do I register?"* or click one of the suggested chips.
- **Attaching Files:** Drag and drop an image or PDF directly into the chat window to simulate file analysis.
- **Resetting Data:** Click the "Reset" button in the chatbot header to clear your screen and permanently erase your local chat history.

## 11. Screenshots
*(Add your project screenshots here)*
- `![Home Page](./docs/home.png)`
- `![Chatbot Interface](./docs/chatbot.png)`
- `![Steps Guide](./docs/steps.png)`

## 12. API Details
**N/A.** CivicGuide AI is completely decentralized and serverless. It relies on local keyword-matching algorithms rather than external LLM APIs (like OpenAI) to ensure 100% privacy and zero operational costs.

## 13. Database Design
**N/A (Local Storage implementation).**
The application uses Key-Value storage via the browser's `localStorage` API.
- **Key:** `civic_chat_history`
- **Value:** JSON Stringified Array of Message Objects.
  - `id` (String): Unique message identifier.
  - `role` (String): `"user"` or `"bot"`.
  - `text` (String): The message content.
  - `ts` (Number): Unix timestamp.

## 14. Testing
- **Unit Testing:** Verified logic for `escapeMarkdown()` sanitization to prevent XSS.
- **Integration Testing:** Verified TanStack router links correctly lazy-load page chunks.
- **Edge Case Testing:**
  - *Quota Limits:* Prevented `QuotaExceededError` by stripping Base64 file objects before saving to `localStorage`.
  - *File Validation:* Implemented strict MIME type checking (`ALLOWED_TYPES`) during drag-and-drop to reject malicious `.exe` files.
  - *Empty Inputs:* Handled keyboard submission of empty spaces to prevent blank chat bubbles.

## 15. Results / Output
The final build successfully operates as an ultra-fast, visually premium Single Page Application (SPA). Because database latency and API calls were eliminated, the Time-to-Interactive (TTI) is near instantaneous.

## 16. Limitations
- **Mock AI Limitations:** Because the chatbot relies on a hardcoded keyword array, it cannot answer highly nuanced, conversational, or out-of-scope questions.
- **Device-Bound Data:** Because chat history is stored in `localStorage`, a user's conversation cannot sync between their phone and their laptop.

## 17. Future Scope
1. **Real LLM Integration:** Connect the chatbot to an actual AI model (e.g., Gemini or OpenAI) via a secure backend to provide dynamic, generative answers.
2. **Multilingual Support:** Add localization (i18n) to translate the civic guides into Spanish, French, Hindi, etc., expanding accessibility.
3. **Live Election Data:** Integrate with public government APIs to show live polling locations and real-time ballot results based on the user's zip code.

## 18. Conclusion
**CivicGuide AI** successfully bridges the gap between complex government procedures and everyday citizens. By leveraging modern frontend technologies, rigorous UX/UI design principles, and a privacy-first local architecture, it provides an engaging, safe, and educational platform that promotes democratic participation.
