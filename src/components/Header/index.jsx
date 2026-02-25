import './index.css'

export default function Header() {
  return (
    <header className="header-container">
      <div className="header-inner">
        <img
          className="header-logo"
          src="https://nxtwave-website-media-files.s3.ap-south-1.amazonaws.com/placement-happenings/webcoding-gif/logo-bids-logistic.avif"
          alt="logo"
        />
        {/* optionally add controls on right in the future */}
      </div>
    </header>
  )
}