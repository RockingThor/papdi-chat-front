import { useCallback, useEffect, useState } from "react";
import { Loader } from "./ui/loader";
import { api } from "@/lib/axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useHistory } from "react-router-dom";

interface SearchResult {
  name: string;
  id: number;
  imageUrl?: string;
}

const debounce = (fn: Function, delay: number) => {
  let timeoutId: any;
  return (...args: any) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const SearchPerson = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: String;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [data, setData] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const fetchData = useCallback(
    debounce(async (query: String) => {
      if (query) {
        setLoading(true);
        try {
          const response = await api.get("/chat", {
            params: {
              search: query,
            },
          });
          setData(response.data || []);
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      }
    }, 500),
    []
  );

  useEffect(() => {
    fetchData(searchQuery);
  }, [searchQuery, fetchData]);

  async function handleClicked(id: number) {
    setSearchQuery("");
    history.push(`/chat/?receiver=${id}`);
  }

  return (
    <div className="min-h-fit max-h-72 overflow-scroll w-72 absolute rounded-md border ml-10 mt-2 bg-black z-50 ">
      {!loading && (
        <div className="p-4">
          {data.map((item) => (
            <div
              key={item.id}
              className="cursor-pointer"
              onClick={() => handleClicked(item.id)}
            >
              <SearchPersonCard {...item} />
            </div>
          ))}
        </div>
      )}
      {loading && (
        <div className="flex justify-center mt-2">
          <Loader />
        </div>
      )}
      {!loading && data.length === 0 && (
        <div className="text-center mt-2">No results found</div>
      )}
    </div>
  );
};

const SearchPersonCard = ({ name, imageUrl }: SearchResult) => {
  return (
    <div className="flex gap-2 border p-1 rounded-md mb-1">
      <Avatar>
        <AvatarImage src={imageUrl} />
        <AvatarFallback>User</AvatarFallback>
      </Avatar>
      <div className="text-center mt-2">{name}</div>
    </div>
  );
};

export default SearchPerson;
