const API_BASE = 'http://localhost:5000'

export interface User {
  id: number
  username: string
}

export interface Todo {
  id: number
  title: string
  done: boolean
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  const body = await res.json().catch(() => null)
  if (!res.ok) {
    throw new Error(body?.error ?? `HTTP ${res.status}`)
  }
  return body as T
}

export async function register(username: string, password: string): Promise<User> {
  const data = await request<{ user: User }>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })
  return data.user
}

export async function login(username: string, password: string): Promise<User> {
  const data = await request<{ user: User }>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })
  return data.user
}

export async function logout(): Promise<void> {
  await request<{ ok: boolean }>('/api/auth/logout', { method: 'POST' })
}

export async function me(): Promise<User> {
  const data = await request<{ user: User }>('/api/auth/me')
  return data.user
}

export async function getTodos(): Promise<Todo[]> {
  const data = await request<{ todos: Todo[] }>('/api/todos')
  return data.todos
}

export async function createTodo(title: string): Promise<Todo> {
  const data = await request<{ todo: Todo }>('/api/todos', {
    method: 'POST',
    body: JSON.stringify({ title }),
  })
  return data.todo
}

export async function updateTodo(id: number, done: boolean): Promise<void> {
  await request<{ ok: boolean }>(`/api/todos/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ done }),
  })
}

export async function deleteTodo(id: number): Promise<void> {
  await request<{ ok: boolean }>(`/api/todos/${id}`, { method: 'DELETE' })
}
