import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import BaseLayout from './components/BaseLayout/BaseLayout';
import NewsList from './components/NewsList';
import ArticleDetail from './components/ArticleDetail/ArticleDetail.jsx';
import AdminPanel from "./components/AdminPanel/AdminPanel.jsx";
import EditArticle from "./components/AdminPanel/Edit/EditArticle.jsx";
import CreateArticle from "./components/AdminPanel/Create/CreateArticle.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <BaseLayout><NewsList source="scraping"/></BaseLayout>,
    },
    {
        path: "/clone-news",
        element: <BaseLayout><NewsList source="database"/></BaseLayout>,
    },
    {
        path: "/article-detail",
        element: <BaseLayout><ArticleDetail/></BaseLayout>,
    },
    {
        path: "/article-by-id/:id",
        element: <BaseLayout><ArticleDetail/></BaseLayout>,
    },
    {
        path: "/admin",
        element: <BaseLayout><AdminPanel/></BaseLayout>,
    },
    {
        path: "/admin/new",
        element: <BaseLayout><CreateArticle /></BaseLayout>,
    },
    {
        path: "/admin/edit/:id",
        element: <BaseLayout><EditArticle /></BaseLayout>,
    },
]);

function App() {
    return <RouterProvider router={router}/>;
}

export default App;
