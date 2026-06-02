import { verifySession } from "./session";

/**
 * Verifies if the incoming request contains a valid admin session cookie.
 * @param {import("next/server").NextRequest} request 
 * @returns {Promise<boolean>}
 */
export async function verifyAdminSession(request) {
  try {
    const session = request.cookies.get("admin_session")?.value;
    if (!session) return false;
    return await verifySession(session);
  } catch (error) {
    console.error("Auth utility error:", error);
    return false;
  }
}
