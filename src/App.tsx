import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import BrokersPage from "./pages/BrokersPage";
import Landingpage from "./pages/Landingpage";
import ComparePage from "./pages/ComparePage";
const App = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/brokers" element={<BrokersPage />} />
        <Route path="/brokers/comparepage" element={<ComparePage />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default App;
