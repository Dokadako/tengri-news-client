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
                const {id} = params;
                let response, data;

                if (!id) {
                    response = await fetch(`https://tengri-news-server-fb457f2a9e75.herokuapp.com/api/articles/tengri/get-actual-detail?path=${queryParameters.get("path")}`);
                    data = await response.json();
                } else {
                    response = await fetch(`https://tengri-news-server-fb457f2a9e75.herokuapp.com/api/articles/${id}`);
                    data = await response.json();
                }
                setArticleContent(data.content);
            } catch (error) {
                console.error('Ошибка при получении детальной информации статьи:', error);
            }
        };

        fetchArticleContent();
    }, [queryParameters, params]);

    if (!articleContent) {
        return <Loader/>;
    }

    const renderMedia = (mediaUrl) => {
        if (mediaUrl.match(/\.(jpeg|jpg|gif|png)$/)) {
            return <img src={mediaUrl} alt="Article Visual"/>;
        } else if (mediaUrl.match(/\.(mp4|webm)$/)) {
            return (
                <video controls preload="metadata">
                    <source src={mediaUrl} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            );
        }
    };

    return (
        <div className="article-detail">
            <h2>{articleContent.title}</h2>
            {renderMedia(articleContent.mediaUrl)}
            <div dangerouslySetInnerHTML={{__html: articleContent.content}}/>
            {articleContent.summary && <h4>{articleContent.summary}</h4>}
            {articleContent.category && <h4>{articleContent.category}</h4>}
        </div>
    );
};

export default ArticleDetail;
