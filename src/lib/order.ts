export function availableOrders(bundles, orders) {
  if (bundles.length > 0) {
    // Filter out orders that are already in bundles
    const bundledOrderIds = new Set(bundles.flatMap(bundle => bundle.orders));
    return orders.filter(order => !bundledOrderIds.has(order.id));
  } else {
    return orders;
  }
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
