import Result from "@/components/Result";
const API_KEY = process.env.API_KEY;

export default async function Page({ params }) {
  const genre = params?.genre || "trending";

  const res = await fetch(
    `https://api.themoviedb.org/3${
      genre === "trending"
        ? `/trending/all/week?api_key=${API_KEY}&language=en-US`
        : genre === "rating"
        ? `/movie/top_rated?api_key=${API_KEY}&language=en-US`
        : `/trending/all/week?api_key=${API_KEY}&language=en-US&page=2`
    }`
  );

  if (!res.ok) {
    console.error(`Failed to fetch data: Status ${res.status}`);
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  const results = data.results;

  return (
    <div className="container mx-auto px-4">
      <Result results={results} />
    </div>
  );
}
