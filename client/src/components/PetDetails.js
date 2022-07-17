import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams, useNavigate} from "react-router-dom";
import "./PetDetails.css"

const PetDetails = (props) => {
    const {removePetFromDom} = props;
    const [pet, setPet] = useState({})
    const [disabled, setDisabled] = useState(false);
    const [count, setCount] = useState(0)
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/pets/" + id)
            .then((res) => {
                console.log(res.data)
                setPet(res.data)
            })
            .catch((err) => console.log(err))
    }, [id]);

    const adoptPet = (petId) => {
        axios.delete('http://localhost:8000/api/pets/' + petId)
            .then((res) => {
                console.log(res)
                removePetFromDom(petId)
                navigate("/")
            })
            .catch((err) => console.log(err))
    };

    const likePet = (e) => {
        console.log("button clicked")
        setCount(count + 1)
        setDisabled(true)
    }

    return (
        <div>
            <div className='nav'>
                <h1>Pet Shelter</h1>
                <Link to={"/"}>back to home </Link>
            </div>
            <div className='subnav'>
                <h2>Details about: {pet.name}</h2>
                <button onClick={(e) => adoptPet(pet._id)} className='adoptbtn'>Adopt {pet.name}</button>
            </div>
            <div className='card'>
                <p>Pet Type: <span>{pet.type}</span></p>
                <p>Pet Description: <span>{pet.description}</span></p>
                <p>Skills: <span>{pet.skill1}, {pet.skill2}, {pet.skill3}</span></p>
                <div className='likes'>
                    <button disabled={disabled} onClick={(e) => likePet()} className='likebtn'>Like {pet.name}</button>
                    <p className='count'>{count} Like(s)</p>
                </div>
            </div>
        </div>
);
};

export default PetDetails;