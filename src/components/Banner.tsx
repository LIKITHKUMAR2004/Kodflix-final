import { useEffect, useState } from 'react'
import { ORIGINAL_IMAGE_BASE_URL, requests, fetchJson } from '../services/tmdb'
import type { TmdbMedia, TmdbPaginatedResponse } from '../types/tmdb'
import { getMediaTitle } from '../types/tmdb'
import '../styles/Banner.css'

function truncate(text: string | undefined, n: number): string {
  if (!text) return ''
  return text.length > n ? `${text.slice(0, n - 1)}…` : text
}

export function Banner() {
  const [media, setMedia] = useState<TmdbMedia | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadFeatured() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchJson<TmdbPaginatedResponse<TmdbMedia>>(requests.fetchNetflixOriginals + '?with_networks=213')
        const results = data.results ?? []
        if (!cancelled && results.length > 0) {
          const randomIndex = Math.floor(Math.random() * results.length)
          setMedia(results[randomIndex])
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Failed to load banner from TMDB', err)
          setError('Unable to load featured title.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadFeatured()

    return () => {
      cancelled = true
    }
  }, [])

  const title = media ? getMediaTitle(media) : ''
  const backdropPath = media?.backdrop_path || media?.poster_path
  const backgroundImage = backdropPath ? `${ORIGINAL_IMAGE_BASE_URL}${backdropPath}` : undefined

  return (
    <section
      className="banner"
      style={
        backgroundImage
          ? {
              backgroundImage: `url("${backgroundImage}")`,
            }
          : undefined
      }
    >
      <div className="banner__overlay" />
      <div className="banner__contents">
        {loading && <div className="banner__status">Loading featured title...</div>}
        {error && !loading && <div className="banner__status banner__status--error">{error}</div>}
        {!loading && !error && (
          <>
            <h1 className="banner__title">{title}</h1>
            <div className="banner__buttons">
              <button className="banner__button banner__button--primary">Play</button>
              <button className="banner__button banner__button--secondary">My List</button>
            </div>
            <p className="banner__description">{truncate(media?.overview, 150)}</p>
          </>
        )}
      </div>
      <div className="banner__fadeBottom" />
    </section>
  )
}

