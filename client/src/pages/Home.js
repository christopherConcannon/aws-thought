import React, { useState, useEffect } from 'react';
import ThoughtList from '../components/ThoughtList';
import ThoughtForm from '../components/ThoughtForm';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [thoughts, setThoughts] = useState([]);

  // const loggedIn = Auth.loggedIn();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/users');
      const data = await res.json();
      // sort the array by createdAt property ordered by descending values
      const orderData = data.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1);
      setThoughts(orderData);
      setIsLoaded(true);
    }
    fetchData();
  }, []);

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
          <ThoughtForm />
        </div>
        <div className={`col-12 mb-3 `}>
          {!isLoaded ? (
            <div>Loading...</div>
          ) : (
              <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
            )}
        </div>
      </div>
    </main>
  );
};

export default Home;