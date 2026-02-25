import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import BidList from './components/BidList'
import BidDetail from './components/BidDetail'
import NotFound from './components/NotFound'
import './App.css'

// Placeholder component for other modules
function ModulePage({ title, description }) {
  return (
    <main className="module-page">
      <div className="module-content">
        <h1 className="module-title">{title}</h1>
        <p className="module-description">{description}</p>
      </div>
    </main>
  )
}

export default function App() {
  const navigate = useNavigate()

  const handleNavClick = (path, e) => {
    e.preventDefault()
    navigate(path)
  }

  return (
    <>
      <Header />
      <div className="app-container">
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <a 
              href="#" 
              className="nav-item" 
              onClick={(e) => handleNavClick('/', e)}
            >
              Bid
            </a>
            <a 
              href="#" 
              className="nav-item" 
              onClick={(e) => handleNavClick('/pod', e)}
            >
              POD
            </a>
            <a 
              href="#" 
              className="nav-item" 
              onClick={(e) => handleNavClick('/vendor', e)}
            >
              Vendor
            </a>
            <a 
              href="#" 
              className="nav-item" 
              onClick={(e) => handleNavClick('/user', e)}
            >
              User
            </a>
            <div className="nav-divider"></div>
            <a 
              href="#" 
              className="nav-item" 
              onClick={(e) => handleNavClick('/settings', e)}
            >
              Settings
            </a>
            <a 
              href="#" 
              className="nav-item" 
              onClick={(e) => handleNavClick('/profile', e)}
            >
              Profile
            </a>
            <a 
              href="#" 
              className="nav-item" 
              onClick={(e) => handleNavClick('/contact', e)}
            >
              Contact Us
            </a>
            <div className="nav-divider"></div>
            <a 
              href="#" 
              className="nav-item nav-logout" 
              onClick={(e) => handleNavClick('/logout', e)}
            >
              Logout
            </a>
          </nav>
        </aside>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<BidList />} />
            <Route path="/bid/:id" element={<BidDetail />} />
            <Route path="/pod" element={<ModulePage title="POD Module" description="Coming soon..." />} />
            <Route path="/vendor" element={<ModulePage title="Vendor Module" description="Coming soon..." />} />
            <Route path="/user" element={<ModulePage title="User Module" description="Coming soon..." />} />
            <Route path="/settings" element={<ModulePage title="Settings" description="Configure your preferences..." />} />
            <Route path="/profile" element={<ModulePage title="Profile" description="Manage your profile..." />} />
            <Route path="/contact" element={<ModulePage title="Contact Us" description="Get in touch with support..." />} />
            <Route path="/logout" element={<ModulePage title="Logout" description="You have been logged out" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </>
  )
}