"use client";

import { clearCartCookie } from "@/actions/clear-cart-cookie";
import { finishCart } from "@/actions/finish-cart";
import { useAuthStore } from "@/store/auth";
import { useCartStore } from "@/store/cart";
import Link from "next/link";
import { redirect } from "next/navigation";

export const FinishPurchaseButton = () => {
  const { token, hydrated } = useAuthStore((state) => state);

  const cartStore = useCartStore((state) => state);

  const handleFinishButton = async () => {
    if (!token || !cartStore.selectedAddressId) return;

    const sessionUrl = await finishCart(
      token,
      cartStore.selectedAddressId,
      cartStore.cart
    );

    if (sessionUrl) {
      await clearCartCookie();
      cartStore.clearCart();
      redirect(sessionUrl);
    } else {
      alert("Erro ao finalizar compra");
    }
  };

  if (!hydrated) {
    return null;
  }

  if (!token) {
    return (
      <Link
        href={"/login"}
        className="block bg-blue-600 w-full text-center px-6 py-5 text-white border-0 rounded-sm"
      >
        Faça login para finalizar
      </Link>
    );
  }

  return (
    <button
      disabled={!cartStore.selectedAddressId ? true : false}
      onClick={handleFinishButton}
      className="cursor-pointer bg-blue-600 w-full text-center px-6 py-5 text-white border-0 rounded-sm disabled:opacity-30"
    >
      Finalizar compra
    </button>
  );
};
