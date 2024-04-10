import React from 'react';
import {Link} from "react-router-dom";
import './style.css'
import axios from "axios";
import {BACKEND_API} from "../../main.jsx";

const NewsItem = ({_id, title, link, imageUrl, date, isAdmin = false}) => {

    const deleteArticle = async (id) => {
        try {
            await axios.delete(`${BACKEND_API}/articles/${id}`);
            window.location.reload();
        } catch (error) {
            console.error("Failed to delete article", error);
        }
    };

    return (
        <div className="news-item">
            <img src={imageUrl} alt={title}/>
            <div className="news-info">
                <Link to={link}><h3>{title}</h3></Link>
                <p>Дата: {date}</p>
            </div>
            {
                isAdmin && (
                    <div className="news-actions">
                        <Link to={`/admin/edit/${_id}`} className="edit-button">Edit</Link>
                        <button onClick={() => deleteArticle(_id)} className="delete-button">Delete</button>
                    </div>
                )
            }
        </div>
    );
};

export default NewsItem;
