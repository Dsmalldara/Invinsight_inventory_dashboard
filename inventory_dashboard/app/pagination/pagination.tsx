import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  
  interface PaginationCompType {
    currentpage: number;
    totalpage: number;
    onPageChange: (page: number) => void;
  }
  
  export function PaginationComp({ 
    currentpage, 
    totalpage = 1, 
    onPageChange 
  }: PaginationCompType) {
    // Ensure we have valid numbers
    const currentPageNum = Math.max(1, currentpage);
    const totalPages = Math.max(1, totalpage);
  
    const handlePageClick = (newPage: number) => {
      console.log("Pagination clicked:", newPage); // Debug log
      if (newPage !== currentpage && newPage >= 1 && newPage <= totalPages) {
        onPageChange(newPage);
      }
    };
  
    const getVisiblePages = () => {
      if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }
  
      if (currentPageNum <= 3) {
        return [1, 2, 3, -1, totalPages];
      }
  
      if (currentPageNum >= totalPages - 2) {
        return [1, -1, totalPages - 2, totalPages - 1, totalPages];
      }
  
      return [
        1,
        -1,
        currentPageNum - 1,
        currentPageNum,
        currentPageNum + 1,
        -1,
        totalPages
      ];
    };
  
    console.log("Current page in pagination:", currentpage); // Debug log
  
    return (
      <Pagination>
        <PaginationContent>
          {/* Previous button */}
          <PaginationItem>
            <PaginationPrevious 
              className={`${currentPageNum <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
              onClick={() => handlePageClick(currentPageNum - 1)}
            />
          </PaginationItem>
  
          {/* Page numbers */}
          {getVisiblePages().map((pageNum, index) => (
            <PaginationItem key={index}>
              {pageNum === -1 ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  className={`cursor-pointer ${pageNum === currentPageNum ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground' : ''}`}
                  onClick={() => handlePageClick(pageNum)}
                >
                  {pageNum}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
  
          {/* Next button */}
          <PaginationItem>
            <PaginationNext 
              className={`${currentPageNum >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
              onClick={() => handlePageClick(currentPageNum + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  }