// import { Product } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Product = {
  name: string;
  id: string;
  price: number;
  available: boolean;
  desc: string;
  image: string[];
  createdAt: Date;
  quantity: number;
};

type CartType = {
  products: Product[];
  totalPrice: number;
  totalItems: number;
  addToCart: (item: Product) => void;
  removeFromCart: (item: Product) => void;
  incrementQuantity: (id: string) => void;
};

const INITIAL_STATE = {
  products: [],
  totalPrice: 0,
  totalItems: 0,
};

export const useCartSore = create<CartType>((set, get) => ({
  products: INITIAL_STATE.products,
  totalItems: INITIAL_STATE.totalItems,
  totalPrice: INITIAL_STATE.totalPrice,
  addToCart: (item: Product) => {
    const productsInstate = get().products;
    const findProduct = productsInstate.find((each) => each.id === item.id);
    if (findProduct) {
      const updatedProduct = productsInstate.map((each) =>
        each.id === findProduct.id
          ? {
              ...findProduct,
              price: findProduct.price + item.price,
              quantity: findProduct.quantity + item.quantity,
            }
          : each
      );
      set((state) => ({
        products: updatedProduct,
        totalItems: state.totalItems + item.quantity,
        totalPrice: state.totalPrice + item.price,
      }));
    } else {
      set((state) => ({
        products: [...state.products, item],
        totalItems: state.totalItems + item.quantity,
        totalPrice: state.totalPrice + item.price,
      }));
    }
  },
  removeFromCart: (item: Product) => {
    set((state) => ({
      products: state.products.filter((product) => product.id !== item.id),
      totalItems: state.totalItems - item.quantity,
      totalPrice: state.totalPrice - item.price,
    }));
  },
  incrementQuantity: (id: string) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id
          ? {
              ...p,
              quantity: p.quantity + 1,
              price: (p.price / p.quantity) * (p.quantity + 1),
            }
          : p
      ),
      totalItems: state.totalItems + 1,
    })),
}));
