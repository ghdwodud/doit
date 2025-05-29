import axios from "axios";

const TENANT_ID = "jyhong123";

const api = axios.create({
  baseURL: `https://assignment-todolist-api.vercel.app/api/${TENANT_ID}`,
  headers: {
    "Content-Type": "application/json",
  },
});

// 공통 메서드
export const get = <T = any>(url: string) =>
  api.get<T>(url).then((res) => res.data);
export const post = <T = any>(url: string, data?: any) =>
  api.post<T>(url, data).then((res) => res.data);

export const patch = <T = any>(url: string, data?: any) =>
  api.patch<T>(url, data).then((res) => res.data);
export const del = <T = any>(url: string) =>
  api.delete<T>(url).then((res) => res.data);

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await axios.post(
    `https://assignment-todolist-api.vercel.app/api/${TENANT_ID}/images/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};
api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("❌ [API ERROR]", {
      url: err.config?.url,
      method: err.config?.method,
      status: err.response?.status,
      data: err.response?.data,
    });
    return Promise.reject(err);
  }
);

export default api;
