# Team Management Application

A React-based team management application that allows users to visualize and manage team structures with an interactive diagram interface.

## Features

### Team Management

- Create teams with customizable colors
- Rename teams
- Delete teams (with associated users)
- Toggle team visibility to show/hide users

### User Management

- Add users to teams
- Rename users
- Delete users
- Visual connection between users and their teams

### Interactive Diagram

- Drag and drop interface for teams and users
- Animated connections between teams and users
- Zoom and pan controls
- Position persistence for diagram elements
- Right-click context menus for quick actions
- Toggle color mode (colored/neutral)

### Data Visualization

- Bar chart showing team sizes
- Interactive tooltips
- Customizable appearance

### UI/UX Features

- Modern, clean interface
- Dark/Light theme support
- Responsive design
- Helpful info panels
- Confirmation dialogs for destructive actions

## Tech Stack

- React 18
- TypeScript
- Vite
- React Flow (for interactive diagrams)
- Recharts (for data visualization)
- Radix UI (for context menus)
- React Router (for navigation)
- Material-UI Icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone git@github.com:ozanozkayatr/react-flow.git
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/         # React components
│   ├── Diagram.tsx    # Interactive team diagram
│   ├── TeamForm.tsx   # Team creation form
│   ├── UserForm.tsx   # User creation form
│   └── ...
├── context/           # React context
│   └── AppContext.tsx # Application state management
├── pages/             # Route pages
│   ├── Home.tsx      # Main page with diagram
│   └── ChartsPage.tsx # Analytics and charts
└── ...
```

## Usage

### Managing Teams

- Use the "Add Team" form to create new teams
- Right-click on team nodes in the diagram to:
  - Show/Hide team users
  - Rename team
  - Delete team and its users

### Managing Users

- Use the "Add User" form to add users to teams
- Right-click on user nodes to:
  - Rename user
  - Delete user

### Diagram Interaction

- Drag nodes to reposition them
- Use mouse wheel to zoom
- Use the controls panel for zoom and fit view
- Toggle "Disable Colors" to switch between colored and neutral views
