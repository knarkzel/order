import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import type { PageServerLoad } from "./$types";
import { z } from "zod";
import { zod } from "sveltekit-superforms/adapters";
import { fail, setError, superValidate } from "sveltekit-superforms";

const schema = z.object({
  email: z.string(),
  password: z.string(),
});

export const load: PageServerLoad = async () => {
  // Initialize form
  return {
    form: await superValidate(zod(schema)),
  };
};

export const actions: Actions = {
  default: async ({ request, url, locals: { pb } }) => {
    // Validate form
    const form = await superValidate(request, zod(schema));
    if (!form.valid) return fail(400, { form });
    const { email, password } = form.data;

    // Login admin
    try {
      await pb.admins.authWithPassword(email, password);
    } catch (message) {
      console.error(message);
      return setError(form, "password", "Email or password is invalid");
    }
    return redirect(303, url.searchParams.get("from") || "/");
  },
};
