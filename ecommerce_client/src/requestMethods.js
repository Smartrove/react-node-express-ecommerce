import axios from "axios";

const BASE_URL = "http://localhost:5000/api/ecommerce/v1/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzAzZDM2OTI2MzBlZjdiM2JmYzVhMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2OTgwMTgxNywiZXhwIjoxNjcwMDYxMDE3fQ.cBXZ5ONlOns0lC0SqC78BZQAgn_f-w-oERLN4BAfrDI";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
