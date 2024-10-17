import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Web3Provider } from './contexts/Web3Context';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import WorkerRegistration from './pages/WorkerRegistration';
import PlatformDashboard from './pages/PlatformDashboard';
import WorkerDashboard from './pages/WorkerDashboard';
import AdminDashboard from './pages/AdminDashboard';
function App() {
  return (
    <Web3Provider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/worker-registration" element={<WorkerRegistration />} />
              <Route path="/platform-dashboard" element={<PlatformDashboard />} />
              <Route path="/worker-dashboard" element={<WorkerDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Web3Provider>
  );
}
export default App;
