export const saveToken = (token: string) => {
  localStorage.setItem("access_token", token);
  document.cookie = `access_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict`;
};

export const getToken = () => localStorage.getItem("access_token");

export const removeToken = () => {
  localStorage.removeItem("access_token");
  document.cookie = "access_token=; path=/; max-age=0";
};

export const isAuthenticated = () => !!getToken();
