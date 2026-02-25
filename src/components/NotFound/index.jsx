import './index.css'

export default function NotFound() {
  return (
    <main className="notfound-page">
      <div className="notfound-wrap">
        <div className="nf-img-container">
          <img 
            src="https://nxtwave-website-media-files.s3.ap-south-1.amazonaws.com/placement-happenings/webcoding-gif/404-illustration.png" 
            alt="not-found"
            className="nf-illustration"
          />
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