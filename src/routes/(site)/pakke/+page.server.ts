import type { Actions } from "./$types";
import type { PageServerLoad } from "./$types";
import { z } from "zod";
import { zod } from "sveltekit-superforms/adapters";
import { fail, setError, superValidate } from "sveltekit-superforms";

const schema = z.object({
  name: z.string().min(1, { message: "Navn kan ikke være tomt" }),
  orders: z.array(z.string()).nonempty({ message: "Velg minst en ordre" }),
});

export const load: PageServerLoad = async ({ locals: { pb } }) => {
  // Get bundles and orders
  const bundles = await pb.collection("bundles").getList(1, 25, {
    expand: "orders",
    sort: "-created",
  });
  const orders = await pb.collection("orders").getFullList({
    sort: "-created",
  });

  // Initialize form
  return {
    form: await superValidate(zod(schema)),
    bundles: bundles.items,
    orders,
  };
};

export const actions: Actions = {
  default: async ({ request, locals: { pb } }) => {
    // Validate form
    const form = await superValidate(request, zod(schema));
    if (!form.valid) return fail(400, { form });
    const { name, orders } = form.data;

    // Create order
    try {
      await pb.collection("bundles").create({
        name,
        orders,
      });
    } catch (message) {
      console.error(message);
      return setError(form, "name", "Klarte ikke å lage ordre");
    }
  },
};
