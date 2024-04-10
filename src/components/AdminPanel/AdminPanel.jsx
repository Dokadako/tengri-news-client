
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Pagination from "../Pagination/Pagination.jsx";
import NewsItem from "../NewsItem/NewsItem.jsx";
import 'moment/dist/locale/ru'
import moment from "moment";
import './style.css'

const AdminPanel = () => {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    moment.locale("ru")

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await axios.get('https://tengri-news-server-fb457f2a9e75.herokuapp.com/api/articles')
            if (response.data.articles) {
                setArticles(response.data.articles);
                setTotalPages(response.data.totalPages)
            } else {
                setArticles(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch articles", error);
        }
    };


    return (
        <div>

            <div className="admin-header">
                <h2>Admin Panel</h2>
                <Link to="/admin/new" className="create-new-button">Create New Article</Link>
            </div>

            {
                articles.map(article => (
                    <NewsItem key={article.id} {...article} isAdmin={true}
                              date={moment(article.publishedAt).calendar()}/>
                ))}
            <Pagination page={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}/>

        </div>
    );
};

export default AdminPanel;
