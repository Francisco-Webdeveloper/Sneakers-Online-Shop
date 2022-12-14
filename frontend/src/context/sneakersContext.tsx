import { useEffect, useState, createContext, ReactNode } from "react";
import { Sneaker } from "../types/Sneaker";

const SneakersContext = createContext<Sneaker[] | null>(null);

type SneakersContextProviderProps = {
  children: ReactNode;
};

const ContextProvider = ({ children }: SneakersContextProviderProps) => {
  const [sneakers, setSneakers] = useState<Sneaker[]>([]);

  const fetchSneakers = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/sneakers`
    );
    const json = await response.json();

    if (response.ok) {
      setSneakers(json);
    }
  };

  useEffect(() => {
    fetchSneakers();
  }, []);

  return (
    <SneakersContext.Provider value={sneakers}>
      {children}
    </SneakersContext.Provider>
  );
};

export { ContextProvider, SneakersContext };
