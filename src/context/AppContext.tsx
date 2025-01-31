import React, { createContext, useContext, useState } from "react";

const TEAM_COLORS = [
  "#4caf50", // Green
  "#2196f3", // Blue
  "#ff9800", // Orange
  "#e91e63", // Pink
  "#9c27b0", // Purple
  "#00bcd4", // Cyan
];

export type User = {
  id: string;
  name: string;
  teamId: string;
};

export type Team = {
  id: string;
  name: string;
  color: string;
};

type AppContextType = {
  teams: Team[];
  users: User[];
  addTeam: (name: string, color?: string) => void;
  addUser: (name: string, teamId: string) => void;
  removeUser: (userId: string) => void;
  removeTeam: (teamId: string) => void;
  renameTeam: (teamId: string, newName: string) => void;
  renameUser: (userId: string, newName: string) => void;
  disableColors: boolean;
  toggleColors: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial data
const initialTeams: Team[] = [
  { id: "team1", name: "Team 1", color: "#4caf50" },
  { id: "team2", name: "Team 2", color: "#2196f3" },
  { id: "team3", name: "Team 3", color: "#ff9800" },
];

const initialUsers: User[] = [
  { id: "user1", name: "Ozan", teamId: "team1" },
  { id: "user2", name: "Aliyan", teamId: "team1" },
  { id: "user3", name: "Kusay", teamId: "team2" },
  { id: "user4", name: "Aytu", teamId: "team2" },
  { id: "user5", name: "Utku", teamId: "team2" },
  { id: "user6", name: "Mustafa", teamId: "team3" },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [disableColors, setDisableColors] = useState(false);

  const toggleColors = () => {
    setDisableColors((prev) => !prev);
  };

  // Function to add a team
  const addTeam = (name: string, color?: string) => {
    const newTeam: Team = {
      id: crypto.randomUUID(),
      name,
      color: color || TEAM_COLORS[teams.length % TEAM_COLORS.length],
    };
    setTeams([...teams, newTeam]);
  };

  // Function to rename a team
  const renameTeam = (teamId: string, newName: string) => {
    setTeams(
      teams.map((team) =>
        team.id === teamId ? { ...team, name: newName } : team
      )
    );
  };

  // Function to rename a user
  const renameUser = (userId: string, newName: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, name: newName } : user
      )
    );
  };

  // Function to add a user to a team
  const addUser = (name: string, teamId: string) => {
    const newUser = { id: crypto.randomUUID(), name, teamId };
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers, newUser];
      console.log("Updated Users:", updatedUsers);
      return updatedUsers;
    });
  };

  // Function to remove a user
  const removeUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  // Function to remove a team and its users
  const removeTeam = (teamId: string) => {
    setTeams(teams.filter((team) => team.id !== teamId));
    setUsers(users.filter((user) => user.teamId !== teamId));
  };

  return (
    <AppContext.Provider
      value={{
        teams,
        users,
        addTeam,
        addUser,
        removeUser,
        removeTeam,
        renameTeam,
        renameUser,
        disableColors,
        toggleColors,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppProvider");
  return context;
};
