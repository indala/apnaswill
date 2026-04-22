"use server";

export async function verifyAdminPassword(password: string) {
  // This runs ONLY on the server. The ADMIN_PASSWORD is never sent to the browser.
  const correctPassword = process.env.ADMIN_PASSWORD || "apnas123";
  
  if (password === correctPassword) {
    return { success: true };
  }
  
  return { success: false };
}
