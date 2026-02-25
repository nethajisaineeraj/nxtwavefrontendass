import {useEffect, useState} from 'react'
import BidCard from '../BidCard'
import './index.css'

const API = 'https://edtech-exam-api.vercel.app/api/bids'

export default function BidList() {
  const [bids, setBids] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function fetchBids() {
      try {
        const res = await fetch(API)
        if (!res.ok) throw new Error('fetch failed')
        const data = await res.json()
        if (!cancelled) {
          setBids(data.data || [])
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
    <main className="page">
      <div className="list-wrap">
        {bids.map(bid => (
          <BidCard key={bid.id} bid={bid} />
        ))}
      </div>
    </main>
  )
}
