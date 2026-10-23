const API_BASE_URL = "https://codeforge-backend-v0ij.onrender.com";

export async function getProblems() {
    const response = await fetch(`${API_BASE_URL}/problem`);

    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.detail || "Failed to load problems");
    }

    return response.json();
}

export async function getProblem(id) {
    const response = await fetch(
        `${API_BASE_URL}/problem/${id}`
    );

    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.detail || "Failed to load problem");
    }

    return response.json();
}

export async function registerUser(username, email, password) {
    const response = await fetch(
        `${API_BASE_URL}/register`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Registration failed");
    }

    return data;
}

export async function loginUser(email, password) {
    const response = await fetch(
        `${API_BASE_URL}/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Login failed");
    }

    return data;
}

export async function executeCode(payload) {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_BASE_URL}/execute`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token
                    ? {
                        Authorization: `Bearer ${token}`
                    }
                    : {})
            },
            body: JSON.stringify(payload)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail || "Code execution failed"
        );
    }

    return data;
}

export async function getProfile() {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_BASE_URL}/profile`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail || "Failed to load profile"
        );
    }

    return data;
}