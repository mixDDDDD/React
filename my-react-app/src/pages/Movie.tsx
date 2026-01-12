import { useLoaderData } from 'react-router-dom';

export default function Movie() {
  const movieData = useLoaderData();
  console.log('Movie data:', movieData);
  return <div>{JSON.stringify(movieData, null, 2)}</div>;
}