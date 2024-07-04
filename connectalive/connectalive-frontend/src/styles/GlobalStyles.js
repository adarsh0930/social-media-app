// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    background-color: #f8f9fa;
    color: #343a40;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  nav {
    background-color: #007bff;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  nav a {
    color: #fff;
    margin: 0 1rem;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .hero {
    text-align: center;
    padding: 4rem 0;
    background: url('/images/home-bg.jpg') no-repeat center center/cover;
    color: white;
  }

  .hero h1 {
    font-size: 3rem;
  }

  .hero p {
    font-size: 1.5rem;
    margin-top: 1rem;
  }

  .card {
    background: white;
    border-radius: 10px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .form-container {
    max-width: 500px;
    margin: 2rem auto;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
  }

  .form-group input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ced4da;
    border-radius: 5px;
  }

  .form-group button {
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    font-size: 1rem;
    cursor: pointer;
  }

  .form-group button:hover {
    background-color: #0056b3;
  }

  .message {
    margin-top: 1rem;
    color: #ff0000;
  }
`;

export default GlobalStyles;
