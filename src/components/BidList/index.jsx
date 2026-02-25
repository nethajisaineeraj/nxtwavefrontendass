import {useEffect, useState} from 'react'
import './index.css'

const API = 'https://edtech-exam-api.vercel.app/api/bids'

export default function BidList() {
  const [bids, setBids] = useState([])
  const [filteredBids, setFilteredBids] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('date')

  useEffect(() => {
    let cancelled = false
    async function fetchBids() {
      try {
        const res = await fetch(API)
        if (!res.ok) throw new Error('fetch failed')
        const data = await res.json()
        if (!cancelled) {
          setBids(data.data || [])
          setFilteredBids(data.data || [])
        }
      } catch (err) {
        if (!cancelled) setError(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchBids()
    return () => {
      cancelled = true
    }
  }, [])

  // Handle search button click
  const handleSearch = () => {
    const filtered = bids.filter(bid => 
      bid.createdBy?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bid.bidNumber?.includes(searchTerm)
    )
    setFilteredBids(filtered)
  }

  // Handle sort change
  const handleSort = (e) => {
    const sortValue = e.target.value
    setSortBy(sortValue)
    
    let sorted = [...filteredBids]
    
    switch(sortValue) {
      case 'date':
        sorted.sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
        break
      case 'name':
        sorted.sort((a, b) => a.createdBy.localeCompare(b.createdBy))
        break
      case 'responses':
        sorted.sort((a, b) => (b.response || 0) - (a.response || 0))
        break
      default:
        break
    }
    
    setFilteredBids(sorted)
  }

  // Handle clear search
  const handleClearSearch = () => {
    setSearchTerm('')
    setFilteredBids(bids)
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
          />
          <button className="search-btn" onClick={handleSearch}>Search</button>
          {searchTerm && (
            <button className="clear-btn" onClick={handleClearSearch}>Clear</button>
          )}
          <select className="sort-select" value={sortBy} onChange={handleSort}>
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
            <option value="responses">Sort by Responses</option>
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
            {filteredBids.map((bid, index) => (
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
    </main>
  )
}