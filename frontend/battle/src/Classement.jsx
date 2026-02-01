function Classement(){
    async function classement(){
        try{
            const response = await fetch('http://localhost:3000/classement');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return(data);
        }
        catch(error){
            throw new Error("Erreur lors de la récupération des données :", error);
        }
    

    }

    return(
        <table>
            <tr>
                <th> CHALLENGER </th>
                <th> POINTS</th>
            </tr>
            <tr>{classement}</tr>

        </table>



    );
}

export default Classement;