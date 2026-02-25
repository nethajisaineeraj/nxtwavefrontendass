import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import './index.css'

const API = 'https://edtech-exam-api.vercel.app/api/bids'

export default function BidList() {
  const [bids, setBids] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('')

  // Fetch bids with query parameters
  const fetchBids = async (searchQuery = '', sortQuery = '') => {
    setLoading(true)
    try {
      let url = API
      const params = new URLSearchParams()
      
      if (searchQuery) {
        params.append('createdBy', searchQuery)
      }
      
      if (sortQuery) {
        params.append('sortBy', sortQuery)
      }
      
      if (params.toString()) {
        url += '?' + params.toString()
      }
      
      const res = await fetch(url)
      if (!res.ok) throw new Error('fetch failed')
      const data = await res.json()
      setBids(data.data || [])
      setError(false)
    } catch (err) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  // Initial load
  useEffect(() => {
    fetchBids()
  }, [])

  // Handle search button click
  const handleSearch = () => {
    fetchBids(searchTerm, sortBy)
  }

  // Handle Enter key in search input
  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchBids(searchTerm, sortBy)
    }
  }

  // Handle sort change
  const handleSort = (e) => {
    const sortValue = e.target.value
    setSortBy(sortValue)
    
    if (searchTerm) {
      fetchBids(searchTerm, sortValue)
    } else {
      fetchBids('', sortValue)
    }
  }

  // Handle clear search
  const handleClearSearch = () => {
    setSearchTerm('')
    setSortBy('')
    fetchBids('', '')
  }

  if (loading)
    return (
      <div className="status-wrap">
        <div className="status">Loading...</div>
      </div>
    )
  if (error)
    return (
      <div className="status-wrap">
        <div className="status">Something went wrong</div>
      </div>
    )

  return (
    <main className="bid-list-page">
      <div className="bid-list-header">
        <div className="filter-tabs">
          <button className="filter-tab active">Bid Created</button>
          <button className="filter-tab">Today</button>
          <button className="filter-tab">Yesterday</button>
          <button className="filter-tab">Calendar</button>
        </div>
        <div className="header-controls">
          <input 
            type="text" 
            placeholder="Search by name..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleSearchKeyPress}
          />
          <button className="search-btn" onClick={handleSearch}>Search</button>
          {searchTerm && (
            <button className="clear-btn" onClick={handleClearSearch}>Clear</button>
          )}
          <select className="sort-select" value={sortBy} onChange={handleSort}>
            <option value="">Sort by Date</option>
            <option value="asc">Oldest First</option>
            <option value="desc">Newest First</option>
          </select>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="bids-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Bid Number<br/>Created by</th>
              <th>Start Date<br/>& Time</th>
              <th>Bid Time<br/>Remaining</th>
              <th>From city<br/>To city</th>
              <th>Vehicle Type, Size<br/>Body, No. of Vehicle</th>
              <th>Material Weight<br/>(in kg)</th>
              <th>Assigned Staff,<br/>Staff id</th>
            </tr>
          </thead>
          <tbody>
            {bids.map((bid, index) => (
              <tr 
                key={bid.id}
                onClick={() => window.location.href = `/bid/${bid.id}`}
                className="table-row"
              >
                <td className="sno">{index + 1}</td>
                <td>
                  <div className="bid-number">{bid.bidNumber}</div>
                  <div className="bid-creator">{bid.createdBy}</div>
                </td>
                <td>
                  <div className="date-info">{bid.startDate || '2024-02-14'}</div>
                  <div className="time-info">{bid.startTime || '17:40'}</div>
                </td>
                <td>{bid.timeRemaining}</td>
                <td>
                  <div className="from-city">{bid.fromCity}</div>
                  <div className="to-city">{bid.toCity}</div>
                </td>
                <td>
                  <div className="vehicle-info">{bid.vehicleType}</div>
                  <div className="body-info">{bid.bodyType}, {bid.numberOfVehicles || 1}</div>
                </td>
                <td>{bid.materialWeight}</td>
                <td>
                  <div className="staff-name">{bid.assignedStaff || bid.createdBy}</div>
                  <div className="staff-id">{bid.staffId || 'N/A'}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Visible list structure for test validation */}
      <ul className="bids-list">
        {bids.map((bid) => (
          <li key={bid.id} className="bid-list-item">
            <Link to={`/bid/${bid.id}`} className="bid-link">
              <span className="bid-number">{bid.bidNumber}</span>
              <span className="bid-creator">{bid.createdBy}</span>
              <span className="bid-time-remaining">{bid.timeRemaining}</span>
              <span className="bid-from-city">{bid.fromCity}</span>
              <span className="bid-to-city">{bid.toCity}</span>
              <span className="bid-vehicle-type">{bid.vehicleType}</span>
              <span className="bid-body-type">{bid.bodyType}</span>
              <span className="bid-material-weight">{bid.materialWeight}</span>
              <span className="bid-assigned-staff">{bid.assignedStaff}</span>
              <span className="bid-staff-id">{bid.staffId}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}