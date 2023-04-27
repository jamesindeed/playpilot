import type { LayoutServerLoad } from "./$types";
import favorites from "../data/favorites";

export const load = (async () => {
    return {
        favorites: favorites,
    };
}) satisfies LayoutServerLoad;



