import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url, params: { order_id }, locals: { pb } }) => {
  // Get order and create copy
  const order = await pb.collection("orders").getOne(order_id);
  const newOrder = await pb.collection("orders").create({
    ...order,
    id: undefined,
  });
  
  // Update bundle with new order
  const bundle_id = url.searchParams.get("bundle_id");
  const bundle = await pb.collection("bundles").getOne(bundle_id);
  await pb.collection("bundles").update(bundle_id, {
    ...bundle,
    orders: [newOrder.id, ...bundle.orders],
  });
  
  // Create bundle with those items
  return redirect(303, url.searchParams.get("from") || "/pakke");
};
