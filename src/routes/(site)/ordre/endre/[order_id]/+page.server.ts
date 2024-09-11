import type { Actions } from "./$types";
import type { PageServerLoad } from "./$types";
import { z } from "zod";
import { zod } from "sveltekit-superforms/adapters";
import { fail, setError, superValidate } from "sveltekit-superforms";
import { contentToItems } from "$lib/order";
import { redirect } from "@sveltejs/kit";

const schema = z.object({
  name: z.string().min(1, { message: "Navn kan ikke være tomt" }),
  content: z.string().min(1, { message: "Bestilling kan ikke være tom" }),
});

export const load: PageServerLoad = async ({ params: { order_id }, locals: { pb } }) => {
  // Get order
  const order = await pb.collection("orders").getOne(order_id);
  const content = order.items.map(line => `- ${line}`).join("\n");
  console.log(order);
  
  // Initialize form
  return {
    form: await superValidate({ ...order, content }, zod(schema)),
  };
};

export const actions: Actions = {
  default: async ({ request, url, params: { order_id }, locals: { pb } }) => {
    // Validate form
    const form = await superValidate(request, zod(schema));
    if (!form.valid) return fail(400, { form });
    const { name, content } = form.data;

    // Update order
    try {
      await pb.collection("orders").update(order_id, {
        name,
        items: contentToItems(content),
      });
    } catch (message) {
      console.error(message);
      return setError(form, "content", "Klarte ikke å oppdatere bestilling");
    }
    return redirect(303, url.searchParams.get("from") || "/pakke");
  },
};
