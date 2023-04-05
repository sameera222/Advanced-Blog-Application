import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  page: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages }) => {
  const prevPage = page - 1;
  const nextPage = page + 1;

  return (
    <div className="pagination">
      {page > 1 && (
        <Link href={`/?page=${prevPage}`}>
            <FaChevronLeft />
        </Link>
      )}
      {page > 2 && (
        <Link href={`/?page=1`}>
          1
        </Link>
      )}
      {page > 3 && <span className="ellipsis">...</span>}
      {page > 1 && (
        <Link href={`/?page=${prevPage}`}>
          {prevPage}
        </Link>
      )}
      <span className="current-page">{page}</span>
      {page < totalPages && (
        <Link href={`/?page=${nextPage}`}>
          {nextPage}
        </Link>
      )}
      {page < totalPages - 2 && <span className="ellipsis">...</span>}
      {page < totalPages - 1 && (
        <Link href={`/?page=${totalPages}`}>
          {totalPages}
        </Link>
      )}
      {page < totalPages && (
        <Link href={`/?page=${nextPage}`}>
            <FaChevronRight />
        </Link>
      )}
    </div>
  );
};

export default Pagination;
