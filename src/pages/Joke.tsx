// import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import JokeComponents from '../components/Joke';

import DefaultLayout from '../layout/DefaultLayout';

const Joke = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Joke" />
      <div className="flex flex-col gap-10">
        <JokeComponents />
      </div>
    </DefaultLayout>
  );
};

export default Joke;
