import { createLazyFileRoute } from '@tanstack/react-router'
import {useEffect, useState} from "react";
import axios from "axios";
import {API, Story} from "./from-state.lazy.tsx";

export const Route = createLazyFileRoute('/_protected/fetch-data/refetch')({
  component: refetchRoute,
})


function refetchRoute(){
    const [data, setData] = useState<Story[]>([]);
    const [search, setSearch] = useState("react");
    const [activeSearch, setActiveSearch] = useState("react");


    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`${API}?query=${activeSearch}`);

            setData(result.data.hits);
        };

        fetchData();
    }, [activeSearch]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    function handleSearchSubmit(){
        setActiveSearch(search);
        setSearch("");
    }
    return (
        <>
            <input type="text" value={search} onChange={handleSearchChange}/>
            <button type="button" onClick={handleSearchSubmit}>
                Search
            </button>
            <ul>
                {data.map((item) => (
                    <li key={item.objectID}>
                        <a href={item.url}>{item.title}</a>
                    </li>
                ))}
            </ul>
        </>
    );
}