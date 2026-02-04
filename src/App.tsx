import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import BrokersPage from "./pages/BrokersPage";
import Landingpage from "./pages/Landingpage";
import ComparePage from "./pages/ComparePage";
import BrokerCard from "./components/BrokerCard";

const App = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/brokers" element={<BrokersPage />} />
          <Route path="/brokers/comparepage" element={<ComparePage />} />
          <Route path="/brokers/:id" element={<BrokerCard />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
