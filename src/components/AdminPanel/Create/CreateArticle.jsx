import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './style.css'
import Loader from "../../Loader/index.jsx";
import {BACKEND_API} from "../../../main.jsx";

const CreateArticle = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        summary: '',
        category: '',
    });
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('image', file);
        Object.keys(formData).forEach(key => data.append(key, formData[key]));

        try {
            setIsLoading(true)
            axios.post(`${BACKEND_API}/articles`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(e => {
                setIsLoading(false)
                navigate('/admin');
            });
        } catch (error) {
            console.error("Failed to create article", error);
        }
    };

    if (isLoading)
        return <Loader/>

    return (
        <div className="create-article-container">
            <h2>Create Article</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor={"txtArea"}>Content:</label>
                    <textarea
                        id={"txtArea"}
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Summary:</label>
                    <input
                        type="text"
                        name="summary"
                        value={formData.summary}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateArticle;
