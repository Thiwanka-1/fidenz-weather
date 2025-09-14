import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import axios from "axios";

function Weather() {
  const [cities, setCities] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:4000/api/cities").then((r) => setCities(r.data));
  }, []);

  const load = (id) => {
    if (!id) return;
    axios
      .get(`http://localhost:4000/api/weather/${id}`)
      .then((r) => setData(r.data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-indigo-600">
          🌤️ Weather App
        </h1>

        {/* Dropdown */}
        <div className="mb-6">
          <label className="mb-2 block font-medium text-gray-700">
            Select a City
          </label>
          <select
            defaultValue=""
            onChange={(e) => load(e.target.value)}
            className="w-full rounded-lg border p-2 focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">-- Choose City --</option>
            {cities.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Weather Card */}
        {data && (
          <div className="rounded-xl bg-indigo-50 p-6 text-center shadow-inner">
            <h2 className="mb-2 text-2xl font-semibold text-indigo-700">
              {data.name}
            </h2>
            <p className="capitalize text-gray-600">{data.description}</p>
            <p className="mt-3 text-3xl font-bold text-gray-800">
              {data.temp ? `${Math.round(data.temp - 273.15)} °C` : "N/A"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const ProtectedWeather = withAuthenticationRequired(Weather);

export default function App() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <div>
      <div className="absolute right-4 top-4">
        {!isAuthenticated ? (
          <button
            onClick={() => loginWithRedirect()}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-white shadow transition hover:bg-indigo-700"
          >
            Log in
          </button>
        ) : (
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
            className="rounded-lg bg-red-500 px-4 py-2 text-white shadow transition hover:bg-red-600"
          >
            Log out
          </button>
        )}
      </div>

      <ProtectedWeather />
    </div>
  );
}
