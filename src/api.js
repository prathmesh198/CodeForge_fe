const API_BASE_URL = "https://codeforge-backend-v0ij.onrender.com";

// =====================================================
// HELPER
// =====================================================

async function handleResponse(response) {
    const text = await response.text();

    console.log("API STATUS:", response.status);
    console.log("API RESPONSE:", text);

    let data;

    try {
        data = text ? JSON.parse(text) : {};
    } catch {
        data = {
            detail: text || "Invalid server response"
        };
    }

    if (!response.ok) {
        throw new Error(
            data.detail ||
            data.message ||
            `Request failed with status ${response.status}`
        );
    }

    return data;
}


// =====================================================
// REGISTER
// =====================================================

export async function registerUser(
    username,
    email,
    password
) {
    const response = await fetch(
        `${API_BASE_URL}/register`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: username.trim(),
                email: email.trim(),
                password
            })
        }
    );

    return await handleResponse(response);
}


// =====================================================
// LOGIN
// =====================================================

export async function loginUser(
    email,
    password
) {
    const response = await fetch(
        `${API_BASE_URL}/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                email: email.trim(),
                password
            })
        }
    );

    const data = await handleResponse(response);

    // Save token after successful login
    if (data.access_token) {
        localStorage.setItem(
            "token",
            data.access_token
        );
    }

    // Save user information
    if (data.user) {
        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );
    }

    return data;
}


// =====================================================
// LOGOUT
// =====================================================

export function logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}


// =====================================================
// GET TOKEN
// =====================================================

function getToken() {
    return localStorage.getItem("token");
}


// =====================================================
// GET ALL PROBLEMS
// =====================================================

export async function getProblems() {
    const response = await fetch(
        `${API_BASE_URL}/problem`,
        {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        }
    );

    return await handleResponse(response);
}


// =====================================================
// GET SINGLE PROBLEM
// =====================================================

export async function getProblem(id) {
    const response = await fetch(
        `${API_BASE_URL}/problem/${id}`,
        {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        }
    );

    return await handleResponse(response);
}


// =====================================================
// SEARCH PROBLEMS
// =====================================================

export async function searchProblems(title) {
    const response = await fetch(
        `${API_BASE_URL}/problem/search?title=${encodeURIComponent(title)}`,
        {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        }
    );

    return await handleResponse(response);
}


// =====================================================
// EXECUTE CODE
// =====================================================

export async function executeCode(payload) {
    const token = getToken();

    if (!token) {
        throw new Error(
            "Please login before running or submitting code."
        );
    }

    const response = await fetch(
        `${API_BASE_URL}/execute`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify(payload)
        }
    );

    return await handleResponse(response);
}


// =====================================================
// GET PROFILE
// =====================================================

export async function getProfile() {
    const token = getToken();

    if (!token) {
        throw new Error(
            "Please login first."
        );
    }

    const response = await fetch(
        `${API_BASE_URL}/profile`,
        {
            method: "GET",

            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
    );

    return await handleResponse(response);
}


// =====================================================
// GET CURRENT USER
// =====================================================

export async function getCurrentUser() {
    const token = getToken();

    if (!token) {
        throw new Error(
            "Please login first."
        );
    }

    const response = await fetch(
        `${API_BASE_URL}/me`,
        {
            method: "GET",

            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
    );

    return await handleResponse(response);
}


// =====================================================
// CHECK LOGIN
// =====================================================

export function isLoggedIn() {
    return !!getToken();
}


// =====================================================
// API BASE URL
// =====================================================

export { API_BASE_URL };