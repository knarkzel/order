import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ locals: { pb } }) => {
  // Logout
  pb.authStore.clear();
  return redirect(303, "/");
};
