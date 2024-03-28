import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { destroy, index, remove } from './projectSlice'
import Dashboard from '../layouts/Dashboard'
import { Stack, Table } from 'react-bootstrap'
import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ProjectIndexScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const stateProject = useSelector(state => state.project)
    const { projects, project } = stateProject
    const { theme } = useSelector(state => state.auth)
    const isDarkMode = theme === 'dark';

    useEffect(() => {
        dispatch(index())
    }, [dispatch])

    const deleteHandler = (project) => {
        dispatch(remove(project))
        dispatch(destroy(project))
    }

    return (
        <Dashboard>

            <Stack direction='horizontal' gap={3}>
                <div className='p-2'><h1>Projects</h1></div>
                <div className='p-2 ms-auto'>
                    <Link to="/projects/create">
                    <FontAwesomeIcon
                        icon={faAdd}
                        size='1x'
                    />

                    </Link>
                </div>

            </Stack>
            <Table striped bordered hover variant={isDarkMode ? 'dark' : 'light'}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Project Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        projects.map((data) => (
                            <tr key={data.id}>
                                <td>{data.id}</td>
                                <td>{data.name}</td>
                                <td>
                                    <Link to={`/projects/${data.id}`} >
                                        <FontAwesomeIcon
                                            icon={faEdit}
                                            size="1x"
                                            className="m-2"
                                        />
                                    </Link>
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        size="1x"
                                        className="m-2 danger"
                                        onClick={() => deleteHandler(data)}
                                    />
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </Dashboard>

    )
}

export default ProjectIndexScreen