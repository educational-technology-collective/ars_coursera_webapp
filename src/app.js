import React from 'react';
import {createBrowserRouter, RouterProvider, Link} from 'react-router-dom';
import Week2EmailForm from "./page/week2/Week2EmailForm";
import Week2Group1 from './page/week2/Week2Group1';
import Week2Group2 from './page/week2/Week2Group2';
import Week2Group3 from './page/week2/Week2Group3';
import Week2Intro1 from './page/week2/Week2Intro1';
import Week2Intro2 from './page/week2/Week2Intro2';
import Week2Intro3 from './page/week2/Week2Intro3';

import Week3EmailForm from "./page/week3/Week3EmailForm";
import Week3Group1 from './page/week3/week3Group1';
import Week3Group2 from './page/week3/week3Group2';
import Week3Group3 from './page/week3/week3Group3';
import Week3Intro1 from './page/week3/week3Intro1';
import Week3Intro2 from './page/week3/week3Intro2';
import Week3Intro3 from './page/week3/week3Intro3';

import Survey from "./page/week3/survey";
import ThankYouPage from "./page/shared/ThankYouPage";

import {SurveyDataProvider} from "./SurveyDataContext";

const router = createBrowserRouter(
    [
        {path: '/week2-group1', element: <SurveyDataProvider><Week2Group1></Week2Group1></SurveyDataProvider>},
        {path: '/week2-group2', element: <SurveyDataProvider><Week2Group2></Week2Group2></SurveyDataProvider>},
        {path: '/week2-group3', element: <SurveyDataProvider><Week2Group3></Week2Group3></SurveyDataProvider>},
        {path: '/week2-intro1', element: <SurveyDataProvider><Week2Intro1></Week2Intro1></SurveyDataProvider>},
        {path: '/week2-intro2', element: <SurveyDataProvider><Week2Intro2></Week2Intro2></SurveyDataProvider>},
        {path: '/week2-intro3', element: <SurveyDataProvider><Week2Intro3></Week2Intro3></SurveyDataProvider>},
        {path: '/week2', element: <SurveyDataProvider><Week2EmailForm></Week2EmailForm></SurveyDataProvider>},
        {path: '/week3-group1', element: <SurveyDataProvider><Week3Group1></Week3Group1></SurveyDataProvider>},
        {path: '/week3-group2', element: <SurveyDataProvider><Week3Group2></Week3Group2></SurveyDataProvider>},
        {path: '/week3-group3', element: <SurveyDataProvider><Week3Group3></Week3Group3></SurveyDataProvider>},
        {path: '/week3-intro1', element: <SurveyDataProvider><Week3Intro1></Week3Intro1></SurveyDataProvider>},
        {path: '/week3-intro2', element: <SurveyDataProvider><Week3Intro2></Week3Intro2></SurveyDataProvider>},
        {path: '/week3-intro3', element: <SurveyDataProvider><Week3Intro3></Week3Intro3></SurveyDataProvider>},
        {path: '/week3', element: <SurveyDataProvider><Week3EmailForm></Week3EmailForm></SurveyDataProvider>},
        {path: '/survey', element: <SurveyDataProvider><Survey></Survey></SurveyDataProvider>},
        {path: '/thankyou', element: <SurveyDataProvider><ThankYouPage></ThankYouPage></SurveyDataProvider>},
        {path: '/', element: <div> <Link to="/week2">Week 2</Link> <Link to="/week3">Week 3</Link> </div>}
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
