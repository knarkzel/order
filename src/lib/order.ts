export function availableOrders(bundles, orders) {
  return orders.filter((order) => bundles.some((bundle) => !bundle.expand?.orders.some((bundleOrder) => bundleOrder.id === order.id)));
}
