import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url, params: { order_id }, locals: { pb } }) => {
  // Delete order
  await pb.collection("orders").delete(order_id);
  return redirect(303, url.searchParams.get("from") || "/pakke");
};
