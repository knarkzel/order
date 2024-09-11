import type { Actions } from "./$types";
import type { PageServerLoad } from "./$types";
import { z } from "zod";
import { zod } from "sveltekit-superforms/adapters";
import { fail, setError, superValidate } from "sveltekit-superforms";

const schema = z.object({
  invoice: z
    .instanceof(File)
    .refine((file) => file.type === "application/pdf", {
      message: "Faktura må være PDF",
    }),
});

export const load: PageServerLoad = async () => {
  // Initialize form
  return {
    form: await superValidate(zod(schema)),
  };
};

export const actions: Actions = {
  default: async ({ request, locals: { pb } }) => {
    // Validate form
    const form = await superValidate(request, zod(schema));
    if (!form.valid) return fail(400, { form });
    const { invoice } = form.data;

    // Upload invoice
    try {
      await pb.collection("invoices").create({
        file: invoice
      });
    } catch (message) {
      console.error(message);
      return setError(form, "invoice", "Klarte ikke å laste opp faktura");
    }
  },
};
