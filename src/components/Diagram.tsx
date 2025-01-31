import { useState, useCallback, useMemo } from "react";
import ReactFlow, {
  Background,
  Controls,
  Node,
  NodeProps,
  Panel,
  Handle,
  Position,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { useAppContext } from "../context/AppContext";
import * as ContextMenu from "@radix-ui/react-context-menu";
import InfoIcon from "@mui/icons-material/Info";

const TeamNode = ({ data }: NodeProps) => (
  <ContextMenu.Root>
    <ContextMenu.Trigger
      className={`team-node ${data.isHidden ? "team-node-hidden" : ""}`}
      style={{
        opacity: data.isHidden ? 0.5 : 1,
        filter: data.isHidden ? "grayscale(1)" : "none",
        borderStyle: data.isHidden ? "dashed" : "solid",
        borderColor: data.isHidden ? undefined : data.color,
        borderWidth: "2px",
      }}
    >
      <strong style={{ color: data.isHidden ? undefined : data.color }}>
        {data.label}
      </strong>
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: data.color }}
      />
    </ContextMenu.Trigger>
    <ContextMenu.Portal>
      <ContextMenu.Content className="context-menu">
        <ContextMenu.Item
          className="context-menu-item"
          onSelect={data.onToggle}
        >
          {data.isHidden ? "Show Users" : "Hide Users"}
        </ContextMenu.Item>
        <ContextMenu.Item
          className="context-menu-item"
          onSelect={() => {
            const newName = prompt("Enter new team name:", data.label);
            if (newName && newName.trim() !== "") {
              data.onRename(newName.trim());
            }
          }}
        >
          Rename Team
        </ContextMenu.Item>
        <ContextMenu.Item
          className="context-menu-item context-menu-item-delete"
          onSelect={() => {
            if (
              confirm(
                "Are you sure you want to delete this team and all its users?"
              )
            ) {
              data.onRemove();
            }
          }}
        >
          Delete Team
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Portal>
  </ContextMenu.Root>
);

const UserNode = ({ data }: NodeProps) => (
  <ContextMenu.Root>
    <ContextMenu.Trigger
      className="user-node"
      style={{
        borderColor: data.color,
        borderWidth: "2px",
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: data.color }}
      />
      <span>{data.label}</span>
    </ContextMenu.Trigger>
    <ContextMenu.Portal>
      <ContextMenu.Content className="context-menu">
        <ContextMenu.Item
          className="context-menu-item"
          onSelect={() => {
            const newName = prompt("Enter new user name:", data.label);
            if (newName && newName.trim() !== "") {
              data.onRename(newName.trim());
            }
          }}
        >
          Rename User
        </ContextMenu.Item>
        <ContextMenu.Item
          className="context-menu-item context-menu-item-delete"
          onSelect={data.onRemove}
        >
          Delete User
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Portal>
  </ContextMenu.Root>
);

const nodeTypes = {
  team: TeamNode,
  user: UserNode,
};

