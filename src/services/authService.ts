const API_BASE = 'https://kodflix-backend-ztyc.onrender.com'

type RegisterPayload = {
  uname: string
  email: string
  phone: string
  password: string
}

type LoginPayload = {
  uname: string
  password: string
}

export type MeResponse = {
  authenticated?: boolean
  user?: unknown
  // allow any extra fields without breaking
  [key: string]: unknown
}

async function handleResponse<T>(response: Response): Promise<T> {
  let data: unknown = null

  try {
    data = await response.json()
  } catch {
    data = null
  }

  if (!response.ok) {
    const message =
      (data as any)?.message || (data as any)?.error || `Request failed with status ${response.status}`
    const error = new Error(message)
    console.error('Auth request failed', { message, status: response.status, url: response.url })
    throw error
  }

  return data as T
}

export async function registerUser(payload: RegisterPayload): Promise<unknown> {
  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify(payload),
    })
    return await handleResponse<unknown>(res)
  } catch (error) {
    console.error('Register request failed', error)
    throw error
  }
}

export async function loginUser(payload: LoginPayload): Promise<unknown> {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify(payload),
    })
    return await handleResponse<unknown>(res)
  } catch (error) {
    console.error('Login request failed', error)
    throw error
  }
}

export async function verifyUser(): Promise<MeResponse> {
  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
    })

    if (!res.ok) {
      console.error('Verify request failed', res.status, res.statusText)
      return { authenticated: false }
    }

    try {
      const data = (await res.json()) as MeResponse
      return data
    } catch {
      // e.g. 204 No Content but OK; treat as authenticated
      return { authenticated: true }
    }
  } catch (error) {
    console.error('Verify request failed (network/CORS)', error)
    return { authenticated: false }
  }
}

