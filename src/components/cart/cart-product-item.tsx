import { setCartState } from "@/actions/set-cart-state";
import { useCartStore } from "@/store/cart";
import { CartListItem } from "@/types/cart-list-item";
import Image from "next/image";

type Props = {
  item: CartListItem;
};

export const CartProductItem = ({ item }: Props) => {
  const cartStore = useCartStore((state) => state);

  const updateCookie = async () => {
    const updatedCart = useCartStore.getState().cart;
    await setCartState(updatedCart);
  };

  const handleMinus = async () => {
    if (item.quantity > 1) {
      cartStore.updateQuantity(item.product.id, item.quantity - 1);
      await updateCookie();
    } else {
      await handleRemove();
    }
  };

  const handlePlus = async () => {
    cartStore.updateQuantity(item.product.id, item.quantity + 1);
    await updateCookie();
  };

  const handleRemove = async () => {
    cartStore.removeItem(item.product.id);
    await updateCookie();
  };

  return (
    <div className="flex p-6 gap-4 md:gap-8 text-gray-700 border-0 md:border-b border-gray-200">
      <div className="border border-gray-200 p-1">
        <Image
          src={item.product.image}
          alt={item.product.label}
          width={96}
          height={96}
          className="size-24 md:size-16"
        />
      </div>
      <div className="flex-1 flex flex-col md:flex-row justify-between items-center">
        <div>
          <div className="text-sm">{item.product.label}</div>
          <div className="text-xs text-gray-400 mt-2 hidden md:block">
            COD: {item.product.id}
          </div>
        </div>
        <div className="flex border border-gray-500 rounded-sm text-center items-center h-10">
          <div onClick={handleMinus} className="w-10 cursor-pointer">
            -
          </div>
          <div className="w-10 border-x border-gray-400">{item.quantity}</div>
          <div onClick={handlePlus} className="w-10 cursor-pointer">
            +
          </div>
        </div>
      </div>
      <div className="w-24 md:w-40 flex flex-col md:flex-row justify-between items-end md:items-center">
        <div className="text-lg text-blue-600">
          R$ {item.product.price.toFixed(2)}
        </div>
        <div
          onClick={handleRemove}
          className="cursor-pointer size-12 border border-gray-400 flex justify-center items-center rounded-sm"
        >
          <Image src={"/assets/ui/trash.png"} alt="" width={24} height={24} />
        </div>
      </div>
    </div>
  );
};
