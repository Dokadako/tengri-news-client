import React, {useEffect, useState} from 'react';
import {useParams, useSearchParams} from 'react-router-dom';
import './style.css'
import Loader from "../Loader/index.jsx";

const ArticleDetail = () => {
    const [articleContent, setArticleContent] = useState(null);
    const [queryParameters] = useSearchParams();
    const params = useParams();
    useEffect(() => {
        const fetchArticleContent = async () => {
            try {
                const {id} = params
                if (!id) {
                    const response = await fetch(`https://tengri-news-server-fb457f2a9e75.herokuapp.com/api/articles/tengri/get-actual-detail?path=${queryParameters.get("path")}`);
                    const data = await response.json();
                    setArticleContent(data.content);
                } else {
                    const response = await fetch(`https://tengri-news-server-fb457f2a9e75.herokuapp.com/api/articles/${id}`);
                    const data = await response.json();
                    setArticleContent(data);
                }
            } catch (error) {
                console.error('Ошибка при получении детальной информации статьи:', error);
            }
        };

        fetchArticleContent();
    }, [queryParameters]);

    if (!articleContent) {
        return <Loader/>;
    }

    return (
        <div className="article-detail">
            <h2>{articleContent.title}</h2>
            <img src={articleContent.imageUrl} alt="Article"/>
            <p>{articleContent.content}</p>
            {
                articleContent.summary ?
                    <h4>{articleContent.summary}</h4> : ""
            }
            {
                articleContent.category ?
                    <h4>{articleContent.category}</h4> : ""
            }
        </div>
    );
};

export default ArticleDetail;
