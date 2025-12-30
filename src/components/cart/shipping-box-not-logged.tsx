import { useCartStore } from "@/store/cart";
import { getShippingInfo } from "@/actions/get-shipping-info";

export const ShippingBoxNotLogged = () => {
  const cartStore = useCartStore((state) => state);
  const handleUpdateShipping = async () => {
    if (cartStore.shippingZipcode.length > 4) {
      const shippingInfo = await getShippingInfo(cartStore.shippingZipcode);
      if (shippingInfo) {
        cartStore.setShippingCost(shippingInfo.cost);
        cartStore.setShippingDays(shippingInfo.days);
      }
    }
  };
  return (
    <div className="flex gap-4">
      <input
        type="text"
        value={cartStore.shippingZipcode}
        onChange={(e) => cartStore.setShippingZipcode(e.target.value)}
        placeholder="Digite seu CEP"
        className=" flex-1 px-6 py-5 border bg-white border-gray-200 rounded-sm text-gray-800"
      />
      <button
        onClick={handleUpdateShipping}
        className="cursor-pointer bg-blue-600 text-center px-6 py-5 text-white border-0 rounded-sm disabled:opacity-30"
      >
        Calcular
      </button>
    </div>
  );
};
