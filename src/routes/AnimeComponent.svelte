<script lang="ts">
    import { goto } from "$app/navigation";

    export let title: string;
    export let mal_id: number;
    export let image: string;
    export let center: boolean = false;
</script>

<div class={`flex flex-col ${center && " items-center justify-center"}`}>
    <h1 class="text-xl font-bold mb-4">{title}</h1>
    <div>
        <img
            class={`hover:opacity-80 transition-all hover:cursor-pointer rounded-lg w-auto max-h-[300px] object-cover  ${
                !mal_id && "grayscale"
            }`}
            src={image}
            alt={title}
            on:click={() => mal_id && goto(`/${mal_id}`)}
            on:keydown={(e) => {
                if (e.key === "Enter") {
                    goto(`/${mal_id}`);
                }
            }}
        />
    </div>
</div>
