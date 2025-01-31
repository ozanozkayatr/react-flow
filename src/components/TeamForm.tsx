import { useState } from "react";
import { useAppContext } from "../context/AppContext";

const TEAM_COLORS = {
  Random: "",
  Green: "#4caf50",
  Blue: "#2196f3",
  Orange: "#ff9800",
  Pink: "#e91e63",
  Purple: "#9c27b0",
  Cyan: "#00bcd4",
};

const TeamForm = () => {
  const { addTeam, disableColors } = useAppContext();
  const [teamName, setTeamName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (teamName.trim() === "") return;
    addTeam(teamName, disableColors ? undefined : selectedColor);
    setTeamName("");
    setSelectedColor("");
  };

  return (
    <div>
      <h2>Create Team</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="teamName">Team Name</label>
          <input
            id="teamName"
            type="text"
            placeholder="Enter team name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="teamColor"
            style={{ opacity: disableColors ? 0.5 : 1 }}
          >
            Team Color
          </label>
          <select
            id="teamColor"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            disabled={disableColors}
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              color: "var(--text)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              opacity: disableColors ? 0.5 : 1,
              cursor: disableColors ? "not-allowed" : "pointer",
            }}
          >
            {Object.entries(TEAM_COLORS).map(([name, color]) => (
              <option
                key={name}
                value={color}
                style={{
                  backgroundColor: "var(--bg-dark)",
                  color: color ? color : "var(--text)",
                  fontWeight: color ? "600" : "normal",
                }}
              >
                {name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Team</button>
      </form>
    </div>
  );
};

export default TeamForm;
