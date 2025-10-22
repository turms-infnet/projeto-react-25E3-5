const ApiGiantBomb = {
    search: async (query, limit = 10, page = 1) => {
        const response = await fetch(`${process.env.REACT_APP_GIANT_BOMB_API_URL}/search/?api_key=${process.env.REACT_APP_GIANT_BOMB_API_KEY}&format=json&query=${encodeURIComponent(query)}&resources=game&limit=${limit}&page=${page}`);

        if (response.ok) {
            const json = await response.json();
            return {
                data: json.results,
                limit: json.limit,
                offset: json.offset,
                number_of_page_results: json.number_of_page_results,
                number_of_total_results: json.number_of_total_results,
                error: null
            };
        } else {
            return {
                data: null,
                error: `Error: ${response.status} ${response.statusText}`
            };
        }
    }
}

export default ApiGiantBomb;