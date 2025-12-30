"use client";

import { useCartStore } from "@/store/cart";
import { useAuthStore } from "@/store/auth";
import { ShippingBoxNotLogged } from "./shipping-box-not-logged";
import { ShippingBoxLogged } from "./shipping-box-logged";

export const ShippingBox = () => {
  const { token, hydrated } = useAuthStore((state) => state);
  const cartStore = useCartStore((state) => state);
  return (
    <div className="flex flex-col gap-4">
      <div className="text-gray-400">Calcular frete e prazo de entrega</div>
      <div className="">
        {!token && <ShippingBoxNotLogged />}
        {token && <ShippingBoxLogged />}
      </div>
      {cartStore.shippingDays > 0 && (
        <div className="flex items-center bg-white border border-gray-200 rounded-sm p-6 text-gray-800">
          <div className="flex-1">
            Recebe em até {cartStore.shippingDays}{" "}
            {cartStore.shippingDays != 1 ? "dias úteis" : "dia útil"}
          </div>
          <div className="text-green-600 font-bold">
            R$ {cartStore.shippingCost.toFixed(2)}{" "}
          </div>
        </div>
      )}
    </div>
  );
};
