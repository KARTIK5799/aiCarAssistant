# What is goal?
Help Car buyer to find best car without confusion.

# Approach
Create carDekho style home page with "Find Right Car" with an ai powered advisor.

# Not Required
- No Auth
- No Db
- No Filter or Listing

# Scope
- Hero section with Ai input card
- Backned endpoint for ai recommendation.
- Show top 3 cars with reason, pro and cons

# Tech Stack
- React UI (Vite) + Tailwind css
- Node.js + Express
- Free Ai Api (Gemini Api)

# Basic System Design
User -> React UI
     -> POST /api/recommended
     -> Backend
     -> Api Api Gemini
     -> JSON Response
     -> UI Render Card for Recommended Cars.