import { POSTER_IMAGE_BASE_URL } from '../services/tmdb'
import type { TmdbMedia } from '../types/tmdb'
import { getMediaTitle } from '../types/tmdb'
import '../styles/MovieCard.css'

interface MovieCardProps {
  media: TmdbMedia
  isLarge?: boolean
}

export function MovieCard({ media, isLarge }: MovieCardProps) {
  const posterPath = isLarge ? media.poster_path : media.backdrop_path || media.poster_path

  if (!posterPath) {
    return null
  }

  const title = getMediaTitle(media)

  return (
    <div className={`movieCard ${isLarge ? 'movieCard--large' : ''}`}>
      <img
        className="movieCard__image"
        src={`${POSTER_IMAGE_BASE_URL}${posterPath}`}
        alt={title}
        loading="lazy"
      />
    </div>
  )
}

