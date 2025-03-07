import React, { FC } from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = (): (number | 'ellipsis')[] => {
        const pages: (number | 'ellipsis')[] = [];

        if (totalPages <= 10) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            let start: number, end: number;

            if (currentPage <= 5) {
                start = 2;
                end = 7;
            } else if (currentPage >= totalPages - 4) {
                start = totalPages - 6;
                end = totalPages - 1;
            } else {
                start = currentPage - 2;
                end = currentPage + 2;
            }

            if (start > 2) {
                pages.push('ellipsis');
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (end < totalPages - 1) {
                pages.push('ellipsis');
            }

            pages.push(totalPages);
        }
        return pages;
    };

    const pages = getPageNumbers();

    return (
        <nav>
            <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button 
                    className="page-link" 
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Previous"
                >
                    &lsaquo;
                </button>
                </li>
                
                {pages.map((page, index) =>
                page === 'ellipsis' ? (
                    <li key={index} className="page-item disabled">
                    <span className="page-link">...</span>
                    </li>
                ) : (
                    <li key={index} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                    <button 
                        className="page-link" 
                        onClick={() => onPageChange(page as number)}
                    >
                        {page}
                    </button>
                    </li>
                )
                )}
                
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button 
                    className="page-link" 
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Next"
                >
                    &rsaquo;
                </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;