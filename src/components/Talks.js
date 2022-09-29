import { useState, useEffect } from "react"
import { listTodos, todosByDate } from "../graphql/queries"
import { FaTrash, FaPen } from "react-icons/fa"
import { API, graphqlOperation } from 'aws-amplify'
import { createTodo, updateTodo, deleteTodo } from "../graphql/mutations"
import { v4 as uuidv4 } from 'uuid';

function Talks() {
    const [talks, setTalks] = useState([])
    const initialState = {
        name: "",
        description: "",
        speakerName: "",
        speakerBio: "",
        sort: "sortKey",
        clientId: uuidv4()
    }
    const [formState, setFormState] = useState(initialState)
    const [talk, setTalk] = useState()
    const sortParams = {
        sort: "sortKey",
        sortDirection: "DESC"
    }

    function setInput(key, value) {
        setFormState({ ...formState, [key]: value })
    }

    async function addTalk(e) {
        e.preventDefault()
        try {
            if (formState.name === '' || formState.description === '' || formState.speakerBio === '' || formState.speakerName === '') {
                return
            }
            const data = { ...formState }
            setTalk([talk, data])
            setFormState(initialState)
            await API.graphql(graphqlOperation(createTodo, { input: data }))

        } catch (err) {
            console.log('error creating todo:', err)
        }
        e.target.reset()
    }

    // UNORDERED
    async function getTodos() {
        try {
            const data = await API.graphql(graphqlOperation(listTodos))
            const talkItems = data.data.todosByDate.items
            setTalks(talkItems)
        }
        catch (err) {
            console.log(err)
        }
    }

    // ORDERED
    async function getSortedTodos() {
        try {
            const data = await API.graphql(graphqlOperation(todosByDate, { ...sortParams }))
            const talkItems = data.data.todosByDate.items
            setTalks(talkItems)
        }
        catch (err) {
            console.log(err)
        }
    }

    async function deleteTalk(id) {
        const confirmDel = window.confirm("Are you sure about deleteing?")
        const delId = {
            id: id
        }
        if (confirmDel) {
            try {
                await API.graphql({ query: deleteTodo, variables: { input: delId } });
            }
            catch (e) {
                console.log(e)
            }
        }
    }

    async function editTalk(id) {
        try {
            if (formState.name === '' || formState.description === '' || formState.speakerBio === '' || formState.speakerName === '') {
                return
            }
            const newDetails = { id, ...formState }
            setTalk([talk, newDetails])
            setFormState(initialState)
            await API.graphql({ query: updateTodo, variables: { input: newDetails } });
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getSortedTodos()
    })


    return (
        <section className="mb-5">

            <section>
                <div className="container mt-3">
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn me-md-2 add" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Talks</button>
                    </div>

                    {/* MODAL */}
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Add Talk</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
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
                                            <button type="submit" className="btn add" data-bs-dismiss="modal">Submit</button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container row mt-5">
                {
                    talks && talks.length > 0 &&
                    talks.map(talk => {
                        return (
                            <div className="card m-2 col-md-3" style={{ "width": "18rem" }} key={talk.id}>
                                <div className="card-header row">
                                    <h5 className="card-title">Talk: {talk.name}</h5>
                                </div>
                                <div className="card-body">
                                    <p className="card-text">About: {talk.description}</p>
                                </div>
                                <small className="card-footer row">
                                    <div className="d-flex justify-content-between">
                                        <small className="">
                                            <small>Speaker: {talk.speakerName}</small> <br />
                                            <small>About Speaker: {talk.speakerBio}</small>
                                        </small>
                                        <small className="icon float-end row">
                                            <div className="col">
                                                <span className="m-1"> <FaTrash onClick={() => deleteTalk(talk.id)} /> </span>
                                                <span className="" data-bs-toggle="modal" data-bs-target={`#id${talk.id}`}>
                                                    <FaPen />
                                                </span>
                                            </div>
                                        </small>
                                    </div>
                                </small>

                                {/* UPDATE MODAL */}
                                <div className="modal fade" id={`id${talk.id}`} tabIndex="-1" aria-labelledby={`id${talk.id}`} aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id={`id${talk.id}`}>Update Talk</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <form onClick={() => editTalk(talk.id)}>
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
                                                        <button type="submit" className="btn add" data-bs-dismiss="modal">Submit</button>
                                                    </div>

                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )
                    })
                }
            </section>

        </section>
    );
}

export default Talks;
