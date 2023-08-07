import React from 'react';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';

const router = createBrowserRouter(
    [
        { path: '/group1', component: Page1 },
        { path: '/group2', element: Page2 },
        { path: '/group3', element: Page3 },
        { path: '/', element:
            <div>
                <h1>Home</h1>
                <ul>
                    <li><Link to="/group1">Group 1</Link></li>
                    <li><Link to="/group2">Group 2</Link></li>
                    <li><Link to="/group3">Group 3</Link></li>
                </ul>
            </div>
        },
    ]
);

function App() {
  return (
      <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
