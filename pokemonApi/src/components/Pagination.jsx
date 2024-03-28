const Pagination = ({ gotoNextPage, gotoPrevPage }) => {
  return (
    <div>
      {gotoPrevPage && <button onClick={gotoPrevPage}>Previous</button>}
      {gotoNextPage && <button onAuxClick={gotoNextPage}>Next</button>}
    </div>
  );
};

export default Pagination;
