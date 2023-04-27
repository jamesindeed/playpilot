import favorites from "../../../../data/favorites"

export async function DELETE({ params }) {
    const { mal_id } = params;

    const exists = favorites.has(mal_id);

    if (exists) {
        favorites.delete(mal_id);
        return new Response(null, {
            status: 204
        });
    } else {
        return new Response(null, {
            status: 404
        });
    }
}