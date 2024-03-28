import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Dashboard from '../layouts/Dashboard'
import { show, update } from '../project/projectSlice'

function SampleEditScreen() {

    const dispatch = useDispatch()
    const params = useParams();

    const stateProject = useSelector(state => state.project)
    const [project, setProject] = useState(stateProject.project || {});
    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(show(params.id));
    }, [dispatch, params.id]);

    useEffect(() => {
        if (stateProject.project) {
            setProject(stateProject.project);
        }
    }, [stateProject.project]);


    const onChangeForm = (e) => {
        const target = e.target
        setErrors(prevErrors => {
            let updatedErrors = { ...prevErrors };

            switch (target.id) {
                case "name":
                    updatedErrors.name = (target.value.length <= 6) ?
                        "Min six characters required" : false;
                    break;

                case "description":
                    updatedErrors.description = (target.value.length <= 6) ?
                        "Min six characters required" : false;
                    if (!updatedErrors.description) {
                        updatedErrors.description = (target.value.length > 20) ?
                            "Can't exceed 20 characters" : false;
                    }
                    break;

                default:
                    break;
            }

            return updatedErrors;
        });

        setProject(prevProject => ({
            ...prevProject,
            [target.id]: target.value
        }));
    }


    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        const allErrorsFalse = Object.values(errors).every(error => error === false);
        if (allErrorsFalse) {
            dispatch(update(project))
            navigate('/projects')
        }
    }

    return (
        <Dashboard>
            <main className="content px-3 py-2">
                <div className="container-fluid">
                    <div className="card border-0">
                        <div className="card-header">
                            <h5 className="card-title">
                                Edit Project
                            </h5>
                            <h6 className="card-subtitle text-muted">Edit your project</h6>
                        </div>
                        <div className="card-body">
                            <form onSubmit={submitHandler}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Project Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="form-control"
                                        value={project.name || ''}
                                        onChange={onChangeForm}
                                    />
                                    <div className="form-error">
                                        {errors.name}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        type="text"
                                        id="description"
                                        className="form-control"
                                        value={project.description || ''}
                                        onChange={onChangeForm}
                                    />
                                    <div className="form-error">
                                        {errors.description}
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </Dashboard>
    )
}

export default SampleEditScreen