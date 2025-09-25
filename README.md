# Event-Tracker-App

git clone https://github.com/vmishra270796/Event-Tracker-App.git
cd Event-Tracker-App
cp .env
npm install
npm run dev


# Env Data

VITE_API_BASE_URL=http://localhost:4000/api


#Startup

npm run dev


# Tech Stack & Reasoning

React → component-based, modular UI.

Reactstrap + Bootstrap 5 → responsive, accessible UI components.

React Router → navigation.

Axios → API calls with withCredentials for cookies.

Context API → global auth state management.



# Trade‑offs & Assumptions

Modal-based Add/Edit for cleaner UX (instead of inline forms).

Password input includes eye toggle for usability.

Shared event pages are public and don’t show login/logout UI.

Deployment optional (Netlify/Vercel).


# Features

Signup/Login with JWT cookies.

Dashboard with event list + filters (upcoming, past, all).

Add/Edit events in modal form.

Delete events.

Share event via public link (auto-expires after event datetime).

Responsive design for desktop & mobile.
