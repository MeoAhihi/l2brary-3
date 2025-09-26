/**
 * JWT (JSON Web Token) utilities
 * Handles JWT token decoding and validation
 */
export interface JWTPayload {
  exp?: number;
  iat?: number;
  sub?: string;
  email?: string;
  phoneNumber?: string;
  roles?: string[];
  permissions?: string[];
  [key: string]: unknown;
}

/**
 * Decode JWT token payload
 * @param token - JWT token string
 * @returns Decoded payload object or null if invalid
 * @throws Will not throw, returns null for invalid tokens
 */
export const decodeJWT = (token: string): JWTPayload | null => {
  try {
    if (!token || typeof token !== "string") {
      console.warn("Invalid token provided to decodeJWT");
      return null;
    }

    // JWT format: header.payload.signature
    const parts = token.split(".");
    if (parts.length !== 3) {
      console.warn(
        "Invalid JWT format: token must have 3 parts separated by dots",
      );
      return null;
    }

    const payload = parts[1];
    if (!payload) {
      console.warn("JWT payload is empty");
      return null;
    }

    // Decode base64url to JSON
    const decodedPayload = JSON.parse(atob(payload));

    return decodedPayload as JWTPayload;
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return null;
  }
};

/**
 * Check if JWT token is expired
 * @param token - JWT token string
 * @returns true if token is expired or invalid, false if still valid
 */
export const isTokenExpired = (token: string): boolean => {
  try {
    if (!token || typeof token !== "string") {
      return true;
    }

    const payload = decodeJWT(token);
    if (!payload) {
      return true;
    }

    // Check if token has expiration time
    if (!payload.exp) {
      console.warn("JWT token does not have expiration time (exp claim)");
      return false; // Assume valid if no expiration
    }

    // Convert exp from seconds to milliseconds and compare with current time
    const currentTime = Date.now();
    const expirationTime = payload.exp * 1000;

    return currentTime >= expirationTime;
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return true; // Assume expired if error occurs
  }
};

/**
 * Get time until token expires in milliseconds
 * @param token - JWT token string
 * @returns Time until expiration in ms, or null if invalid/no expiration
 */
export const getTokenTimeUntilExpiry = (token: string): number | null => {
  try {
    const payload = decodeJWT(token);
    if (!payload?.exp) {
      return null;
    }

    const currentTime = Date.now();
    const expirationTime = payload.exp * 1000;

    return Math.max(0, expirationTime - currentTime);
  } catch (error) {
    console.error("Error calculating token expiry time:", error);
    return null;
  }
};

/**
 * Validate JWT token structure and basic claims
 * @param token - JWT token string
 * @returns true if token structure is valid, false otherwise
 */
export const isValidJWTStructure = (token: string): boolean => {
  try {
    if (!token || typeof token !== "string") {
      return false;
    }

    const parts = token.split(".");
    if (parts.length !== 3) {
      return false;
    }

    // Try to decode payload to verify it's valid JSON
    const payload = decodeJWT(token);
    return payload !== null;
  } catch (error) {
    console.error("Error validating JWT structure:", error);
    return false;
  }
};
