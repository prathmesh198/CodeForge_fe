
const API_BASE_URL =
    "https://codeforge-backend-v0ij.onrender.com";


// ===============================
// REGISTER
// ===============================

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
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        }
    );

    const text = await response.text();

    console.log(
        "REGISTER STATUS:",
        response.status
    );

    console.log(
        "REGISTER RESPONSE:",
        text
    );

    let data;

    try {
        data = JSON.parse(text);
    } catch {
        data = {
            detail:
                text ||
                "Invalid server response"
        };
    }

    if (!response.ok) {
        throw new Error(
            data.detail ||
            "Registration failed"
        );
    }

    return data;
}


// ===============================
// LOGIN
// ===============================

export async function loginUser(
    email,
    password
) {
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

    const text = await response.text();

    console.log(
        "LOGIN STATUS:",
        response.status
    );

    console.log(
        "LOGIN RESPONSE:",
        text
    );

    let data;

    try {
        data = JSON.parse(text);
    } catch {
        data = {
            detail:
                text ||
                "Invalid server response"
        };
    }

    if (!response.ok) {
        throw new Error(
            data.detail ||
            "Login failed"
        );
    }

    return data;
}


// ===============================
// GET ALL PROBLEMS
// ===============================

export async function getProblems() {
    const response = await fetch(
        `${API_BASE_URL}/problem`
    );

    const text = await response.text();

    console.log(
        "PROBLEMS STATUS:",
        response.status
    );

    let data;

    try {
        data = JSON.parse(text);
    } catch {
        data = {
            detail:
                text ||
                "Invalid server response"
        };
    }

    if (!response.ok) {
        throw new Error(
            data.detail ||
            "Failed to load problems"
        );
    }

    return data;
}


// ===============================
// GET SINGLE PROBLEM
// ===============================

export async function getProblem(id) {
    const response = await fetch(
        `${API_BASE_URL}/problem/${id}`
    );

    const text = await response.text();

    console.log(
        "PROBLEM STATUS:",
        response.status
    );

    let data;

    try {
        data = JSON.parse(text);
    } catch {
        data = {
            detail:
                text ||
                "Invalid server response"
        };
    }

    if (!response.ok) {
        throw new Error(
            data.detail ||
            "Failed to load problem"
        );
    }

    return data;
}


// ===============================
// EXECUTE CODE
// ===============================

export async function executeCode(payload) {
    const token =
        localStorage.getItem("token");

    const response = await fetch(
        `${API_BASE_URL}/execute`,
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json",

                ...(token
                    ? {
                        Authorization:
                            `Bearer ${token}`
                    }
                    : {})
            },

            body: JSON.stringify(payload)
        }
    );

    const text = await response.text();

    console.log(
        "EXECUTE STATUS:",
        response.status
    );

    console.log(
        "EXECUTE RESPONSE:",
        text
    );

    let data;

    try {
        data = JSON.parse(text);
    } catch {
        data = {
            detail:
                text ||
                "Invalid server response"
        };
    }

    if (!response.ok) {
        throw new Error(
            data.detail ||
            "Code execution failed"
        );
    }

    return data;
}


// ===============================
// GET PROFILE
// ===============================

export async function getProfile() {
    const token =
        localStorage.getItem("token");

    if (!token) {
        throw new Error(
            "Please login first"
        );
    }

    const response = await fetch(
        `${API_BASE_URL}/profile`,
        {
            method: "GET",

            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }
    );

    const text = await response.text();

    console.log(
        "PROFILE STATUS:",
        response.status
    );

    let data;

    try {
        data = JSON.parse(text);
    } catch {
        data = {
            detail:
                text ||
                "Invalid server response"
        };
    }

    if (!response.ok) {
        throw new Error(
            data.detail ||
            "Failed to load profile"
        );
    }

    return data;
}


// ===============================
// API BASE URL
// ===============================

export { API_BASE_URL };