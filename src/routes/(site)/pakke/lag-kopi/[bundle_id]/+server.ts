import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url, params: { bundle_id }, locals: { pb } }) => {
  // Get bundle
  const bundle = await pb.collection("bundles").getOne(bundle_id, {
    expand: "orders"
  });
  
  // Create copy of orders
  const orders = await Promise.all(bundle.expand?.orders.map(async (bundleOrder) => {
    const order = await pb.collection("orders").create({
      ...bundleOrder,
      id: undefined,
    });
    return order.id;
  }));
  
  // Create bundle with those items
  await pb.collection("bundles").create({
    name: bundle.name,
    orders,
  });
  return redirect(303, url.searchParams.get("from") || "/pakke");
};
