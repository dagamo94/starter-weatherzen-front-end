import {useEffect, useState} from "react";
import {listObservations} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function Home() {
  const [observations, setObservations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    async function fetchObservations(){
      try{
        const response = await listObservations(abortController.signal);
        setObservations(response)
      }catch(error){
        setError(error);
      }
    }

    fetchObservations();
    // listObservations(abortController.signal)
    //   .then(setObservations)
    //   .catch(setError);
    return () => abortController.abort();
  }, []);

  function handleEdit(event){
    event.preventDefault();
  }

  const tableRows = observations.map(observation => (
    <tr key={observation.observation_id}>
      <th scope="row">{observation.observation_id}</th>
      <td>{observation.latitude}</td>
      <td>{observation.longitude}</td>
      <td>{observation.sky_condition}</td>
      <td>{observation.created_at}</td>
      <td><button type="button" className="btn btn-secondary" onClick={handleEdit}>Edit</button></td>
    </tr>
  ));

  return (
    <main>
      <h1>Home</h1>
      <ErrorAlert error={error} />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Latitude</th>
            <th scope="col">Longitude</th>
            <th scope="col">Sky Condition</th>
            <th scope="col">Created</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    </main>
  );
}

export default Home;
