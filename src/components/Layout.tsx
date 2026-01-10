import Navbar from "./Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
    <Navbar />
    <main className="py-8">{children}</main>
  </div>
);

export default Layout;
