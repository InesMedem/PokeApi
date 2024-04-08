const Pagination = ({ pageNumbers, handlePageChange }) => {
  return (
    <div>
      {pageNumbers.map((page) => (
        <button
          className="btn"
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
