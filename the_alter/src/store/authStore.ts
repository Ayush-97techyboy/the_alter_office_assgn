import { create } from 'zustand';
import { auth } from '../lib/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

interface User {
  id: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,
  signInWithGoogle: async () => {
    try {
      set({ loading: true, error: null });
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      set({
        user: {
          id: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        },
        loading: false,
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  logout: async () => {
    try {
      set({ loading: true, error: null });
      await signOut(auth);
      set({ user: null, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));