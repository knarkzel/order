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
  // Get orders
  const orders = await pb.collection("orders").getList(1, 25, {
    sort: "-created",
  });

  // Initialize form
  return {
    form: await superValidate(zod(schema)),
    orders: orders.items,
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
