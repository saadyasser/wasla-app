"use server"
import { signIn } from "../../auth"

export const loginHandler = async (formData: { email: string; password: string }) => {
    await signIn("credentials", {...formData, redirectTo: "/profile"})
  }

export type LoginPayload = {
  email: string
  password: string
}

export type LoginResponse = {
  code: number
  message: string
  user: {
    id: number
    name: string
    email: string
    role: string
    created_at: string
  }
  accessToken: string
}

export async function loginViaApi(payload: LoginPayload): Promise<LoginResponse> {
  const endpointBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:6565/api/v1"
  const url = `${endpointBase.replace(/\/$/, '')}/login`
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  })

  const responseBody: unknown = await response
    .json()
    .catch(() => ({ message: "Invalid JSON response" }))

  if (!response.ok) {
    const body = responseBody as { message?: string; error?: string }
    const message = (body?.message || body?.error) || "Login failed"
    throw new Error(message)
  }

  const body = responseBody as {
    code?: number | string
    message?: string
    data?: {
      user?: {
        id: number | string
        name: string
        email: string
        role: string
        created_at: string
      }
      access_token?: string
    }
  }
  const code = Number(body?.code)
  const message = String(body?.message ?? "")
  const user = body?.data?.user
  const accessToken = body?.data?.access_token

  if (!user || !accessToken) {
    throw new Error("Malformed login response")
  }

  return {
    code: Number.isNaN(code) ? 200 : code,
    message,
    user: {
      id: Number(user.id),
      name: String(user.name),
      email: String(user.email),
      role: String(user.role),
      created_at: String(user.created_at),
    },
    accessToken: String(accessToken),
  }
}

