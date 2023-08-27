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
        {path: '/group1', element: <SurveyDataProvider><Page1></Page1></SurveyDataProvider>},
        {path: '/group2', element: <SurveyDataProvider><Page2></Page2></SurveyDataProvider>},
        {path: '/group3', element: <SurveyDataProvider><Page3></Page3></SurveyDataProvider>},
        {path: '/intro1', element: <SurveyDataProvider><Intro1></Intro1></SurveyDataProvider>},
        {path: '/intro2', element: <SurveyDataProvider><Intro2></Intro2></SurveyDataProvider>},
        {path: '/intro3', element: <SurveyDataProvider><Intro3></Intro3></SurveyDataProvider>},
        {path: '/', element: <SurveyDataProvider><EmailForm></EmailForm></SurveyDataProvider>},
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
