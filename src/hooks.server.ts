import { pb } from "$lib/pb.svelte";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  // Initialize PocketBase
  pb.authStore.loadFromCookie(event.request.headers.get("cookie") || "");

  // Synchronize pb and user
  if (pb.authStore.isValid) {
    event.locals.admin = structuredClone(pb.authStore.model);
  } else {
    event.locals.admin = undefined;
  }
  event.locals.pb = pb;
  
  // If not logged in as admin, redirect to login
  if (!event.locals.admin && !event.url.pathname.startsWith("/login")) {
    return redirect(302, `/login?from=${event.url}`);
  }

  // Return response with user
  const response = await resolve(event);
  response.headers.set("set-cookie", event.locals.pb.authStore.exportToCookie({ httpOnly: false, sameSite: "lax" }));
  return response;
};
