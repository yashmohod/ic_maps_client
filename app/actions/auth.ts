"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


function normalizeAuthError(err: unknown): string {
  // Better Auth often throws objects / Response-like errors, not always Error
  if (err instanceof Error) return err.message;

  if (typeof err === "string") return err;

  // common patterns
  const anyErr = err as any;
  return (
    anyErr?.body?.message ||
    anyErr?.body?.error ||
    anyErr?.message ||
    anyErr?.error ||
    "Invalid email or password"
  );
}

export async function signUpAction(email: string, password: string,name:password) {
   try {
    await auth.api.signUpEmail({
      body: {
        email: email, // required
        password: password, // required
        name: name,
        callbackURL: "/",
    },
    // This endpoint requires session cookies.
    headers: await headers(),
    });

    return { success: true, message: "Account created!" };
  } catch (err) {
    // IMPORTANT: return a string, not an object
    return { success: false, message: normalizeAuthError(err) };
  }}
export async function signInAction(email: string, password: string) {
  try {
    await auth.api.signInEmail({
      body: {
        email: email, // required
        password: password, // required
        rememberMe: true,
        callbackURL: "/",
    },
    // This endpoint requires session cookies.
    headers: await headers(),
    });

    return { success: true, message: "Logged in successfully" };
  } catch (err) {
    // IMPORTANT: return a string, not an object
    return { success: false, message: normalizeAuthError(err) };
  }
}

export async function signOutAction() {
  await auth.api.signOut({ headers: await headers() });
  redirect("/");
}
