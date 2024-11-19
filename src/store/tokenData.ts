import { create } from "zustand";

interface TokenDataStore {
  tokenData: TokenProps | null;
  updateTokenData: (tokenData: TokenProps) => void;
}

export const useTokenDataStore = create<TokenDataStore>((set) => ({
  tokenData: null,
  updateTokenData: (tokenData) => set({ tokenData }),
}));
