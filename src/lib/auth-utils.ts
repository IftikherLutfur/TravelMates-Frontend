"use server"
// lib/auth.ts
import { cookies } from "next/headers";

/**
 * Server-side theke raw token get korar jonno
 */
export const getRawToken = async (): Promise<string | undefined> => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    return token;
};

/**
 * Token theke email decode korar jonno (Without Library)
 */
export const getEmailFromToken = async (): Promise<string | null> => {
    const token = await getRawToken();
    if (!token) return null;

    try {
        // JWT-er 2nd part (index 1) holo payload
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));

        return payload.email || null;
    } catch (error) {
        console.error("Token decoding error:", error);
        return null;
    }
};