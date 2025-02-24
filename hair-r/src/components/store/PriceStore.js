import { create } from 'zustand';
import axiosInstance from './axiosInstance';
const usePriceStore = create((set) => ({
  curPrice: 0 ,
  count: 0,
  progress: 0,
  stage: 0,
  // Action to set user data
  setUser: (user) => set({ user }),
  
  // Action to increment the counter
  incrementCount: () => set((state) => ({ count: state.count + 1 })),
  
  // Reset both user and count
  resetState: () => set({ user: { name: '', age: 0 }, count: 0 }),
  // get the current price
  getCurPrice: async () => {
    try {
      const response = await axiosInstance.get('/api/price');
      set({ curPrice: response.data.price });
    } catch (error) {
      console.error("Failed to fetch price:", error);
    }
  },
}));

export default usePriceStore;