const Diagram = () => {
  const {
    teams,
    users,
    removeUser,
    removeTeam,
    renameTeam,
    renameUser,
    disableColors,
    toggleColors,
  } = useAppContext();
  const [hiddenTeams, setHiddenTeams] = useState<string[]>([]);
  const [nodePositions, setNodePositions] = useState<
    Record<string, { x: number; y: number }>
  >({});

  // Toggle user visibility for a team
  const toggleTeamUsers = useCallback((teamId: string) => {
    setHiddenTeams((prev) =>
      prev.includes(teamId)
        ? prev.filter((id) => id !== teamId)
        : [...prev, teamId]
    );
  }, []);

  // Handle node position changes
  const onNodesChange = useCallback((changes: any) => {
    changes.forEach((change: any) => {
      if (change.type === "position" && change.position) {
        setNodePositions((prev) => ({
          ...prev,
          [change.id]: change.position,
        }));
      }
    });
  }, []);

  // Generate nodes and edges
  const nodes = useMemo(() => {
    // Generate nodes for teams
    const teamNodes: Node[] = teams.map((team, index) => ({
      id: team.id,
      type: "team",
      data: {
        label: team.name,
        onToggle: () => toggleTeamUsers(team.id),
        onRename: (newName: string) => renameTeam(team.id, newName),
        onRemove: () => removeTeam(team.id),
        isHidden: hiddenTeams.includes(team.id),
        color: disableColors ? "#94a3b8" : team.color,
      },
      position: nodePositions[team.id] || { x: 100, y: index * 120 + 50 },
      sourcePosition: Position.Right,
      draggable: true,
    }));

    // Find team by ID helper function
    const getTeamColor = (teamId: string) => {
      if (disableColors) return "#94a3b8";
      const team = teams.find((t) => t.id === teamId);
      return team ? team.color : "#ccc";
    };

    // Generate nodes for users
    const userNodes: Node[] = users
      .filter((user) => !hiddenTeams.includes(user.teamId))
      .map((user, index) => ({
        id: user.id,
        type: "user",
        data: {
          label: user.name,
          onRemove: () => removeUser(user.id),
          onRename: (newName: string) => renameUser(user.id, newName),
          color: getTeamColor(user.teamId),
        },
        position: nodePositions[user.id] || {
          x: 450,
          y: index * 80 + (index % 2 ? 20 : 0),
        },
        targetPosition: Position.Left,
        draggable: true,
      }));

    return [...teamNodes, ...userNodes];
  }, [
    teams,
    users,
    hiddenTeams,
    nodePositions,
    toggleTeamUsers,
    removeUser,
    disableColors,
    renameTeam,
    renameUser,
    removeTeam,
  ]);

  // Generate edges
  const edges = useMemo(() => {
    return users
      .filter((user) => !hiddenTeams.includes(user.teamId))
      .map((user) => {
        const team = teams.find((t) => t.id === user.teamId);
        const color = disableColors ? "#94a3b8" : team ? team.color : "#ccc";
        return {
          id: `edge-${user.id}`,
          source: user.teamId,
          target: user.id,
          animated: true,
          type: "smoothstep",
          style: {
            stroke: color,
            strokeWidth: 2,
            opacity: 0.8,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: color,
          },
        };
      });
  }, [users, hiddenTeams, teams, disableColors]);

  return (
    <div className="diagram-container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h2 style={{ margin: 0 }}>Team & User Diagram</h2>
        <button
          onClick={toggleColors}
          style={{
            background: "transparent",
            border: "1px solid var(--text-secondary)",
            color: "var(--text)",
            padding: "4px 12px",
            fontSize: "0.8rem",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          {disableColors ? "Enable Colors" : "Disable Colors"}
        </button>
      </div>
      <div style={{ height: "400px", background: "var(--bg-dark)" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          fitView
          minZoom={0.5}
          maxZoom={1.5}
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
          elementsSelectable={true}
          nodesConnectable={false}
          nodesDraggable={true}
          proOptions={{ hideAttribution: true }}
          defaultEdgeOptions={{
            type: "smoothstep",
            animated: true,
          }}
        >
          <Background color="rgba(255, 255, 255, 0.05)" gap={16} size={1} />
          <Controls />
          <Panel position="top-left" className="custom-panel">
            <InfoIcon
              style={{
                fontSize: 16,
                marginRight: 8,
                verticalAlign: "middle",
                color: "var(--text-secondary)",
              }}
            />
            Right-click on nodes to show options
          </Panel>
          <Panel position="top-right" className="custom-panel">
            <InfoIcon
              style={{
                fontSize: 16,
                marginRight: 8,
                verticalAlign: "middle",
                color: "var(--text-secondary)",
              }}
            />
            Drag and drop nodes to reposition them
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
};

export default Diagram;
