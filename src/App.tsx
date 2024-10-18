import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Web3Provider } from './contexts/Web3Context';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Profile from './components/Profile';
import PlatformDashboard from './pages/PlatformDashboard';
import AdminDashboard from './pages/AdminDashboard';
import GovernanceDashboard from './pages/GovernanceDashboard';

function App() {
  return (
    <Web3Provider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile/:address" element={<Profile />} />
              <Route path="/platform-dashboard" element={<PlatformDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/governance-dashboard" element={<GovernanceDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Web3Provider>
  );
}

export default App;
