import { useState } from "react";

interface SearchProps {
  loadUser: (username: string) => Promise<void>;
}

export function Search({ loadUser }: SearchProps) {
  const [username, setUsername] = useState("");

  return (
    <div className="flex w-full flex-col justify-center items-center gap-4 p-8">
      <h2 className="text-2xl">Buscar por um usuário:</h2>
      <input
        type="text"
        placeholder="Digite o nome do usuário"
        onChange={(e) => setUsername(e.target.value)}
        className="w-96 p-2 rounded-md  text-black outline-none"
      />
      <button
        onClick={() => loadUser(username)}
        className="bg-white px-8 py-2 rounded-lg text-black hover:bg-slate-200 transition-all "
      >
        Buscar
      </button>
    </div>
  );
}
