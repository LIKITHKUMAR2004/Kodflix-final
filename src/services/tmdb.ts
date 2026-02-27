const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string | undefined
const BEARER_TOKEN = import.meta.env.VITE_TMDB_BEARER as string | undefined

const BASE_URL = 'https://api.themoviedb.org/3'

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'
export const ORIGINAL_IMAGE_BASE_URL = `${IMAGE_BASE_URL}/original`
export const POSTER_IMAGE_BASE_URL = `${IMAGE_BASE_URL}/w500`

export const requests = {
  fetchTrending: '/trending/all/week',
  fetchNetflixOriginals: '/discover/tv',
  fetchTopRated: '/movie/top_rated',
  fetchActionMovies: '/discover/movie?with_genres=28',
  fetchComedyMovies: '/discover/movie?with_genres=35',
  fetchHorrorMovies: '/discover/movie?with_genres=27',
  fetchRomanceMovies: '/discover/movie?with_genres=10749',
  fetchDocumentaries: '/discover/movie?with_genres=99',
}

type QueryParams = Record<string, string | number | boolean | undefined>

function buildUrl(path: string, params: QueryParams = {}): string {
  if (!API_KEY && !BEARER_TOKEN) {
    throw new Error('Missing TMDB credentials. Set VITE_TMDB_API_KEY or VITE_TMDB_BEARER in .env.')
  }

  const url = new URL(path.startsWith('http') ? path : `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`)

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.set(key, String(value))
    }
  })

  return url.toString()
}

export async function fetchJson<T = unknown>(path: string, params: QueryParams = {}): Promise<T> {
  const baseUrl = buildUrl(path, params)
  const url = new URL(baseUrl)

  const headers: Record<string, string> = {
    Accept: 'application/json;charset=utf-8',
  }

  if (BEARER_TOKEN) {
    headers.Authorization = `Bearer ${BEARER_TOKEN}`
  } else if (API_KEY) {
    url.searchParams.set('api_key', API_KEY)
  }

  const response = await fetch(url.toString(), { headers })
  if (!response.ok) {
    const text = await response.text().catch(() => '')
    throw new Error(`TMDB request failed: ${response.status} ${response.statusText} - ${text}`)
  }

  return (await response.json()) as T
}

