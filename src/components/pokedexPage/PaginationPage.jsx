import React, { useState, useEffect } from "react";
import "../pokedexPage/styles/PaginationPage.css";

const PaginationPage = ({ setPage, totalPages }) => {
  const [pages, setPages] = useState(1);
  const buttons = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handleNewPage = () => {
    if (pages < totalPages) {
      setPages((prevPages) => prevPages + 1);
    }
  };

  const handleMinusPage = () => {
    if (pages > 1) {
      setPages((prevPages) => prevPages - 1);
    }
  };

  const handleNumberPage = (pageNumber) => {
    setPages(parseInt(pageNumber));
  };

  useEffect(() => {
    setPage((pages - 1) * 100);
  }, [pages, setPage]);

  return (
    <section className="pagination__section">
      <i
        onClick={handleMinusPage}
        className={`bx bxs-chevrons-left icon__page ${
          pages === 1 ? "disabled" : ""
        }`}
      ></i>
      {buttons.slice(pages - 1, pages + 6).map((pageNumber) => (
        <p
          className={`pagination__p ${pageNumber === pages ? "active" : ""}`}
          key={pageNumber}
          onClick={() => handleNumberPage(pageNumber)}
        >
          {pageNumber}
        </p>
      ))}
      <i
        onClick={handleNewPage}
        className="bx bxs-chevrons-right icon__page"
      ></i>
    </section>
  );
};

export default PaginationPage;