export function availableOrders(bundles, orders) {
  return orders.filter((order) => bundles.some((bundle) => !bundle.expand?.orders.some((bundleOrder) => bundleOrder.id === order.id)));
}

export function contentToItems(content: string): string[] {
  const items = content
    .split("\n")
    .map((line) => {
      return line.replace(/^[-\s]+/, "").trim();
    })
    .filter((line) => line.length > 0);
  return items;
}
