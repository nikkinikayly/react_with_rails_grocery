import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <div>
    <h1>Home</h1>
    <h3>Welcome to your grocery lists!</h3>
    <button><Link to="/lists">View Lists</Link></button>
    </div>
    );

export default Home;