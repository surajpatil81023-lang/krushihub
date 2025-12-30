export async function apiRequest(url: string, options: RequestInit = {}) {
    const defaults = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    options = {
        ...defaults,
        ...options,
        headers: {
            ...defaults.headers,
            ...options.headers,
        }
    };

    const response = await fetch(url, options);

    if (!response.ok) {
        let errorMessage = "An error occurred";
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } catch (e) {
            // Fallback if parsing json fails
            errorMessage = response.statusText;
        }
        throw new Error(errorMessage);
    }

    return response.json();
}
