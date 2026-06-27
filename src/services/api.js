const BASE_URL = "https://api.crownbridgeinternational-edu.com/api";

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
   GENERIC API REQUEST (🚀 MODIFIED FOR FILE UPLOAD)
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

  const config = {
    method,
    headers: {
      ...(body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),

      ...headers,
    },
    
    body: body instanceof FormData ? body : (body ? JSON.stringify(body) : undefined),
  };

  const response = await fetch(`${BASE_URL}/${endpoint}`, config);

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
  return fetchData(`why-choose/index?${query}`); 
};

export const updateWhyChooseData = (id, data) => {
  return fetchData(`why-choose/update/${id}`, {
    method: "POST", 
    body: data,
  });
};

export const storeWhyChooseData = (data) => {
  return fetchData("why-choose/store", {
    method: "POST",
    body: data,
  });
};

export const deleteWhyChooseData = (id) => {
  return fetchData(`why-choose/delete/${id}`, {
    method: "DELETE", 
  });
};

/* =========================
   FIXED & ACTIVE: ACADEMIC PROGRAMS
========================= */
export const getProgramsData = (params) => {
  const query = new URLSearchParams(params).toString();
  return fetchData(`program/index?${query}`); 
};

export const storeProgramsData = (data) => {
  return fetchData("program/store", {
    method: "POST",
    body: data,
  });
};

export const updateProgramsData = (id, data) => {
  return fetchData(`program/update/${id}`, {
    method: "POST",
    body: data,
  });
};

export const deleteProgramsData = (id) => {
  return fetchData(`program/delete/${id}`, {
    method: "DELETE", 
  });
};

/* =========================
   NEW: HIGHLIGHT CARDS
========================= */
export const getHighlightCardsData = (params) => {
  const query = new URLSearchParams(params).toString();
  return fetchData(`highlight-card/index?${query}`); 
};

export const storeHighlightCardData = (data) => {
  return fetchData("highlight-card/store", {
    method: "POST",
    body: data, 
  });
};

export const updateHighlightCardData = (id, data) => {
  return fetchData(`highlight-card/update/${id}`, {
    method: "POST",
    body: data,
  });
};

export const deleteHighlightCardData = (id) => {
  return fetchData(`highlight-card/delete/${id}`, {
    method: "DELETE", 
  });
};


/* =========================
   Team Section
========================= */

export const getTeamData = (params) => {
  const query = new URLSearchParams(params).toString();
  return fetchData(`team-member/index?${query}`); 
};


export const storeTeamData = (data) => {
  return fetchData("team-member/store", {
    method: "POST",
    body: data, 
  });
};

export const updateTeamData = (id, data) => {
  return fetchData(`team-member/update/${id}`, {
    method: "POST",
    body: data,
  });
};

export const deleteTeamData = (id) => {
  return fetchData(`team-member/delete/${id}`, {
    method: "DELETE", 
  });
};



/* =========================
   Our Support Section
========================= */



export const getSupportData = (params) => {
  const query = new URLSearchParams(params).toString();
  return fetchData(`our-support/index?${query}`); 
};


export const storeSupportData = (data) => {
  return fetchData("our-support/store", {
    method: "POST",
    body: data, 
  });
};

export const updateSupportData = (id, data) => {
  return fetchData(`our-support/update/${id}`, {
    method: "POST",
    body: data,
  });
};

export const deleteSupportData = (id) => {
  return fetchData(`our-support/delete/${id}`, {
    method: "DELETE", 
  });
};



/* =========================
   Partner University Section
========================= */



export const getPartnerUniData = (params) => {
  const query = new URLSearchParams(params).toString();
  return fetchData(`partner-university/index?${query}`); 
};


export const storePartnerUniData = (data) => {
  return fetchData("partner-university/store", {
    method: "POST",
    body: data, 
  });
};

export const updatePartnerUniData = (id, data) => {
  return fetchData(`partner-university/update/${id}`, {
    method: "POST",
    body: data,
  });
};

export const deletePartnerUniData = (id) => {
  return fetchData(`partner-university/delete/${id}`, {
    method: "DELETE", 
  });
};


/* =========================
   Study Step
========================= */

export const getStudyStepData = (params) => {
  const query = new URLSearchParams(params).toString();
  return fetchData(`study-step/index?${query}`); 
};


export const storeStudyStepUniData = (data) => {
  return fetchData("study-step/store", {
    method: "POST",
    body: data, 
  });
};

export const updateStudyStepUniData = (id, data) => {
  return fetchData(`study-step/update/${id}`, {
    method: "POST",
    body: data,
  });
};

export const deleteStudyStepUniData = (id) => {
  return fetchData(`study-step/delete/${id}`, {
    method: "DELETE", 
  });
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