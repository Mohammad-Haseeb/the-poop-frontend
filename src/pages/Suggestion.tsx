import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import SuggestionComponents from '../components/Suggestion';

import DefaultLayout from '../layout/DefaultLayout';

const Suggestions = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Suggestions" />
      <div className="flex flex-col gap-10">
        <SuggestionComponents />
      </div>
    </DefaultLayout>
  );
};

export default Suggestions;
