import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/components/ui/pagination";
import clsx from 'clsx';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PostPagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    onPageChange(page);
  };

  const linkClasses = "rounded-full text-primary transition-none hover:border hover:border-primary";
  const activeClasses = "bg-primary text-white hover:border-transparent pointer-events-none";

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const showPages = 3;
    const sidePages = Math.floor(showPages / 2);

    let startPage = Math.max(1, currentPage - sidePages);
    let endPage = Math.min(totalPages, startPage + showPages - 1);

    if (endPage - startPage + 1 < showPages) {
      startPage = Math.max(1, endPage - showPages + 1);
    }

    if (startPage > 1) {
      pageNumbers.push(
        <PaginationItem key={1}>
          <PaginationLink className={linkClasses} href="#" onClick={handlePageChange(1)}>1</PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) pageNumbers.push(<PaginationEllipsis key="start-ellipsis" />);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            onClick={handlePageChange(i)}
            className={clsx(linkClasses, currentPage === i && activeClasses)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pageNumbers.push(<PaginationEllipsis key="end-ellipsis" />);
      pageNumbers.push(
        <PaginationItem key={totalPages}>
          <PaginationLink className={linkClasses} href="#" onClick={handlePageChange(totalPages)}>{totalPages}</PaginationLink>
        </PaginationItem>
      );
    }

    return pageNumbers;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            className='hover:-translate-x-1 transition-all'
            onClick={handlePageChange(Math.max(1, currentPage - 1))}
          />
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem>
          <PaginationNext
            href="#"
            className='hover:translate-x-1 transition-all'
            onClick={handlePageChange(Math.min(totalPages, currentPage + 1))}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PostPagination;