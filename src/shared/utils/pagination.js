import { useEffect, useMemo, useState } from "react";

export const usePagination = ({
  records = [],
  initialPage = 1,
  recordsPerPage = 5,
  resetOnDataChange = true,
} = {}) => {
  const [page, setPage] = useState(initialPage);

  const totalRecords = records.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / recordsPerPage));

  const pagedRecords = useMemo(() => {
    const start = (page - 1) * recordsPerPage;
    return records.slice(start, start + recordsPerPage);
  }, [records, page, recordsPerPage]);

  const pageRangeText =
    totalRecords === 0
      ? "0/0"
      : `${Math.min((page - 1) * recordsPerPage + 1, totalRecords)}-${Math.min(
          page * recordsPerPage,
          totalRecords
        )}/${totalRecords}`;

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  useEffect(() => {
    if (resetOnDataChange) {
      setPage(1);
    }
  }, [records, resetOnDataChange]);

  return {
    page,
    setPage,
    recordsPerPage,
    totalRecords,
    totalPages,
    pageRangeText,
    pagedRecords,
  };
};
