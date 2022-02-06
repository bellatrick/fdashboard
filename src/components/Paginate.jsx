import React from 'react';
import {ArrowBack,ArrowForward} from '@material-ui/icons'
import { usePagination, DOTS } from '../utils/usePagination';

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
     if(currentPage===1 ) return
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className='flex items-center justify-center mt-10 hover:text-gray-500'
    >
       {/* Left navigation arrow */}
      <li
       className={`${currentPage === 1?' text-transparent hover:bg-transparent':'text-white bg-gray-800 '}rounded-full mr-2 text-base font-bold px-1`}
        onClick={onPrevious}
        disable={currentPage===1}
      >
        <ArrowBack/>
      </li>
      {paginationRange.map(pageNumber => {
         
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }
		
        // Render our Page Pills
        return (
          <li
           className={`${pageNumber === currentPage?'text-white bg-blue-500':'text-gray-600 '} rounded-full mr-2 text-lg font-bold px-4 cursor-pointer`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li
      className={`${currentPage === lastPage?'bg-transparent text-transparent hover:bg-transparent':'bg-gray-800 '}rounded-full px-1 text-white `}
        onClick={onNext}
      >
        <ArrowForward/>
      </li>
    </ul>
  );
};

export default Pagination;