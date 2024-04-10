import React from 'react';
import './style.css'

const range = (start, end) => {
    return Array(end - start + 1).fill().map((_, idx) => start + idx);
};

const Pagination = ({page, totalPages, onPageChange}) => {
    let pageNumbers = [];

    if (totalPages <= 5) {
        pageNumbers = range(1, totalPages);
    } else {
        const startPage = Math.max(1, page - 2);
        const endPage = Math.min(totalPages, page + 2);
        pageNumbers = range(startPage, endPage);

        if (startPage > 1) {
            pageNumbers.unshift('...');
            pageNumbers.unshift(1);
        }
        if (endPage < totalPages) {
            pageNumbers.push('...');
            pageNumbers.push(totalPages);
        }
    }

    return (
        <div className="pagination">
            <button onClick={() => onPageChange(page - 1)} disabled={page === 1 || totalPages === 0}>
                Назад
            </button>
            {pageNumbers.map((pageNum, index) =>
                pageNum === '...' ? (
                    <span key={index} className="pagination-ellipsis">{pageNum}</span>
                ) : (
                    <button
                        key={index}
                        onClick={() => onPageChange(pageNum)}
                        className={(pageNum === page) ? 'active' : ''}
                    >
                        {pageNum}
                    </button>
                )
            )}
            <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages || totalPages === 0}>
                Вперед
            </button>
        </div>
    );
};

export default Pagination;
