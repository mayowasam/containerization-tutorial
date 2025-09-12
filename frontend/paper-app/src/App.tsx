import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getData = async () => {
    setLoading(true);
    setError(null);
    setData([]);
    
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL ?? 'http://localhost:4000'}/api/all`);
      if (response.status >= 200 && response.status < 300) {
        setError(null);
        setData(response.data);
      } else {
        setError(`Unexpected response: ${response.status}`);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setData([]);

    const form = new FormData(e.currentTarget);
    const fullName = form.get("fullname");
    const email = form.get("email");
    const payload = { fullName, email };

    try {
            const response = await axios.post(`${import.meta.env.VITE_URL ?? 'http://localhost:4000'}/api`, payload);

      if (response.status >= 200 && response.status < 300) {
        setError(null);
        setData(response.data);
        console.log({ error });

        setLoading(false);
        (document.getElementById("submitform") as HTMLFormElement)?.reset();

      } else {
        setError(`Unexpected response: ${response.status}`);
      }
      return
    } catch (err) {
      console.log(err);

      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      <form id="submitform" onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
        <label>
          Name:{" "}
          <input
            name="fullname"
            className="border border-gray-400 p-4"
            type="text"
            placeholder="name"
          />
        </label>
        <label>
          Email:{" "}
          <input
            name="email"
            className="border border-gray-400 p-4"
            type="text"
            placeholder="email"
          />
        </label>
        <button type="submit" className="bg-blue-500 text-white py-2 rounded">
          Submit
        </button>
      </form>

      <div className="p-4">
        {loading && <p className="text-gray-600">Loading...</p>}

        {error && <p className="text-red-500">{error}</p>}

        {data && (
          <div className="mt-4">
            <h2 className="text-2xl font-bold mb-4">Response from server 😃😃:</h2>
            {
              data.length > 0 ? (
                <ul className="list-disc pl-5">
                  {data.map((user: any) => (
                    <li key={user.id}>
                      {user.name} ({user.email})
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No users found.</p>
              )
            }
          </div>
        )}
      </div>
    </>
  );
}

export default App;
