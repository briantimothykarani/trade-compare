import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import BrokersPage from "./pages/BrokersPage";
import Landingpage from "./pages/Landingpage";
import ComparePage from "./pages/ComparePage";
import BrokerCard from "./components/BrokerCard"; // ✅ Import BrokerCard

const App = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/brokers" element={<BrokersPage />} />
        <Route path="/brokers/comparepage" element={<ComparePage />} />
        <Route path="/brokers/:id" element={<BrokerCard />} />{" "}
        {/* ✅ Dynamic route for BrokerCard */}
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default App;
