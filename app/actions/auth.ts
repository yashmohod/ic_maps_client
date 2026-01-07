"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signUpAction(formdata: FormData) {
  const email = formdata.get("email") as string;
  const password = formdata.get("password") as string;
  const name = formdata.get("name") as string;

  const data = await auth.api.signUpEmail({
    body: {
      name, // required
      email, // required
      password, // required
      image: "http://www.w3.org/2000/svg",
    },
  });
  redirect("/");
}

export async function signInAction(email: string, password: string) {
  const data = await auth.api.signInEmail({
    body: {
      email, // required
      password, // required
    },
  });
  redirect("/");
}

export async function signOutAction() {
  await auth.api.signOut({
    headers: await headers(),
  });
  redirect("/");
}
