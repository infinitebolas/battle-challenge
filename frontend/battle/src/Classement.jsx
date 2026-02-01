
import { useState, useEffect } from "react";

function Classement() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchClassement() {
      try {
        const response = await fetch("http://localhost:3000/classement");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchClassement();
  }, []);
  if (error) {
    return <p>Erreur : {error}</p>;
  }
  return (
    <table>
        <thead>
            <tr>
                <td >POSITION</td>
                <td>CHALLENGER</td>
                <td>POINTS</td>
            </tr>
        </thead>
        <tbody>
            {data.map((challenger, index) => (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{challenger.username}</td>
                    <td>{challenger.points}</td>
                </tr>
            ))}
        </tbody>
    </table>
  );
}

export default Classement;
