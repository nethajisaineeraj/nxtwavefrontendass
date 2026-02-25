import {useParams, useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import './index.css'

export default function BidDetail() {
  const {id} = useParams()
  const nav = useNavigate()
  const [bid, setBid] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let canceled = false
    async function fetchBid() {
      try {
        const res = await fetch(
          `https://edtech-exam-api.vercel.app/api/bids?id=${id}`,
        )
        if (!res.ok) throw new Error('not found')
        const data = await res.json()
        if (!canceled) setBid(data.data)
      } catch (err) {
        if (!canceled) setError(true)
      } finally {
        if (!canceled) setLoading(false)
      }
    }
    fetchBid()
    return () => {
      canceled = true
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
        <div className="status">Bid Not Found</div>
      </div>
    )

  return (
    <main className="page">
      <div className="detail-wrap">
        <button className="back-btn" onClick={() => nav(-1)}>
          ← Back
        </button>

        <h1 className="detail-number">{bid.bidNumber}</h1>

        <div className="detail-grid">
          <div>
            <span className="label">From:</span> {bid.fromCity}
          </div>
          <div>
            <span className="label">To:</span> {bid.toCity}
          </div>
          <div>
            <span className="label">Vehicle:</span> {bid.vehicleType}
          </div>
          <div>
            <span className="label">Body:</span> {bid.bodyType}
          </div>
          <div>
            <span className="label">No. Vehicles:</span> {bid.noOfVehicles}
          </div>
          <div>
            <span className="label">Material Weight:</span> {bid.materialWeight}{' '}
            Kg
          </div>
          <div>
            <span className="label">Responses:</span> {bid.response}
          </div>
          <div>
            <span className="label">Assigned Staff:</span> {bid.assignedStaff}
          </div>
          <div>
            <span className="label">Start Date:</span> {bid.startDate}{' '}
            {bid.startTime}
          </div>
          <div>
            <span className="label">Time Remaining:</span> {bid.timeRemaining}
          </div>
        </div>
      </div>
    </main>
  )
}
