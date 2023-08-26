import React, { createContext, useContext, useState } from 'react';

const SurveyDataContext = createContext();

export function useSurveyData() {
  return useContext(SurveyDataContext);
}

export function SurveyDataProvider({ children }) {
  const [data, setData] = useState({
    email: '',
    intro: {},
    page: {}
  });

  return (
    <SurveyDataContext.Provider value={{ data, setData }}>
      {children}
    </SurveyDataContext.Provider>
  );
}
