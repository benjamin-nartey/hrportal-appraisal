import { create } from "zustand";

interface TokenDataStore {
  tokenData: AccessTokenProps | null;
  updateTokenData: (tokenData: AccessTokenProps) => void;
}

export const useTokenDataStore = create<TokenDataStore>((set) => ({
  tokenData: null,
  updateTokenData: (tokenData) => set({ tokenData }),
}));
