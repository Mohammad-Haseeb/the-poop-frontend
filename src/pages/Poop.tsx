// import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import PoopComponents from '../components/Poop';

import DefaultLayout from '../layout/DefaultLayout';

const Poop = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Toilet" />
      <div className="flex flex-col gap-10">
        <PoopComponents />
      </div>
    </DefaultLayout>
  );
};

export default Poop;
