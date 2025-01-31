import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAppContext } from "../context/AppContext";

// Use the same colors as in the diagram
const TEAM_COLORS = [
  "#4caf50", // Green
  "#2196f3", // Blue
  "#ff9800", // Orange
  "#e91e63", // Pink
  "#9c27b0", // Purple
  "#00bcd4", // Cyan
];

// Custom tooltip formatter
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const { teams, users } = useAppContext();
    let teamId;

    // Find the relevant team
    if (payload[0].payload.name) {
      // For pie chart
      const team = teams.find((t) => t.name === payload[0].payload.name);
      teamId = team?.id;
    } else {
      // For bar chart
      const team = teams.find((t) => t.name === payload[0].payload.team);
      teamId = team?.id;
    }

    // Get users for this team
    const teamUsers = users.filter((user) => user.teamId === teamId);

    return (
      <div className="custom-tooltip">
        {teamUsers.map((user) => (
          <p key={user.id}>{user.name}</p>
        ))}
      </div>
    );
  }
  return null;
};

const ChartsPage = () => {
  const { teams, users } = useAppContext();

  // Create a map of team colors
  const teamColorMap = Object.fromEntries(
    teams.map((team, index) => [
      team.id,
      TEAM_COLORS[index % TEAM_COLORS.length],
    ])
  );

  // Get min and max team sizes for Y-axis
  const teamSizes = teams.map(
    (team) => users.filter((user) => user.teamId === team.id).length
  );
  const maxTeamSize = Math.max(...teamSizes);
  const minTeamSize = Math.min(...teamSizes.filter((size) => size > 0));

  // Create ticks array from min to max
  const yAxisTicks = Array.from(
    { length: maxTeamSize - minTeamSize + 1 },
    (_, i) => minTeamSize + i
  );

  // Pie Chart Data (User distribution per team)
  const pieData = teams.map((team) => ({
    name: team.name,
    value: users.filter((user) => user.teamId === team.id).length,
    color: teamColorMap[team.id],
  }));

  // Bar Chart Data (Users per team)
  const barData = teams.map((team) => ({
    team: team.name,
    users: users.filter((user) => user.teamId === team.id).length,
    color: teamColorMap[team.id],
  }));

  return (
    <div>
      <h1>Team Analytics</h1>

      <div className="diagram-container">
        <h2>Users Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, value }) => `${name} (${value} Users)`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="diagram-container">
        <h2>Users Per Team</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <XAxis dataKey="team" />
            <YAxis ticks={yAxisTicks} allowDecimals={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              dataKey="users"
              fill="#4caf50"
              name="Users"
              shape={(props) => {
                return <rect {...props} fill={barData[props.index].color} />;
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartsPage;
