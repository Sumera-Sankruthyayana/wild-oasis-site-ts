"use server";

import { auth } from "./auth";
import { signIn, signOut } from "./auth";
import { Guest } from "@/app/_types/Guest";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuest(formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const national_id = formData.get("national_id");

  if (!national_id || !/^[a-zA-Z0-9]{6,12}$/.test(national_id.toString())) {
    throw new Error("National ID must be 6-12 alphanumeric characters");
  }
  const [nationality, country_flag] = formData
    ?.get("nationality")
    ?.toString()
    .split("%") ?? ["", ""];

  const guest: Guest = {
    id: session.user.id,
    nationality,
    country_flag,
    national_id: national_id?.toString() ?? "",
    email: session.user.email ?? "",
    full_name: session.user.name ?? "",
  };

  const { error } = await supabase
    .from("guests")
    .update(guest)
    .eq("id", session.user.id);

  revalidatePath("/account/profile");

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
}
