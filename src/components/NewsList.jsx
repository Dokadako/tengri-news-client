import React, {useEffect, useState} from 'react';
import axios from 'axios';
import NewsItem from './NewsItem/NewsItem.jsx';
import Pagination from './Pagination/Pagination.jsx';
import moment from 'moment';
import 'moment/dist/locale/ru'
import Loader from "./Loader/index.jsx";
import {BACKEND_API} from "../main.jsx";

const NewsList = ({source}) => {
    const [articles, setArticles] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [filteredArticles, setFilteredArticles] = useState([]);

    useEffect(() => {
        if (!articles)
            return;

        if (searchTerm.trim()) {
            const lowercasedFilter = searchTerm.toLowerCase();
            const filteredData = articles.filter(item => {
                return Object.keys(item).some(key =>
                    typeof item[key] === "string" && item[key].toLowerCase().includes(lowercasedFilter)
                );
            });
            setFilteredArticles(filteredData);
        } else {
            setFilteredArticles(articles);
        }
    }, [searchTerm, articles]);

    moment.locale("ru")

    const fetchArticles = async (currentPage) => {
        const endpoint = source === "scraping"
            ? `${BACKEND_API}/articles/tengri/get-actual?page=${currentPage}`
            : `${BACKEND_API}/articles?page=${currentPage}&limit=${limit}&search=${searchTerm}`;
        try {
            const result = await axios(endpoint);
            setTotalPages(result.data.totalPages);
            setArticles(result.data.articles || result.data);
        } catch (error) {
            console.error('Ошибка при получении списка новостей:', error);
        }
    };

    useEffect(() => {
        fetchArticles(page);
    }, [source, page, limit, searchTerm]);

    const handleSearch = async (event) => {
        setSearchTerm(event.target.value)
    };


    const handlePageChange = (newPage) => {
        window.scrollTo(0, 0)
        setPage(newPage);
        fetchArticles(newPage);
    };

    if (!articles) {
        return <Loader/>
    }

    return (
        <div className="news-list">
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Поиск по новостям..."
            />
            {filteredArticles.length ? filteredArticles.map((article, index) => (
                    source === "scraping" ?
                        <NewsItem key={index} {...article} link={`/article-detail?path=${article.link}`}/> :
                        <NewsItem key={index} {...article} date={moment(article.publishedAt).calendar()}
                                  link={`/article-by-id/${article._id}`}
                                  imageUrl={article.mediaUrl}/>
                ))
                : <p>Пока новостей нет...</p>
            }
            <Pagination
                key={page}
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default NewsList;
