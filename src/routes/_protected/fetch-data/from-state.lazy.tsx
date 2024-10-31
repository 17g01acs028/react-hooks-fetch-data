import { createLazyFileRoute } from '@tanstack/react-router'
import {useEffect, useState} from "react";
import axios from "axios";

export const Route = createLazyFileRoute('/_protected/fetch-data/from-state')({
  component: FetchRoute,
})

export const API = "https://hn.algolia.com/api/v1/search";
export type Story = {
  objectID: string;
  title: string;
  url: string;
};

function FetchRoute(){
  const [data, setData] = useState<Story[]>([]);

  useEffect(() => {
    async function fetchData(){
      const result = await axios(`${API}?query=react`);
      setData(result.data.hits);
    }
    fetchData()
  }, []);
  return (
      <ul>
        {data.map((item) => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
        ))}
      </ul>
  )
}