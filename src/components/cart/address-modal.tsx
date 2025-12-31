import z from "zod";

import {
  ChangeEvent,
  FormEvent,
  startTransition,
  useState,
  useTransition,
} from "react";

import { Address } from "@/types/address";

const schema = z.object({
  zipcode: z.string().min(1, "CEP é obrigatório"),
  street: z.string().min(1, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatório"),
  country: z.string().min(1, "País é obrigatório"),
  complement: z.string().optional(),
});

type Props = {
  open: boolean;
  onClose: () => void;
  onAdd: (address: Address) => Promise<void>;
};

export const AddressModal = ({ open, onClose, onAdd }: Props) => {
  let emptyAddress: Address = {
    id: 0,
    zipcode: "",
    street: "",
    number: "",
    city: "",
    state: "",
    country: "",
    complement: "",
  };

  const [form, setForm] = useState<Address>(emptyAddress);
  const [error, setError] = useState("");
  const [pending, setPending] = useTransition();

  if (!open) return null;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      setError(result.error.issues[0]?.message || "Preencha todos os campos");
      return;
    }
    setError("");
    startTransition(async () => {
      try {
        await onAdd(form);
        setForm(emptyAddress);
      } catch (err: any) {
        setError(err?.message || "Erro ao adicionar endereço");
      }
    });
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/90 z-50">
      <button
        disabled={pending}
        className="cursor-pointer absolute top-2 right-6 text-4xl text-red-600"
        onClick={onClose}
      >
        &times;
      </button>
      <div className="bg-white p-6 rounded max-w-md w-full text-gray-800">
        <h2 className="text-2xl font-bold mb-4">Adicionar um novo endereço</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            name="zipcode"
            value={form.zipcode}
            onChange={handleChange}
            placeholder="CEP"
            disabled={pending}
            className="border border-gray-200 rounded-sm px-3 py-2 outline-0"
          />
          <input
            type="text"
            name="street"
            value={form.street}
            onChange={handleChange}
            placeholder="Rua"
            disabled={pending}
            className="border border-gray-200 rounded-sm px-3 py-2 outline-0"
          />
          <input
            type="text"
            name="number"
            value={form.number}
            onChange={handleChange}
            placeholder="numero"
            disabled={pending}
            className="border border-gray-200 rounded-sm px-3 py-2 outline-0"
          />
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="cidade"
            disabled={pending}
            className="border border-gray-200 rounded-sm px-3 py-2 outline-0"
          />
          <input
            type="text"
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="Estado"
            disabled={pending}
            className="border border-gray-200 rounded-sm px-3 py-2 outline-0"
          />
          <input
            type="text"
            name="country"
            value={form.country}
            onChange={handleChange}
            placeholder="País"
            disabled={pending}
            className="border border-gray-200 rounded-sm px-3 py-2 outline-0"
          />
          <input
            type="text"
            name="complement"
            value={form.complement}
            onChange={handleChange}
            placeholder="complemento"
            disabled={pending}
            className="border border-gray-200 rounded-sm px-3 py-2 outline-0"
          />
          <button
            type="submit"
            disabled={pending}
            className="cursor-pointer bg-blue-600 text-white p-4 rounded-sm"
          >
            {pending ? "Salvando..." : "Salvar"}
          </button>
        </form>
      </div>
    </div>
  );
};
