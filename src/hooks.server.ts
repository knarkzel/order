import { pb } from "$lib/pb.svelte";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  // Initialize PocketBase
  pb.authStore.loadFromCookie(event.request.headers.get("cookie") || "");

  // Synchronize pb and user
  event.locals.pb = pb;
  if (event.locals.pb.authStore.isValid) {
    const model = event.locals.pb.authStore.model;
    event.locals.admin = structuredClone(model);
  } else {
    event.locals.admin = undefined;
  }

  // If not logged in as admin, redirect to login
  if (!event.locals.admin && !event.url.pathname.startsWith("/login")) {
    return redirect(302, `/login?from=${event.url}`);
  }

  // Return response with user
  const response = await resolve(event);
  response.headers.set("set-cookie", event.locals.pb.authStore.exportToCookie({ httpOnly: false, sameSite: "lax" }));
  return response;
};
