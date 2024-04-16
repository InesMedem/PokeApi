const Pagination = ({ pageNumbers, handlePageChange, currentPage }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {pageNumbers.map((page) => (
        <button
          className={`btn-pagination ${
            currentPage === page ? "btn-active" : "btn-inactive"
          }`}
          key={page}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
