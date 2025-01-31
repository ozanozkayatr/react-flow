import { useState } from "react";
import { useAppContext } from "../context/AppContext";

const UserForm = () => {
  const { teams, addUser } = useAppContext();
  const [userName, setUserName] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim() === "" || selectedTeam === "") return;
    addUser(userName, selectedTeam);
    setUserName("");
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userName">User Name</label>
          <input
            id="userName"
            type="text"
            placeholder="Enter user name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="team">Team</label>
          <select
            id="team"
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
          >
            <option value="">Select a team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default UserForm;
