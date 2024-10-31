import { createLazyFileRoute } from '@tanstack/react-router'
import React, {useState} from "react";
import {API, Story} from "./from-state.lazy.tsx";
import axios from "axios";
import {useQuery} from "../../../features/fetch-data/useQuery.ts";

export const Route = createLazyFileRoute(
  '/_protected/fetch-data/using-custom-hook',
)({
  component: customeHookRoute,
})

function customeHookRoute(){
    const [search, setSearch] = useState("");
    const [activeSearch, setActiveSearch] = useState("react");

    const { data, isLoading, isError } = useQuery<Story[]>({
        queryKey: [activeSearch],
        queryFn: async () => {
            const result = await axios(`${API}?query=${activeSearch}`);
            return result.data.hits;
        },
        initialData: [],
    });

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
            {isError && <div>Something went wrong ...</div>}
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
