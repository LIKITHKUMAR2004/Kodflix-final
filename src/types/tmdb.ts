export interface TmdbMedia {
  id: number
  name?: string
  title?: string
  original_name?: string
  original_title?: string
  overview?: string
  backdrop_path?: string | null
  poster_path?: string | null
  media_type?: 'movie' | 'tv'
  vote_average?: number
  release_date?: string
  first_air_date?: string
}

export interface TmdbPaginatedResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export function getMediaTitle(media: TmdbMedia): string {
  return media.title || media.name || media.original_title || media.original_name || 'Untitled'
}

