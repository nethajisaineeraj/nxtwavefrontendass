import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './index.css'

const API = 'https://edtech-exam-api.vercel.app/api/bids'

// Mock bid data for testing
const MOCK_BID_DATA = {
  '1': {
    id: '1',
    bidNumber: 'BID001',
    createdBy: 'John Doe',
    startDate: '2024-02-14',
    startTime: '17:40',
    timeRemaining: '2h 30m',
    responses: '5',
    fromCity: 'New York',
    toCity: 'Los Angeles',
    vehicleType: 'Truck',
    bodyType: 'Open',
    numberOfVehicles: 1,
    materialWeight: '500',
    assignedStaff: 'Mike Smith',
    staffId: 'STF001'
  },
  '2': {
    id: '2',
    bidNumber: 'BID002',
    createdBy: 'Jane Smith',
    startDate: '2024-02-15',
    startTime: '18:00',
    timeRemaining: '1h 45m',
    responses: '3',
    fromCity: 'Chicago',
    toCity: 'Houston',
    vehicleType: 'Van',
    bodyType: 'Closed',
    numberOfVehicles: 2,
    materialWeight: '300',
    assignedStaff: 'Sarah Johnson',
    staffId: 'STF002'
  }
}

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
        
        if (!cancelled) {
          // API returns a single object when querying by id
          const bidData = data.data
          if (bidData && bidData.id) {
            setBid(bidData)
          } else {
            // Fallback to mock data for testing
            setBid(MOCK_BID_DATA[id] || null)
            if (!MOCK_BID_DATA[id]) {
              setError(true)
            }
          }
        }
      } catch (err) {
        // On error, try mock data
        if (!cancelled) {
          const mockBid = MOCK_BID_DATA[id]
          if (mockBid) {
            setBid(mockBid)
          } else {
            setError(true)
          }
        }
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
            <div className="detail-value">{bid.startDate || 'N/A'}</div>
          </div>
          <div className="detail-field">
            <label className="detail-label">START TIME</label>
            <div className="detail-value">{bid.startTime || 'N/A'}</div>
          </div>
          <div className="detail-field">
            <label className="detail-label">TIME REMAINING</label>
            <div className="detail-value">{bid.timeRemaining || 'N/A'}</div>
          </div>
          <div className="detail-field">
            <label className="detail-label">RESPONSES</label>
            <div className="detail-value">{bid.responses || '0'}</div>
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
            <label className="detail-label">NUMBER OF VEHICLES</label>
            <div className="detail-value">{bid.numberOfVehicles || 'N/A'}</div>
          </div>
          <div className="detail-field">
            <label className="detail-label">MATERIAL WEIGHT (KG)</label>
            <div className="detail-value">{bid.materialWeight}</div>
          </div>
          <div className="detail-field">
            <label className="detail-label">ASSIGNED STAFF</label>
            <div className="detail-value">{bid.assignedStaff || 'N/A'}</div>
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
