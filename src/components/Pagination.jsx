const Pagination = ({ pageNumbers, handlePageClick }) => {
  return (
    <div>
      {pageNumbers.map((page) => (
        <button
          className="btn"
          key={page}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
