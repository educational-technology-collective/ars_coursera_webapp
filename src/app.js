import React from 'react';
import {createBrowserRouter, RouterProvider, Link} from 'react-router-dom';
import EmailForm from "./components/EmailForm";
import Page1 from './page/page1';
import Page2 from './page/page2';
import Page3 from './page/page3';
import Intro1 from './page/intro1';
import Intro2 from './page/intro2';
import Intro3 from './page/intro3';
import {SurveyDataProvider} from "./SurveyDataContext";

const router = createBrowserRouter(
    [
        {path: '/group1', element: <Page1></Page1>},
        {path: '/group2', element: <Page2></Page2>},
        {path: '/group3', element: <Page3></Page3>},
        {path: '/intro1', element: <Intro1></Intro1>},
        {path: '/intro2', element: <Intro2></Intro2>},
        {path: '/intro3', element: <Intro3></Intro3>},
        {path: '/', element: <EmailForm></EmailForm>},
    ]
);

function App() {
    return (
        <SurveyDataProvider>
            <RouterProvider router={router}></RouterProvider>
        </SurveyDataProvider>
    );
}

export default App;
