import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import ReviewComponents from '../components/Review';

import DefaultLayout from '../layout/DefaultLayout';

const Review = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Review" />
      <div className="flex flex-col gap-10">
        <ReviewComponents />
      </div>
    </DefaultLayout>
  );
};

export default Review;
