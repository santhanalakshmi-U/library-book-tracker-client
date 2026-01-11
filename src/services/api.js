import axios from 'axios';

// Use environment variable or fallback to localhost
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
const API_URL = `${BACKEND_URL}/api`;

export const getAvailableBooks = () => axios.get(`${API_URL}/books/available`);
export const getIssuedBooks = () => axios.get(`${API_URL}/books/issued`);
export const getStudents = () => axios.get(`${API_URL}/students`);
export const issueBook = (bookId, studentId) => axios.post(`${API_URL}/books/issue`, { bookId, studentId });
export const returnBook = (bookId) => axios.post(`${API_URL}/books/return`, { bookId });
export const createBook = (bookData) => axios.post(`${API_URL}/books`, bookData);
export const createStudent = (studentData) => axios.post(`${API_URL}/students`, studentData);