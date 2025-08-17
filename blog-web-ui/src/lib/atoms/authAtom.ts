// import {  } from "jotai";
// import { AuthUser } from "../types";
import { atomWithStorage } from "jotai/utils";
import { AuthUser } from "../types";
import { atom } from "jotai";
// // export const authAtom = atom<AuthUser | null>(null);
// export const authAtom = atomWithStorage("auth", null);

// import { atomWithStorage } from "jotai";

export const authAtom = atomWithStorage<AuthUser | null>("auth", null);

// export const profileLinkAtom = atom((get) => {
//   const user = get(authAtom);
//   if (!user) return "/login";
//   return user.role === "ADMIN" ? `/admin/profile` : `/user/profile`;
// });
