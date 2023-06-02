export interface Filter {
  employmentDate?: Date,
  name?: string,
  department?: string,
  salary?: number,
  experience?: string,
  page?: number,
  limit?: number
}

export interface Pagination {
  maxSize: number;
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  total: number; // Total Items in general
}

export const filterationBranch: Filter = {

  page: 0,
  limit: 10,
  employmentDate: undefined,
  name: '',
  department: '',
  salary: undefined,
  experience: '',
};
