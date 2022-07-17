import React, {useEffect} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import "./PetsList.css"

const PetsList = (props) => {
    const {pets, setPets} = props;

    useEffect(() => {
        axios.get("http://localhost:8000/api/pets")
            .then((res) => {
                console.log(res.data)
                setPets(res.data)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <div>
            <div className='nav'>
                <h1>Pet Shelter</h1>
                <Link to={"/pets/new"}>add a pet to the shelter</Link>
            </div>
            <div>
                <h2>These pets are looking for a good home!</h2>
            </div>
            <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pets.map((pet) => {
                                return(
                                    <tr key={pet._id}>
                                        <td>{pet.name}</td>
                                        <td>{pet.type}</td>
                                        <td>
                                            <Link to={`/pets/${pet._id}`}>Details </Link>
                                            |
                                            <Link to={`/pets/${pet._id}/edit`}>edit </Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
        </div>
);
};

export default PetsList;