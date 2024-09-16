import { ScrollArea } from "@/components/ui/scroll-area";
import { useCallback, useEffect, useState } from "react";
import { Loader } from "./ui/loader";
import { api } from "@/lib/axios";

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

const SearchPerson = ({ searchQuery }: { searchQuery: String }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(
    debounce(async (query: String) => {
      if (query) {
        setLoading(true);
        try {
          const response = await api.get("");
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

  return (
    <ScrollArea className="h-72 w-72 rounded-md border ml-10 mt-1 bg-black">
      {!loading && (
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
          {data.map((item) => (
            <>
              <div key={item} className="text-sm">
                {item}
              </div>
            </>
          ))}
        </div>
      )}
      {loading && (
        <div className="flex justify-center mt-2">
          <Loader />
        </div>
      )}
    </ScrollArea>
  );
};

export default SearchPerson;
