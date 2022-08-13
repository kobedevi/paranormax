import { useState } from 'react';
import Button from '../../Design/Button';
import Input from '../../Design/Input';
import * as yup from "yup";
import { getValidationErrors } from '../../../core/utils/validation';
import ErrorAlert from '../../Shared/ErrorAlert';
import Container from '../../Design/Container';
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useMutation } from '@apollo/client';
import { CREATE_MISSION } from '../../GraphQL/Mutations';
import storage from '../../../core/storage';
import { route, Routes } from '../../../core/routing';
import { useHistory } from 'react-router-dom';

let schema = yup.object().shape({
    missionTitle: yup.string().required(),
    shortDescription: yup.string().required(),
    deadline: yup.date().required(),
});
  

function MissionCreate() {

    const history = useHistory();

    const [data, setData] = useState({
        missionTitle: '',
        shortDescription: '',
        deadline: ''
    });

    const [localUser, setLocalUser] = useState(storage.getUser())
    const [errors, setErrors] = useState({});
    const [error, setError] = useState();

    // tinymce
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
        console.log(editorRef.current.getContent());
        }
    };

    const [createMission] = useMutation(CREATE_MISSION);

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        schema.validate(data,{abortEarly: false})
        .then(() => {
            createMission({
                variables: {
                    authorId: localUser.user.id,
                    title: data.missionTitle, 
                    short: data.shortDescription, 
                    long: editorRef.current.getContent(),
                    deadline: data.deadline
                },
                onCompleted:({save_missions_default_Entry}) => {
                    const { id } = save_missions_default_Entry
                    history.push(route(Routes.MissionDetail, {id}));
                }
            }).catch((e) => {
                setErrors(getValidationErrors(e));
            })
        }).catch((e) => {
            setErrors(getValidationErrors(e));
        })
    };

    return(
        <>
            <section className="py-5">
                <Container>
                    <div className="bg-light rounded-3 py-5 px-4 px-md-5 mb-5">
                        <div className="text-center mb-5">
                            <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-lock"></i></div>
                            <h1 className="fw-bolder">Create Assignment</h1>
                        </div>
                        <div className='row gx-5 justify-content-center'>
                            <div className="col-lg-8 col-xl-6">
                                <form onSubmit={handleSubmit} noValidate={true}>
                                    <ErrorAlert error={error}></ErrorAlert>
                                    <Input label="Mission Title" type="text" name="missionTitle" value={data.missionTitle} onChange={handleChange} error={errors.missionTitle} />
                                    <Input label="Short Description" type="text" name="shortDescription" value={data.shortDescription} onChange={handleChange} error={errors.shortDescription} />
                                    <div className="form-floating mb-3">
                                        <Editor
                                            onInit={(evt, editor) => editorRef.current = editor}
                                            initialValue="<p></p>"
                                            init={{
                                            height: 300,
                                            menubar: false,
                                            plugins: [

                                            ],
                                            toolbar: 'undo redo | formatselect | ' +
                                            'bold italic | alignleft aligncenter ' +
                                            'alignright alignjustify | bullist numlist outdent indent | ' +
                                            'removeformat',
                                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                            }}
                                        />
                                    </div>
                                    <Input label="Deadline" type="date" name="deadline" value={data.deadline} onChange={handleChange} error={errors.deadline} />
                                    <div className='d-grid'>
                                        <Button color="primary" className="btn btn-primary btn-lg" type="submit">Create Assignment</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    )
}

export default MissionCreate;