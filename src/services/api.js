

const BASE_URL = "https://education.banglatechsolutionit.com/api";

/* =========================
   TOKEN MANAGEMENT
========================= */

export const tokenManager = {
  setToken: (token) => {
    localStorage.setItem("authToken", token);
  },

  getToken: () => {
    return localStorage.getItem("authToken");
  },

  removeToken: () => {
    localStorage.removeItem("authToken");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("authToken");
  },
};

/* =========================
   USER MANAGEMENT
========================= */

export const userManager = {
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  },

  getUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  removeUser: () => {
    localStorage.removeItem("user");
  },

  logout: () => {
    tokenManager.removeToken();
    userManager.removeUser();
  },
};

/* =========================
   RESPONSE NORMALIZER
========================= */

const normalizeData = (res) => {
  if (res?.data?.data) return res.data.data;
  if (res?.data) return res.data;
  return res;
};

/* =========================
   ERROR HANDLER
========================= */

const handleError = async (res) => {
  let message = "Something went wrong";

  try {
    const errorData = await res.json();
    message = errorData?.message || message;
  } catch (err) {
    console.error("Error parsing response:", err);
  }

  throw new Error(message);
};

/* =========================
   LOGIN
========================= */

export const login = async (email, password) => {
  const url = `${BASE_URL}/store-login-api?email=${encodeURIComponent(
    email
  )}&password=${encodeURIComponent(password)}`;

  console.log("Login URL:", url);

  const response = await fetch(url, {
    method: "POST",
  });

  const data = await response.json();
  console.log("Login Presponse:", data);

  if (!response.ok) {
    throw new Error(data?.message || "Login failed");
  }

  if (data?.status && data?.token) {
    tokenManager.setToken(data.token);

    if (data.user) {
      userManager.setUser(data.user);
    }

    return data;
  }

  throw new Error("Invalid login response");
};

/* =========================
   LOGOUT
========================= */

export const logout = () => {
  userManager.logout();
};

/* =========================
   GENERIC API REQUEST
========================= */

export const fetchData = async (
  endpoint,
  {
    method = "GET",
    body = null,
    headers = {},
    raw = false,
  } = {}
) => {
  const token = tokenManager.getToken();

  const response = await fetch(
    `${BASE_URL}/${endpoint}`,
    {
      method,
      headers: {
        "Content-Type": "application/json",

        ...(token && {
          Authorization: `Bearer ${token}`,
        }),

        ...headers,
      },

      body: body ? JSON.stringify(body) : undefined,
    }
  );

  if (response.status === 401 || response.status === 403) {
    logout();

    window.location.href = "/login";

    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    await handleError(response);
  }

  const json = await response.json();

  return raw ? json : normalizeData(json);
};

/* =========================
   WHY CHOOSE
========================= */

export const getWhyChooseData = (params) => {
  const query = new URLSearchParams(params).toString();
  // এন্ডপয়েন্টটি why-choose/index করে দেওয়া হলো
  return fetchData(`why-choose/index?${query}`); 
};
/* =========================
   COMMON CRUD HELPERS
========================= */

export const getData = (endpoint) => {
  return fetchData(endpoint);
};

export const createData = (endpoint, data) => {
  return fetchData(endpoint, {
    method: "POST",
    body: data,
  });
};

export const updateData = (endpoint, data) => {
  return fetchData(endpoint, {
    method: "PUT",
    body: data,
  });
};

export const deleteData = (endpoint) => {
  return fetchData(endpoint, {
    method: "DELETE",
  });
};