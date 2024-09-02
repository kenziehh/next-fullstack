import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      username?: string;
      accessToken?: string;
      //   decoded?: JwtPayload;
      role?: Role;
    };
  }

  interface DefaultUser {
    username: string;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    code: number;
    status: string;
    message: string;
    data: {
      token: string;
    };
  }
}
