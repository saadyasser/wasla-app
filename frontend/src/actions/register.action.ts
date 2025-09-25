"use server"

import { signIn } from "../../auth"

export type RegisterPayload = {
  name: string
  email: string
  password: string
  password_confirmation: string
  role: string
}

export type RegisterResponse = {
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

export async function registerHandler(payload: RegisterPayload) {
  const endpointBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:6565/api/v1"
  const url = `${endpointBase.replace(/\/$/, '')}/register`

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  })

  const responseBody = await response
    .json()
    .catch(() => ({ message: "Invalid JSON response" }))

  if (!response.ok) {
    const message =
      (responseBody && (responseBody.message || responseBody.error)) ||
      "Registration failed"
    throw new Error(message)
  }

  await signIn("credentials", {email: payload.email, password: payload.password, redirectTo: "/"})
  const code = Number(responseBody?.code)
  const message = String(responseBody?.message ?? "")
  const user = responseBody?.data?.user
  const accessToken = responseBody?.data?.access_token

  if (!user || !accessToken) {
    throw new Error("Malformed registration response")
  }

  const normalized: RegisterResponse = {
    code: Number.isNaN(code) ? 201 : code,
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

  return normalized
}


