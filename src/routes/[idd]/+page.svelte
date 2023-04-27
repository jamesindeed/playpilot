<script lang="ts">
    import { enhance } from "$app/forms";
    import { goto } from "$app/navigation";
    import AnimeComponent from "../AnimeComponent.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<div
    class="border border-neutral-900 bg-[#0E0E0E] rounded-lg gap-6 relative mx-auto min-h-screen max-w-screen-2xl py-8 px-4 sm:px-8"
>
    <AnimeComponent
        title={data.anime.title}
        mal_id={data.anime.mal_id}
        image={data.anime.images.webp.image_url}
    />

    <div class="flex gap-4 mt-6">
        {#each data.anime.genres as genre}
            <div
                class="bg-white text-black py-1 px-3 rounded-full text-xs font-semibold"
            >
                {genre.name}
            </div>
        {/each}
    </div>

    <div class="text-neutral-100 mt-6">
        <h2 class="text-xl font-bold mb-2">Synopsis</h2>
        <p>{data.anime.synopsis}</p>
    </div>

    <div class="flex gap-4 mt-6">
        <form action="?/addToFavorites" method="post" use:enhance>
            <input type="hidden" name="mal_id" value={data.anime.mal_id} />
            <input type="hidden" name="title" value={data.anime.title} />
            <input
                type="hidden"
                name="image"
                value={data.anime.images.webp.image_url}
            />
            <button class="bg-white text-black rounded p-3" type="submit">
                Add to favorites
            </button>
        </form>
        <form action="?/deleteFromFavorites" method="post" use:enhance>
            <input type="hidden" name="mal_id" value={data.anime.mal_id} />
            <button class="bg-white text-black rounded p-3" type="submit">
                Delete from favorites
            </button>
        </form>

        <button
            class="bg-white text-black rounded p-3"
            on:click={() => goto("/")}
        >
            Go back to list
        </button>
    </div>
</div>
