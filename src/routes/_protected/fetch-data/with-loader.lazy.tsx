import { createLazyFileRoute } from '@tanstack/react-router'
import {useEffect, useState} from "react";
import {API, Story} from "./from-state.lazy.tsx";
import axios from "axios";

export const Route = createLazyFileRoute('/_protected/fetch-data/with-loader')({
  component: withLoader,
})

function withLoader(){
    const [data, setData] = useState<Story[]>([]);
    const [search, setSearch] = useState("react");
    const [activeSearch, setActiveSearch] = useState("react");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const result = await axios(`${API}?query=${activeSearch}`);
            setData(result.data.hits);
            setIsLoading(false);
        };

        fetchData();
    }, [activeSearch]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        setActiveSearch(search);
        setSearch("");

        event.preventDefault();
    };
    return (
        <>


            <form onSubmit={handleSearchSubmit}>
                <input type="text" value={search} onChange={handleSearchChange}/>
                <button type="submit">Search</button>
            </form>

            <ul>
                {isLoading ? (
                    <div>Loading ...</div>
                ) : (
                    data.map((item) => (
                        <li key={item.objectID}>
                            <a href={item.url}>{item.title}</a>
                        </li>
                    ))
                )}
            </ul>
        </>
    );
}