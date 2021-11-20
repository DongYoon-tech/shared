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
import { Link } from 'react-router-dom';
import { FaTrashAlt } from "react-icons/fa";
import SharedApi from "./Api";
import { useHistory } from "react-router-dom";
import "./Profile.css"

const Profile = ({ currentUser, setCurrentUser, delHobby, editHobby, hobbyList }) => {

    const history = useHistory()
    const [saved, setSaved] = useState(false)
    const [formData, setFormData] = useState({
        username: currentUser.username,
        password: '',
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        email: currentUser.email,
        lat: currentUser.lat,
        lng: currentUser.lng
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
            password: formData.password,
            lat: formData.lat,
            lng: formData.lng,
        }

        let username = formData.username;
        let updatedUser;

        try {
            updatedUser = await SharedApi.saveProfile(username, profileData);

        } catch (errors) {
            console.log("Error")
            return;
        }

        setFormData(data => ({ ...data, password: "" }));
        let hobbiesAdded = { ...updatedUser, hobbies: [...currentUser.hobbies] }
        setCurrentUser(hobbiesAdded);
        setSaved(true)

    }

    return (
        <div >
            <div className="user-info">
                <Container className="Profile-container">
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
                                <div className="btn-form">
                                    {saved
                                        ?
                                        <div className="saved">Saved!</div>
                                        :
                                        <Button className="btn-submit-changes" color="primary">Save Changes</Button>
                                    }
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Container>
                <div className="user-hobbies-container">
                    <p className="user-hobbies" >{currentUser.username} Hobby List:</p>
                    {currentUser.hobbies.length == 0
                        ?
                        <h3 className="no-hobbies">No Hobbies at the moment...</h3>
                        :
                        <div>
                            {currentUser.hobbies.map(hobby => (
                                <ul key={hobby.id}>
                                    <div className="user-activity">{hobby.activity}</div>
                                    <div className="btn">
                                        <Button
                                            outline color="danger"
                                            onClick={() => delHobby(hobby.id)}
                                        ><FaTrashAlt /></Button>
                                    </div>
                                </ul>
                            ))}
                        </div>}
                </div>
            </div>
            <div className="go-back-btn">
                <Link id="hobbies-btn" to="/hobbies">
                    Go Back To Hobbies
                </Link>
            </div>
        </div>
    )
}

export default Profile