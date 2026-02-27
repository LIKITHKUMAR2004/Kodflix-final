import { useEffect, useState } from 'react'
import { fetchJson } from '../services/tmdb'
import type { TmdbMedia, TmdbPaginatedResponse } from '../types/tmdb'
import { MovieCard } from './MovieCard'
import '../styles/Row.css'

interface RowProps {
  title: string
  fetchUrl: string
  isLargeRow?: boolean
}

export function Row({ title, fetchUrl, isLargeRow }: RowProps) {
  const [items, setItems] = useState<TmdbMedia[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchJson<TmdbPaginatedResponse<TmdbMedia>>(fetchUrl)
        if (!cancelled) {
          setItems(data.results ?? [])
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Failed to load TMDB row', err)
          setError('Unable to load titles right now.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [fetchUrl])

  return (
    <section className="row">
      <h2 className="row__title">{title}</h2>
      {loading && <div className="row__status">Loading...</div>}
      {error && !loading && <div className="row__status row__status--error">{error}</div>}
      <div className="row__posters">
        {items.map((media) => (
          <MovieCard key={media.id} media={media} isLarge={isLargeRow} />
        ))}
      </div>
    </section>
  )
}

