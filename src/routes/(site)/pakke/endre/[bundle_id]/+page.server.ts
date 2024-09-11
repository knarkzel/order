import type { Actions } from "./$types";
import type { PageServerLoad } from "./$types";
import { z } from "zod";
import { zod } from "sveltekit-superforms/adapters";
import { fail, setError, superValidate } from "sveltekit-superforms";
import { redirect } from "@sveltejs/kit";

const schema = z.object({
  name: z.string().min(1, { message: "Navn kan ikke være tomt" }),
  orders: z.array(z.string()).nonempty({ message: "Velg minst en ordre" }),
});

export const load: PageServerLoad = async ({ params: { bundle_id }, locals: { pb } }) => {
  // Get bundle
  const [bundle, orders] = await Promise.all([
    pb.collection("bundles").getOne(bundle_id, {
      expand: "orders",
    }),
    pb.collection("orders").getFullList({
      sort: "-created",
    }),
  ]);
  
  // Initialize form
  return {
    form: await superValidate(bundle, zod(schema)),
    orders,
  };
};

export const actions: Actions = {
  default: async ({ request, url, params: { bundle_id }, locals: { pb } }) => {
    // Validate form
    const form = await superValidate(request, zod(schema));
    if (!form.valid) return fail(400, { form });
    const { name, orders } = form.data;

    // Update order
    try {
      await pb.collection("bundles").update(bundle_id, {
        name,
        orders,
      });
    } catch (message) {
      console.error(message);
      return setError(form, "name", "Klarte ikke å oppdatere pakke");
    }
    return redirect(303, url.searchParams.get("from") || "/pakke");
  },
};
