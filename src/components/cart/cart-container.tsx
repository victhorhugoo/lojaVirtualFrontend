"use client";

import { useCartStore } from "@/store/cart";
import { CartListItem } from "@/types/cart-list-item";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { CartProductList } from "./cart-product-list";
import { FinishPurchaseButton } from "./finish-purchase-button";

type Props = {
  initialCartProducts: CartListItem[];
  initialSubtotal: number;
};

export const CartContainer = ({
  initialCartProducts,
  initialSubtotal,
}: Props) => {
  const cartStore = useCartStore((state) => state);

  useEffect(() => {
    cartStore.clearShipping();
  }, []);

  let total = initialSubtotal + cartStore.shippingCost;

  return (
    <div>
      <div className="flex items-center gap-2">
        <Image
          src={"/assets/ui/shopping-bag-4-line.png"}
          alt=""
          width={24}
          height={24}
        />
        <div className="text-xl text-gray-200">
          Seu carrinho de compras{" "}
          <span className="text-gray-500">
            ({cartStore.cart.length}
            {cartStore.cart.length != 1 ? " itens" : " item"})
          </span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 mt-9 ">
        <div className="flex-1 border border-gray-200 rounded-sm">
          <CartProductList initialList={initialCartProducts} />
        </div>
        <div className="flex-1 md:max-w-sm flex flex-col gap-4">
          <div className="bg-white border border-gray-200 rounded-sm text-gray-600">
            <div className="border-b border-gray-200 p-6">
              <div className="flex justify-between items-center mb-5">
                <div>Subtotal</div>
                <div className="font-bold">R$ {initialSubtotal.toFixed(2)}</div>
              </div>
              <div className="flex justify-between items-center">
                <div>Frete</div>
                <div className="font-bold">
                  R$ {cartStore.shippingCost.toFixed(2)}
                </div>
              </div>
            </div>
            <div className="p-6 rounded-sm">
              <div className="flex justify-between items-center">
                <div>Total</div>
                <div className="font-bold text-2xl text-blue-600">
                  R$ {total.toFixed(2)}
                </div>
              </div>
              <div className="text-right text-xs text-gray-500 mb-5">
                Em até 12x no cartão
              </div>

              <FinishPurchaseButton />
              <div className="text-center mt-6">
                <Link href={"/"} className="text-xs text-gray-400">
                  Comprar outros produtos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
