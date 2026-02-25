import './index.css'

export default function NotFound() {
  return (
    <main className="notfound-page">
      <div className="notfound-wrap">
        <div className="nf-img-container">
          <svg 
            viewBox="0 0 500 400" 
            className="nf-illustration"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <text x="250" y="200" fontSize="120" fontWeight="bold" textAnchor="middle" fill="#ef4444">
              404
            </text>
            <text x="250" y="260" fontSize="24" textAnchor="middle" fill="#0f172a" fontWeight="600">
              Page Not Found
            </text>
          </svg>
        </div>
        <h1 className="nf-heading">Page Not Found</h1>
        <p className="nf-description">
          The page you are looking for does not exist or has been moved.
        </p>
        <a href="/" className="nf-link">Go back to Bids</a>
      </div>
    </main>
  )
}