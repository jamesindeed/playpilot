import { apiRequest } from "$lib/api.util";
import favorites from "../../data/favorites";
import type { Actions, PageServerLoad } from "./$types";
import { z } from "zod";
import { fail } from "@sveltejs/kit";

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
    mal_id: z.string().min(1),
    title: z.string().min(1),
    image: z.string().optional(),
});

const deleteSchema = z.object({
    mal_id: z.string().min(1),
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
        // const form = Object.fromEntries(await request.formData());
        const form = await request.formData();

        // Just to show, here mail_id is a FormDataEntryValue | null
        const mal_id_form = form.get("mal_id");
        const title_form = form.get("title");
        const image_form = form.get("image");
        const result = addSchema.safeParse({
            mal_id: mal_id_form,
            title: title_form,
            image: image_form,
        });
        if (!result.success) {
            console.error(result.error.flatten());
            return fail(409, { form: result.error.flatten() });
        }
        // Here we have a proper type set, that's why zod is amazing lib
        const { mal_id, title, image } = result.data;
        if (favorites.has(result.data.mal_id)) {
            console.error("Already in favorites");
            return fail(409, {
                error: `${title} is already in favorites`,
            });
        }
        favorites.set(mal_id, { title, image: image ?? "" });
        return { success: true };
    },
    deleteFromFavorites: async ({ request }) => {
        const form = Object.fromEntries(await request.formData());
        const result = deleteSchema.safeParse(form);
        if (!result.success) {
            console.error(result.error.flatten());
            return fail(409, { form: result.error.flatten() });
        }
        const { mal_id } = result.data;
        if (!favorites.has(mal_id)) {
            console.error("Not in favorites");
            return fail(409, {
                error: `${mal_id} is not in favorites`,
            });
        }
        favorites.delete(mal_id);
        return { success: true };
    },
} satisfies Actions;
