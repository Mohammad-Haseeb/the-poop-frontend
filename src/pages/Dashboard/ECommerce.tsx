import React, { useState } from 'react';
// import CardDataStats from '../../components/CardDataStats';
// import ChartOne from '../../components/Charts/ChartOne';
// import ChartThree from '../../components/Charts/ChartThree';
// import ChartTwo from '../../components/Charts/ChartTwo';
// import ChatCard from '../../components/Chat/ChatCard';
// import MapOne from '../../components/Maps/MapOne';
// import TableOne from '../../components/Trivia';
import DefaultLayout from '../../layout/DefaultLayout';

const ECommerce: React.FC = () => {
  const storedUserData = localStorage.getItem('user');
  const initialUserData = storedUserData ? JSON.parse(storedUserData) : null;

  const [usersData, setUsersData] = useState(initialUserData);
  return (
    <DefaultLayout>
      <h1 className="flex justify-center font-bold  text-6xl items-center h-screen">
        Welcome Back {usersData['user']['userName'] ?? '--'}
      </h1>
    </DefaultLayout>
  );
};

export default ECommerce;
