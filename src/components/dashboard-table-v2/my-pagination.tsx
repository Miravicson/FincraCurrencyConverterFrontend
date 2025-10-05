import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';

export function MyPagination({
  currentPage,
  onSetCurrentPage,
  totalPages,
}: {
  currentPage: number;
  onSetCurrentPage: (_page: number) => void;
  totalPages: number;
}) {
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onSetCurrentPage(page);
    }
  };

  // Generate pagination items with ellipsis behavior
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    const sidePages = 2;

    if (totalPages <= maxPagesToShow) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= sidePages + 1) {
      pages.push(1, 2, 3, '...', totalPages);
    } else if (currentPage >= totalPages - sidePages) {
      pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(
        1,
        '...',

        currentPage,
        '...',
        totalPages,
      );
    }

    return pages;
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
          </PaginationItem>

          {getPageNumbers().map((page, index) =>
            page === '...' ? (
              <PaginationItem key={index} className="pointer-events-none">
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={currentPage === page}
                  onClick={() => handlePageChange(Number(page))}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ),
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
