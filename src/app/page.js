import Result from "@/components/Result";
const API_KEY = process.env.API_KEY;

export default async function Home() {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`
  );

  if (!res.ok) {
    console.error(`Failed to fetch data: Status ${res.status}`);
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  const results = data.results;

  return (
    <main className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 px-2">Trending Now</h2>
      <Result results={results} />
    </main>
  );
}

