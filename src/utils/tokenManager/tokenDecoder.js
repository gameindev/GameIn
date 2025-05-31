import { jwtDecode } from "jwt-decode";

export function decodeToken(token) {
  try {
    return jwtDecode(token);
  } catch (err) {
    console.error("Invalid token decode:", err);
    return null;
  }
}

export function getTokenExpiry(accessToken) {
  const decoded = decodeToken(accessToken);
  if (!decoded?.exp) {
    throw new Error("Invalid token: no expiry field");
  }
  return decoded.exp;
}
