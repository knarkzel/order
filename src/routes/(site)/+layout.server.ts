import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = ({ locals: { admin }}) => {
  return {
    admin,
  };
};
