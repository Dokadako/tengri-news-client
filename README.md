# Tengri News Clone Frontend

## Описание проекта

Фронтенд для клонированного приложения Tengri News, созданного для визуализации новостей и управления контентом через административную панель.

## Технологический стек

- React.js
- Axios для HTTP-запросов
- React Router для навигации
- CSS для стилизации

## Разработка

Разработка включала создание компонентов для отображения списков новостей, детальной информации статьи и административной панели. Статические данные были заменены динамическими, получаемыми от backend через REST API.

## Особенности

- Динамическое получение и отображение новостей.
- Возможность поиска статей по ключевым словам.
- Сортировка новостей по дате публикации.
- Административная панель для создания, редактирования и удаления статей.

## Проблемы и решения

Одной из проблем была интеграция поисковой функциональности. Я решил её, добавив фильтрацию на стороне клиента на основе данных, уже полученных от сервера.

## Известные проблемы

Пагинация вначале не работала должным образом из-за неправильной обработки запросов к API. Это было исправлено путем внесения изменений в логику состояний и запросов в React компонентах.

## Инструкции по настройке

1. Клонируйте репозиторий.
2. Установите зависимости, используя npm install.
3. Запустите приложение, используя npm start.
