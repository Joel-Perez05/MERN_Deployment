import React, {useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import "./NewPet.css"


const NewPet = (props) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [skill1, setSkill1] = useState("");
    const [skill2, setSkill2] = useState("");
    const [skill3, setSkill3] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/pets", {
            name,
            type,
            description,
            skill1,
            skill2,
            skill3
        })
            .then((res) => {
                console.log(res);
                navigate("/");
            })
            .catch((err) => {
                console.log(err.response.data.error.errors);
                setErrors(err.response.data.error.errors);
            });
    };

    return (
        <div>
            <div className='nav'>
                <h1>Pet Shelter</h1>
                <Link to={"/"}>back to home</Link>
            </div>
            <div>
                <h2>Know a pet nedding a home?</h2>
            </div>
            <form onSubmit={submitHandler}>
                <div className='left'>
                    <label htmlFor='name'>Pet Name: </label>
                    {errors.name && <p style={{color: "red"}}>{errors.name.message}</p>}
                    <div>
                        <input id='name' value={name} type="text" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <label htmlFor='type'>Pet Type: </label>
                    {errors.type && <p style={{color: "red"}}>{errors.type.message}</p>}
                    <div>
                        <input id='type' value={type} type="text" onChange={(e) => setType(e.target.value)} />
                    </div>
                    <label htmlFor='description'>Pet Description: </label>
                    {errors.description && <p style={{color: "red"}}>{errors.description.message}</p>}
                    <div>
                        <input id='description' value={description} type="text" onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <button>Add Pet</button>
                </div>
                <div className='right'>
                    <p>Skills (optional):</p>
                    <label htmlFor='skill1'>Skill 1: </label>
                    <div>
                        <input id='skill1' value={skill1} type="text" onChange={(e) => setSkill1(e.target.value)} />
                    </div>
                    <label htmlFor='skill2'>Skill 2: </label>
                    <div>
                        <input id='skill2' value={skill2} type="text" onChange={(e) => setSkill2(e.target.value)} />
                    </div>
                    <label htmlFor='skill3'>Skill 3: </label>
                    <div>
                        <input id='skill3' value={skill3} type="text" onChange={(e) => setSkill3(e.target.value)} />
                    </div>
                </div>
            </form>
        </div>
);
};

export default NewPet;