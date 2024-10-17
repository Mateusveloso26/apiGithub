import { useState } from "react";
import logoImg from "./assets/logo.png";
import { Search } from "./components/search.tsx";

interface UserProps {
  name: string;
  bio: string;
  avatar_url: string;
  login: string;
  followers: number;
  following: number;
}

export function App() {
  const [user, setUser] = useState<UserProps | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadUser = async (username: string) => {
    setLoading(true);
    setError(false);
    setUser(null);
    
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      const data = await res.json();

      if (res.status === 404) {
        setError(true);
        setLoading(false);
        return;
      }

      const { name, bio, avatar_url, login, followers, following } = data;
      const userData: UserProps = {
        name,
        bio,
        avatar_url,
        login,
        followers,
        following,
      };
      setUser(userData);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen mx-auto flex flex-col items-center  bg-indigo-900 overflow-y-scroll">
      <img src={logoImg} alt="logo do github" className="w-40 mx-auto my-4" />

      <div className="flex flex-col w-full max-w-2xl gap-4 my-2 bg-indigo-500 text-white rounded-2xl p-4">
        <Search loadUser={loadUser}/>
      </div>

      {loading && <p className="text-white mt-4">Carregando...</p>}

      {error && (
        <p className="text-red-500 mt-4">
          Usuário não encontrado. Tente novamente.
        </p>
      )}

      {user && (
        <div className="flex flex-col w-full max-w-2xl gap-4  bg-indigo-500 my-4 rounded-2xl p-8">
          <div className="flex flex-col items-center justify-center gap-4">
            <img
              src={user.avatar_url}
              alt="foto de perfil do usuário"
              className="w-1/3 border-2 border-white rounded-full hover:scale-105 transition-all"
            />
            <h2 className="text-2xl text-white">{user.name}</h2>
            <p className="text-lg text-white">
              Usuário: {user.login}
            </p>
            <p className="text-lg text-white">{user.bio}</p>

            <div className="flex gap-6 items-center justify-center">
              <p className="font-medium text-white">Seguidores: {user.followers}</p>
              <p className="font-medium text-white">Seguindo: {user.following}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
