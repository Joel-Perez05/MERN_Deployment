import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

const EditPet = (props) => {
    const {id} = useParams();
    const [currentName, setCurrentName] = useState("")
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [skill1, setSkill1] = useState("");
    const [skill2, setSkill2] = useState("");
    const [skill3, setSkill3] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/pets/" + id)
            .then((res) => {
                console.log(res.data)
                setName(res.data.name)
                setCurrentName(res.data.name)
                setType(res.data.type)
                setDescription(res.data.description)
                setSkill1(res.data.skill1)
                setSkill2(res.data.skill2)
                setSkill3(res.data.skill3)
            })
            .catch((err) => console.log(err))
    }, [id]);

    const submitHandler = (e) => {
        e.preventDefault();
        axios.put("http://localhost:8000/api/pets/" + id, {
            name,
            type,
            description,
            skill1,
            skill2,
            skill3
        })
            .then((res) => {
                console.log(res)
                navigate("/");
            })
            .catch((err) => {
                console.log(err.response.data.error.errors);
                setErrors(err.response.data.error.errors);
            })
    };

    return (
        <div>
            <div className='nav'>
                <h1>Pet Shelter</h1>
                <Link to={"/"}>back to home</Link>
            </div>
                <h2 className='subheader'>Edit {currentName}</h2>
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
                    <button>Edit Pet</button>
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

export default EditPet;