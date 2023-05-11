import { atom } from "recoil";

export const isLoggedInAtom = atom({
  key: "isLoggedInAtom",
  default: false,
});

export const profileAvatarAtom = atom({
  key: "profileAvatar",
  default: "",
});
