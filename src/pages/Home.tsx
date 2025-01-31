import TeamForm from "../components/TeamForm";
import UserForm from "../components/UserForm";
import Diagram from "../components/Diagram";

const Home = () => {
  return (
    <div>
      <h1>Team & User Management</h1>
      <div className="form-container">
        <TeamForm />
        <UserForm />
      </div>
      <Diagram />
    </div>
  );
};

export default Home;
