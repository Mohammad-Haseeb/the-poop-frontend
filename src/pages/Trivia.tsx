// import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TriviaComponents from '../components/Trivia';
// import TableThree from '../components/Trivia/TableThree';
// import TableTwo from '../components/Trivia/TableTwo';
import DefaultLayout from '../layout/DefaultLayout';
// import AddTrivia from '../components/Trivia/AddTrivia';

const Trivia = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const toggleModal = () => {
  //   setIsModalOpen(!isModalOpen);
  // };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Trivia" />
      <div className="flex flex-col gap-10">
        <TriviaComponents />
      </div>
    </DefaultLayout>
  );
};

export default Trivia;
