import type { Actions } from "./$types";
import type { PageServerLoad } from "./$types";
import { z } from "zod";
import { zod } from "sveltekit-superforms/adapters";
import { fail, setError, superValidate } from "sveltekit-superforms";

const schema = z.object({
  name: z.string().min(1, { message: "Navn kan ikke være tomt" }),
  content: z.string().min(1, { message: "Bestilling kan ikke være tom" }),
});

export const load: PageServerLoad = async ({ locals: { pb } }) => {
  // Get bundles and orders
  const [bundles, orders] = await Promise.all([
    pb.collection("bundles").getFullList({
      expand: "orders",
      sort: "-created",
    }),
    pb.collection("orders").getFullList({
      sort: "-created",
    }),
  ]);

  // Initialize form
  return {
    form: await superValidate(zod(schema)),
    orders,
    bundles,
  };
};

export const actions: Actions = {
  default: async ({ request, locals: { pb } }) => {
    // Validate form
    const form = await superValidate(request, zod(schema));
    if (!form.valid) return fail(400, { form });
    const { name, content } = form.data;

    // Create order
    const items = content
      .split("\n")
      .map((line) => {
        return line.replace(/^[-\s]+/, "").trim();
      })
      .filter((line) => line.length > 0);
    try {
      await pb.collection("orders").create({
        name,
        items,
      });
    } catch (message) {
      console.error(message);
      return setError(form, "content", "Klarte ikke å lage bestilling");
    }
  },
};
