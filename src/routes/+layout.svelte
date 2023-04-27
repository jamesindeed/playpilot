<script lang="ts">
    import "../app.css";
    import type { LayoutData } from "./$types";
    import AnimeComponent from "./AnimeComponent.svelte";
    export let data: LayoutData;
</script>

<div
    class="grid sm:grid-cols-3 gap-6 relative mx-auto min-h-screen max-w-screen-2xl py-8 px-4 sm:px-8"
>
    <div
        class="z-[-1] absolute left-1/4 top-0 h-[80rem] w-[85rem] opacity-50 [mask-image:linear-gradient(white,transparent)]"
    >
        <div
            class="to-highlight-200 to-highlight-200/20 absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] from-rose-500/50 opacity-100"
        >
            <svg
                aria-hidden="true"
                class="fill-white/2.5 absolute inset-x-0 inset-y-[-20%] h-[200%] w-full skew-y-[15deg] mix-blend-overlay stroke-white/5"
            >
                <defs>
                    <pattern
                        id=":rc:"
                        width="40"
                        height="30"
                        patternUnits="userSpaceOnUse"
                        x="-12"
                        y="4"
                    >
                        <path d="M.5 56V.5H72" fill="none" />
                    </pattern>
                </defs>
            </svg>
        </div>
    </div>
    <div class="sm:col-span-2 order-1 sm:order-none">
        <slot />
    </div>
    <div
        class="sm:col-span-1 p-6 rounded-lg border border-neutral-900 bg-[#0E0E0E] overflow-auto h-fit"
    >
        <h1
            class="text-2xl font-bold mb-8 pb-4 bor3der-b border-neutral-900 text-center"
        >
            Favorites
        </h1>

        {#each [...data.favorites] as [key, value]}
            <div class="mb-8">
                <AnimeComponent
                    center={true}
                    title={value.title}
                    mal_id={key}
                    image={value.image}
                />

                <button
                    on:click={() => {
                        fetch(`/api/favorites/${key}`, {
                            method: "DELETE",
                        }).then(() => {
                            data.favorites.delete(key);
                            data.favorites = new Map(data.favorites);
                        });
                    }}
                    type="submit"
                    class="w-full text-center mt-3"
                >
                    Delete
                </button>
            </div>
        {/each}

        {#if data.favorites.size === 0}
            <div class="text-center text-neutral-200">
                <p class="text-base">No favorites yet</p>
                <p class="text-xs mt-2">
                    Try adding some by clicking the 'Add to favorites' button
                </p>
            </div>
        {/if}
    </div>
</div>
