import { Pagination } from "react-bootstrap";

export default function PaginationUI({ noOfItems, activePage, onPageClick }) {
  return (
    noOfItems > 10 && (
      <Pagination>
        {Array.from({ length: Math.ceil(noOfItems / 10) }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === activePage}
            onClick={onPageClick.bind(null, index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    )
  );
}
