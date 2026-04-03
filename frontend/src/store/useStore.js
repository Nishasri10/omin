File name: /pos-omnichannel/pos-omnichannel/frontend/src/store/useStore.js

import create from 'zustand';

const useStore = create((set) => ({
  user: null,
  products: [],
  orders: [],
  setUser: (user) => set({ user }),
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  removeProduct: (productId) => set((state) => ({ products: state.products.filter(product => product.id !== productId) })),
  addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),
  clearOrders: () => set({ orders: [] }),
}));

export default useStore;