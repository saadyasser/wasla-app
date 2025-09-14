"use server"
import { signIn } from "../../auth"

export const loginHandler = async (formData) => {
    console.log(formData, 'credintial auth.')
    await signIn("credentials", formData)
  }

