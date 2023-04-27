<script lang="ts">
    import type { PageData } from "./$types";
    import AnimeComponent from "./AnimeComponent.svelte";

    export let data: PageData;

    let isTruncated = true;

    function toggleTruncated() {
        isTruncated = !isTruncated;
    }

    function isTextLongEnough(text: string) {
        return text.length > 240;
    }
</script>

{#each data.recommended.data as recommendation}
    <div class="border border-neutral-900 bg-[#0E0E0E] rounded-lg mb-4 p-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {#each recommendation.entry as subRecommendation}
                <div
                    class="col-span-1 text-center p-2 text-xl font-bold mb-2 w-full"
                >
                    <AnimeComponent
                        center={true}
                        title={subRecommendation.title}
                        mal_id={subRecommendation.mal_id}
                        image={subRecommendation.images.webp.image_url}
                    />
                </div>
            {/each}
        </div>

        <hr class="col-span-2 my-4 border-neutral-900" />

        <p class={`col-span-2 text-neutral-100`}>
            {isTruncated && isTextLongEnough(recommendation.content)
                ? recommendation.content.slice(0, 240) + "..."
                : recommendation.content}
        </p>
        <button
            class="col-span-2 mt-2 text-neutral-100"
            hidden={!isTextLongEnough(recommendation.content)}
            on:click={toggleTruncated}
        >
            {isTruncated ? "Show more" : "Show less"}
        </button>
    </div>
{/each}
