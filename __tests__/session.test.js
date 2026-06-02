import { signSession, verifySession } from "@/lib/utils/session";

describe("Session Utility", () => {
  // Mock crypto for older environments if needed, but in Node 18+ it is globally available.
  
  it("should sign and verify a session token successfully", async () => {
    const data = "admin_user";
    const token = await signSession(data);
    
    expect(token).toBeDefined();
    expect(typeof token).toBe("string");
    expect(token.includes(data)).toBe(true);

    const isValid = await verifySession(token);
    expect(isValid).toBe(true);
  });

  it("should reject an invalid signature", async () => {
    const data = "admin_user";
    const token = await signSession(data);
    
    // Corrupt the token signature
    const corruptedToken = token + "1";
    const isValid = await verifySession(corruptedToken);
    
    expect(isValid).toBe(false);
  });

  it("should reject malformed tokens", async () => {
    expect(await verifySession(null)).toBe(false);
    expect(await verifySession("")).toBe(false);
    expect(await verifySession("no-dot-in-token")).toBe(false);
    expect(await verifySession("too.many.dots.in.token")).toBe(false);
  });
});
