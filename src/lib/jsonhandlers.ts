/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload } from "jsonwebtoken"

type VerifyResult =
  | {
      success: true
      message: string
      payload: JwtPayload
    }
  | {
      success: false
      message: string
    }

/**
 * Verify Access Token
 */
export const verifyAccessToken = async (
  token: string
): Promise<VerifyResult> => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload

    return {
      success: true,
      message: "Token is valid",
      payload: decoded,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Invalid token",
    }
  }
}


/**
 * Verify Reset Password Token
 */
// export const verifyResetPasswordToken = async (
//   token: string
// ): Promise<VerifyResult> => {
//   try {
//     const decoded = jwt.verify(
//       token,
//       ENV.RESET_PASS_TOKEN!
//     ) as JwtPayload

//     return {
//       success: true,
//       message: "Token is valid",
//       payload: decoded,
//     }
//   } catch (error: any) {
//     return {
//       success: false,
//       message: error?.message || "Invalid token",
//     }
//   }
// }
