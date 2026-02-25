import {useNavigate} from 'react-router-dom'
import './index.css'

export default function BidCard({bid}) {
  const navigate = useNavigate()
  return (
    <article
      className="bid-card"
      role="button"
      onClick={() => navigate(`/bid/${bid.id}`)}
    >
      <div className="card-top">
        <div className="bid-number">{bid.bidNumber}</div>
        <div className={`status-badge ${bid.status?.toLowerCase()}`}>
          {(bid.status || '').toUpperCase()}
        </div>
      </div>

      <div className="route">
        {bid.fromCity} → {bid.toCity}
      </div>

      <div className="card-grid">
        <div className="grid-left">
          <div className="muted">
            Vehicle: <span className="muted-strong">{bid.vehicleType}</span>
          </div>
          <div className="muted">
            Weight:{' '}
            <span className="muted-strong">{bid.materialWeight} Kg</span>
          </div>
        </div>

        <div className="grid-right">
          <div className="muted">
            Body: <span className="muted-strong">{bid.bodyType}</span>
          </div>
          <div className="muted">
            Responses: <span className="muted-strong">{bid.response}</span>
          </div>
        </div>
      </div>

      <div className="card-foot">
        <div className="creator">{bid.createdBy}</div>
        <div className="time-remaining">{bid.timeRemaining}</div>
      </div>
    </article>
  )
}
