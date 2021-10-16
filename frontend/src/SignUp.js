import React, { useState } from 'react'
import {
    Form,
    FormGroup,
    Label,
    Input,
    Card,
    CardBody,
    Container,
    Button
} from "reactstrap";
import { useHistory } from "react-router-dom";
import "./SignUp.css"

const SignUp = ({ signup }) => {
    const history = useHistory()
    const INITIAL_STATE = {
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        email: '',
        //change to array so the user can add/edit/delete
        // get the lat and lng from current location (SF default)
        lat: 37.76271616903525,
        lng: -122.4281591016166
    }

    const [formData, setFormData] = useState(INITIAL_STATE)

    const handleChange = e => {
        const { name, value } = e.target
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let res = await signup(formData)
        if (res.success) {
            history.push("/hobbies")
        }
        else {
            console.log(res.errors)
        }
        // history.push('/')
        // console.log(formData)
    }

    return (

        <Container>
            <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
                <Card className="Signup-card">
                    <h1>Sign Up</h1>
                    <CardBody>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label>Username:</Label>
                                <Input
                                    type="text"
                                    name="username"
                                    value={formData.username}
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
                            {/* <FormGroup>
                                <Label>Hobbies:</Label>
                                <Input
                                    type="text"
                                    name="hobbies"
                                    value={formData.hobbies}
                                    onChange={handleChange}
                                />
                            </FormGroup> */}
                            <Button color="primary">Submit</Button>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </Container>
    )
}

export default SignUp