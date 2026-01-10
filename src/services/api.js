import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const getAvailableBooks = () => axios.get(`${API_URL}/api/books/available`);
export const getIssuedBooks = () => axios.get(`${API_URL}/api/books/issued`);
export const getStudents = () => axios.get(`${API_URL}/api/students`);
export const issueBook = (bookId, studentId) => axios.post(`${API_URL}/api/books/issue`, { bookId, studentId });
export const returnBook = (bookId) => axios.post(`${API_URL}/api/books/return`, { bookId });
export const createBook = (bookData) => axios.post(`${API_URL}/api/books`, bookData);
export const createStudent = (studentData) => axios.post(`${API_URL}/api/students`, studentData);