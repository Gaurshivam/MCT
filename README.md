import React, { useState, useEffect } from 'react';

// Sample list of users (replace with actual data from users.json)
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
  { id: 3, username: 'user3', password: 'password3' },
];

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [userSelections, setUserSelections] = useState([]);

  // Fetch the list of dishes from the provided URL
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json'
        );
        const data = await response.json();
        setDishes(data);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    };
    fetchDishes();
  }, []);

# // Login handler
  const handleLogin = (username, password) => {
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      setLoggedInUser(user);
    } else {
      alert('Invalid username or password');
    }
  };

# // Vote handler
  const handleVote = (dishId, rank) => {
    const existingSelection = userSelections.find(
      (selection) => selection.dishId === dishId
    );

    if (existingSelection) {
      // Update existing selection
      const updatedSelections = userSelections.map((selection) =>
        selection.dishId === dishId ? { ...selection, rank } : selection
      );
      setUserSelections(updatedSelections);
    } else {
      // Add new selection
      setUserSelections([...userSelections, { dishId, rank }]);
    }
  };

# Render the login screen if user is not logged in
  if (!loggedInUser) {
    return (
      <div>
        <h2>Login</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const { username, password } = e.target.elements;
            handleLogin(username.value, password.value);
          }}
        >
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" required />
          <br />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" required />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

# Calculate points for each dish based on user selections
  const dishPoints = dishes.map((dish) => {
    const selectedByUser = userSelections.find(
      (selection) => selection.dishId === dish.id
    );

    return {
      ...dish,
      points: selectedByUser ? selectedByUser.rank * 10 : 0,
    };
  });

  // Render the poll results tab
  const renderPollResults = () => {
    const sortedDishes = dishPoints.sort((a, b) => b.points - a.points);

    return (
      <div>
        <h2>Poll Results</h2>
        <table>
          <thead>
            <tr>
              <th>Dish Name</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {sortedDishes.map((dish) => (
              <tr key={dish.id}>
                <td>{dish.dishName}</td>
                <td>{dish.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Render the voting tab
  const renderVotingTab = () => {
    return (
      <div>
        <h2>Vote for Your Favorite Dishes</h2>
        {dishes.map((dish) => (
          <div key={dish.id}>
            <h3>{dish.dishName}</h3>
            <p>{dish.description}</p>
            <button onClick={() => handleVote(dish.id, 1)}>Rank 1</button>
            <button onClick={() => handleVote(dish.id, 2)}>Rank 2</button>
            <button onClick={() => handleVote(dish.id, 3)}>Rank 3</button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>Welcome, {loggedInUser.username}!</h1>
      <div>
        <button onClick={() => setLoggedInUser(null)}>Logout</button>
      </div>
      <div>
        <button>Tab 1</button>
        <button>Tab 2</button>
      </div>
      {renderPollResults()}
      {renderVotingTab()}
    </div>
  );
};

export default App;
