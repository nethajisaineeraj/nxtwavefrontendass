import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './index.css'

const API = 'https://edtech-exam-api.vercel.app/api/bids'

export default function BidDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [bid, setBid] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function fetchBid() {
      try {
        const url = API + '?id=' + id
        const res = await fetch(url)
        if (!res.ok) throw new Error('fetch failed')
        const data = await res.json()
        const foundBid = data.data?.find(b => b.id == id)
        if (!cancelled) {
          if (foundBid) {
            setBid(foundBid)
          } else {
            setError(true)
          }
        }
      } catch (err) {
        if (!cancelled) setError(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchBid()
    return () => {
      cancelled = true
    }
  }, [id])

  if (loading)
    return (
      <div className="status-wrap">
        <div className="status">Loading...</div>
      </div>
    )
  if (error || !bid)
    return (
      <div className="status-wrap">
        <div className="status">Bid not found</div>
      </div>
    )

  return (
    <main className="bid-detail-page">
      <div className="bid-detail-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          Back
        </button>
        <h1 className="detail-title">Bid Details</h1>
        <span className="status-badge-live">LIVE</span>
      </div>

      <div className="detail-wrap">
        <div className="detail-grid">
          <div className="detail-field">
            <label className="detail-label">BID NUMBER</label>
            <div className="detail-value">{bid.bidNumber}</div>
          </div>
          <div className="detail-field">
            <label className="detail-label">CREATED BY</label>
            <div className="detail-value">{bid.createdBy}</div>
          </div>

          <div className="detail-field">
            <label className="detail-label">START DATE</label>
            <div className="detail-value">{bid.startDate || '2024-02-14'}</div>
          </div>
          <div className="detail-field">
            <label className="detail-label">START TIME</label>
            <div className="detail-value">{bid.startTime || '18:30'}</div>
          </div>

          <div className="detail-field">
            <label className="detail-label">TIME REMAINING</label>
            <div className="detail-value">{bid.timeRemaining}</div>
          </div>
          <div className="detail-field">
            <label className="detail-label">RESPONSES</label>
            <div className="detail-value">{bid.response || 0}</div>
          </div>

          <div className="detail-field">
            <label className="detail-label">FROM CITY</label>
            <div className="detail-value">{bid.fromCity}</div>
          </div>
          <div className="detail-field">
            <label className="detail-label">TO CITY</label>
            <div className="detail-value">{bid.toCity}</div>
          </div>

          <div className="detail-field">
            <label className="detail-label">VEHICLE TYPE</label>
            <div className="detail-value">{bid.vehicleType}</div>
          </div>
          <div className="detail-field">
            <label className="detail-label">BODY TYPE</label>
            <div className="detail-value">{bid.bodyType}</div>
          </div>

          <div className="detail-field">
            <label className="detail-label">NO. OF VEHICLES</label>
            <div className="detail-value">{bid.numberOfVehicles || 1}</div>
          </div>
          <div className="detail-field">
            <label className="detail-label">MATERIAL WEIGHT</label>
            <div className="detail-value">{bid.materialWeight} kg</div>
          </div>

          <div className="detail-field">
            <label className="detail-label">ASSIGNED STAFF</label>
            <div className="detail-value">{bid.assignedStaff || bid.createdBy}</div>
          </div>
          <div className="detail-field">
            <label className="detail-label">STAFF ID</label>
            <div className="detail-value">{bid.staffId || 'N/A'}</div>
          </div>
        </div>
      </div>
    </main>
  )
}