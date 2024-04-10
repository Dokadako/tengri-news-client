import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';
import Loader from "../../Loader/index.jsx";

const EditArticle = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        summary: '',
        category: '',
        imageUrl: '',
    });
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const {data} = await axios.get(`https://tengri-news-server-fb457f2a9e75.herokuapp.com/api/articles/${id}`);
                setFormData(data);
            } catch (error) {
                console.error("Failed to fetch article for editing", error);
            }
        };
        fetchArticle();
    }, [id]);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        if (file) {
            data.append('image', file);
        }
        Object.keys(formData).forEach(key => {
            if (key !== 'imageUrl') {
                data.append(key, formData[key]);
            }
        });

        try {
            setIsLoading(true)
            axios.put(`https://tengri-news-server-fb457f2a9e75.herokuapp.com/api/articles/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(e => {
                setIsLoading(false)
                navigate('/admin');
            });
        } catch (error) {
            console.error("Failed to update article", error);
        }
    };

    if (isLoading)
        return <Loader/>

    return (
        <div>
            <h2>Edit Article</h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <label>Content:</label>
                <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                />
                <label>Summary:</label>
                <input
                    type="text"
                    name="summary"
                    value={formData.summary}
                    onChange={handleChange}
                />
                <label>Category:</label>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                />
                <label>Image (leave blank to keep current image):</label>
                <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditArticle;
