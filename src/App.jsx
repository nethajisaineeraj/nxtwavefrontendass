import { Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import BidList from './components/BidList';
import BidDetail from './components/BidDetail';
import NotFound from './components/NotFound';
import './App.css';

const PODPage = () => {
  return (
    <main className="module-page">
      <div className="module-content">
        <h1>POD Module</h1>
        <p className="module-description">Coming soon...</p>
      </div>
    </main>
  );
};

const VendorPage = () => {
  return (
    <main className="module-page">
      <div className="module-content">
        <h1>Vendor Module</h1>
        <p className="module-description">Coming soon...</p>
      </div>
    </main>
  );
};

const UserPage = () => {
  return (
    <main className="module-page">
      <div className="module-content">
        <h1>User Module</h1>
        <p className="module-description">Coming soon...</p>
      </div>
    </main>
  );
};

const SettingsPage = () => {
  return (
    <main className="module-page">
      <div className="module-content">
        <h1>Settings</h1>
        <p className="module-description">Configure your preferences...</p>
      </div>
    </main>
  );
};

const ProfilePage = () => {
  return (
    <main className="module-page">
      <div className="module-content">
        <h1>Profile</h1>
        <p className="module-description">Manage your profile...</p>
      </div>
    </main>
  );
};

const ContactPage = () => {
  return (
    <main className="module-page">
      <div className="module-content">
        <h1>Contact Us</h1>
        <p className="module-description">Get in touch with support...</p>
      </div>
    </main>
  );
};

const LogoutPage = () => {
  return (
    <main className="module-page">
      <div className="module-content">
        <h1>Logout</h1>
        <p className="module-description">You have been logged out</p>
      </div>
    </main>
  );
};

const App = () => {
  return (
    <>
      <Header />
      <div className="app-container">
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <Link to="/" className="nav-item">Bid</Link>
            <Link to="/pod" className="nav-item">POD</Link>
            <Link to="/vendor" className="nav-item">Vendor</Link>
            <Link to="/user" className="nav-item">User</Link>
            <div className="nav-divider"></div>
            <Link to="/settings" className="nav-item">Settings</Link>
            <Link to="/profile" className="nav-item">Profile</Link>
            <Link to="/contact" className="nav-item">Contact Us</Link>
            <div className="nav-divider"></div>
            <Link to="/logout" className="nav-item nav-logout">Logout</Link>
          </nav>
        </aside>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<BidList />} />
            <Route path="/bid/:id" element={<BidDetail />} />
            <Route path="/pod" element={<PODPage />} />
            <Route path="/vendor" element={<VendorPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </>
  );
};

export default App;
