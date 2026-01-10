import { useState } from "react";
import { loadBrokers } from "../utils/loadBrokers";

const AdminPage = () => {
  const [brokers, setBrokers] = useState(loadBrokers());
  const save = () =>
    localStorage.setItem("adminBrokers", JSON.stringify(brokers));
  return (
    <div>
      <button onClick={save}>Save</button>
      <pre>{JSON.stringify(brokers, null, 2)}</pre>
    </div>
  );
};

export default AdminPage;
