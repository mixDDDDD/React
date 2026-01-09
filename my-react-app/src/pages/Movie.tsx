import { useParams } from 'react-router-dom';

export default function Movie() {
  const { id } = useParams();
  return <h1>Movie ID: {id}</h1>;
}