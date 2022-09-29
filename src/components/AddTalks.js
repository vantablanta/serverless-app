import { API, graphqlOperation } from 'aws-amplify'
import { useState } from 'react'
import { createTodo } from "../graphql/mutations"
import { v4 as uuidv4 } from 'uuid';



export default function Add() {
    const initialState = {
        name: "test",
        description: "test",
        speakerName: "test",
        speakerBio: "test",
        clientId: uuidv4()
    }
    const [formState, setFormState] = useState(initialState)
    const [talk, setTalk] = useState()

    function setInput(key, value) {
        setFormState({ ...formState, [key]: value })
    }

    async function addTalk(e) {
        e.preventDeafult()
        try {
            if (formState.name === '' || formState.description === '' || formState.speakerBio === '' || formState.speakerName === '') {
                return
            }
            const data = { ...formState }
            console.log(data)
            setTalk([talk, data])
            setFormState(initialState)
            const body = await API.graphql(graphqlOperation(createTodo, { input: data }))
            console.log(body)
        } catch (err) {
            console.log('error creating todo:', err)
        }

        e.target.reset()
    }

    return (
        <div className="container mt-3">
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button className="btn me-md-2 add" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Talks</button>
            </div>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Talk</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        {/* MODAL */}
                        <div className="modal-body">
                            <form onSubmit={addTalk}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name of Talk</label>
                                    <input type="text" className="form-control" id="name" value={formState.name}
                                        onChange={e => setInput("name", e.target.value)} required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description">Description</label>
                                    <textarea className="form-control" id="description" style={{ "height": "100px" }}
                                        value={formState.description} onChange={e => setInput("description", e.target.value)} required>
                                    </textarea>

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="speaker" className="form-label">Name of Speaker</label>
                                    <input type="text" className="form-control" id="speaker" value={formState.speakerName}
                                        onChange={e => setInput("speakerName", e.target.value)} required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="bio" className="form-label">Speaker Bio</label>
                                    <input type="text" className="form-control" id="bio" value={formState.speakerBio}
                                        onChange={e => setInput("speakerBio", e.target.value)} required
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn add">Submit</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}