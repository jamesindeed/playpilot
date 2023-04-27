<script lang="ts">
    import { enhance } from "$app/forms";
    import { goto } from "$app/navigation";
    import AnimeComponent from "../AnimeComponent.svelte";
    import type { PageData, ActionData } from "./$types";

    export let data: PageData;
    export let form: ActionData;
</script>

<div
    class="border border-neutral-900 bg-[#0E0E0E] rounded-lg gap-6 relative mx-auto min-h-screen max-w-screen-2xl py-8 px-4 sm:px-8"
>
    {#if form?.success === false}
        <div
            class="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
            <div
                class="bg-black border border-neutral-900 rounded-lg px-12 py-6 flex flex-col gap-4 justify-center"
            >
                <h3 class="text-lg text-white font-bold">
                    {#if form?.errors?.mal_id}
                        {form?.errors?.mal_id[0]}
                    {/if}
                    {#if form?.errors?.title}
                        {form?.errors?.title[0]}
                    {/if}
                    {#if form?.errors?.image}
                        {form?.errors?.image[0]}
                    {/if}
                    {#if form?.errors?.message}
                        {form?.errors?.message}
                    {/if}
                </h3>
                <button
                    on:click={() => (form = null)}
                    class="border border-neutral-900 bg-[#0E0E0E] p-1.5 rounded-lg"
                >
                    Close
                </button>
            </div>
        </div>
    {/if}
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
