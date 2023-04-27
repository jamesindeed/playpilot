import { apiRequest } from "$lib/api.util";
import favorites from "../../data/favorites";
import type { Actions, PageServerLoad } from "./$types";
import { z } from "zod";

export type Anime = {
    data: {
        mal_id: number;
        title: string;
        url: string;
        images: {
            webp: {
                image_url: string;
                small_image_url: string;
                large_image_url: string;
            };
        };
        genres: {
            name: string;
        }[];
        synopsis: string;
    };
};

const addSchema = z.object({
    mal_id: z.string(),
    title: z.string(),
    image: z.string(),
});

const deleteSchema = z.object({
    mal_id: z.string(),
});

export const load = (async ({ params }) => {
    const id = params.idd;
    const anime = await apiRequest<Anime>(`anime/${id}`);
    return {
        anime: anime.data,
    };
}) satisfies PageServerLoad;

export const actions = {
    addToFavorites: async ({ request }) => {
        const form = Object.fromEntries(await request.formData());
        try {
            const result = addSchema.parse(form);
            const { mal_id, title, image } = result;
            if (favorites.has(mal_id)) {
                return {
                    success: false,
                    errors: { message: "Already in favorites" },
                };
            }
            favorites.set(mal_id, { title, image });
            return { success: true };
        } catch (err) {
            const { fieldErrors: errors } = err.flatten();
            return { success: false, errors };
        }
    },
    deleteFromFavorites: async ({ request }) => {
        const form = Object.fromEntries(await request.formData());
        try {
            const result = deleteSchema.parse(form);
            const { mal_id } = result;
            if (!favorites.has(mal_id)) {
                return {
                    success: false,
                    errors: { message: "Not in favorites" },
                };
            }
            favorites.delete(mal_id);
            return { success: true };
        } catch (err) {
            const { fieldErrors: errors } = err.flatten();
            return { success: false, errors };
        }
    },
} satisfies Actions;
