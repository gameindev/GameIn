/** application/x-www-form-urlencoded POST returning JSON */
export async function postFormForJson<T>(url: string, form: Record<string, string>, headers: Record<string, string> = {}): Promise<T> {
    const body = new URLSearchParams(form).toString();
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            ...headers,
        },
        body,
    });
    const text = await res.text();
    if (!res.ok) {
        throw new Error(`${url} -> ${res.status}: ${text}`);
    }
    try {
        return JSON.parse(text) as T;
    } catch {
        throw new Error(`${url} -> invalid JSON: ${text.slice(0, 200)}`);
    }
}

export async function getJson<T>(url: string, headers: Record<string, string> = {}): Promise<T> {
    const res = await fetch(url, { headers, method: 'GET' });
    const text = await res.text();
    if (!res.ok) {
        throw new Error(`GET ${url} -> ${res.status}: ${text}`);
    }
    return JSON.parse(text) as T;
}
