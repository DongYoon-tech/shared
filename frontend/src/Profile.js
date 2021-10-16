import React, { useState } from 'react'
import {
    Form,
    FormGroup,
    Label,
    Input,
    Card,
    CardBody,
    CardText,
    Container,
    Button
} from "reactstrap";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import SharedApi from "./Api";
import { useHistory } from "react-router-dom";
import "./Profile.css"

const Profile = ({ currentUser, setCurrentUser }) => {
    console.log("here", currentUser)



    const history = useHistory()
    const [formData, setFormData] = useState({
        username: currentUser.username,
        password: '',
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        email: currentUser.email,
        lat: 37.76271616903525,
        lng: -122.4281591016166
    })

    const handleChange = e => {
        const { name, value } = e.target
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let profileData = {
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            password: formData.password
        }

        let username = formData.username;

    }

    const deleteHobby = async (id) => {
        try {
            let res = await SharedApi.deleteHobby(id)
            console.log(id)

        }
        catch (e) {
            console.log("error")
        }
        history.push("/profile")
    }

    return (
        <div className="row">
            <Container className="Profile-container">
                <div className="col-6 offset-md-3">
                    <Card className="Profile-card">
                        <h1>{currentUser.username}</h1>
                        <CardBody>
                            <Form onSubmit={handleSubmit}>

                                <FormGroup>
                                    <Label>First Name:</Label>
                                    <Input
                                        type="text"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Last Name:</Label>
                                    <Input
                                        type="text"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Email:</Label>
                                    <Input
                                        type="text"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Password:</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <Button color="primary">Save Changes</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </div>
            </Container>
            <Container className="user-hobbies-container" fluid={true}>
                <div className="col-6 offset-md-3">
                    <p className="user-hobbies" >{currentUser.username} Hobby List:</p>
                    {currentUser.hobbies.map(hobby => (
                        <ul key={hobby.id}>
                            <div className="user-activity">{hobby.activity}</div>
                            <div className="btn">
                                <Button outline color="success"><MdEdit /></Button>
                                <Button
                                    outline color="danger"
                                    onClick={() => deleteHobby(hobby.id)}
                                ><FaTrashAlt /></Button>
                            </div>
                        </ul>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Profile