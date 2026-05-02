import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
    persist(
        (set) => ({
            // Legacy session key (optional to keep for compatibility or future use)
            sessionKey: null,
            setSessionKey: (key) => set({ sessionKey: key }),

            // Stress History
            stressHistory: [],
            addStressEntry: (entry) => set((state) => ({
                stressHistory: [
                    { id: Date.now(), timestamp: new Date().toISOString(), ...entry },
                    ...state.stressHistory
                ]
            })),

            clearHistory: () => set({ stressHistory: [] }),
        }),
        {
            name: 'the-quiet-room-storage', // name of the item in the storage (must be unique)
        }
    )
);

export default useStore;
