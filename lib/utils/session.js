const encoder = new TextEncoder();

async function getCryptoKey(secret) {
  return await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

/**
 * Signs data to create a secure session token
 * @param {string} data 
 * @returns {Promise<string>}
 */
export async function signSession(data) {
  const secret = process.env.ADMIN_SESSION_SECRET || "default_super_secret_session_key_32_chars";
  const key = await getCryptoKey(secret);
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(data)
  );
  
  // Convert ArrayBuffer to Hex String
  const hashArray = Array.from(new Uint8Array(signatureBuffer));
  const signatureHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  
  return `${data}.${signatureHex}`;
}

/**
 * Verifies a session token signature
 * @param {string} token 
 * @returns {Promise<boolean>}
 */
export async function verifySession(token) {
  if (!token || typeof token !== "string") return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  
  const [data, signature] = parts;
  const secret = process.env.ADMIN_SESSION_SECRET || "default_super_secret_session_key_32_chars";
  
  try {
    const key = await getCryptoKey(secret);
    
    // Convert Hex String back to Uint8Array
    const sigBytes = new Uint8Array(
      signature.match(/.{1,2}/g).map(byte => parseInt(byte, 16))
    );
    
    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes,
      encoder.encode(data)
    );
    
    return isValid;
  } catch (error) {
    return false;
  }
}
