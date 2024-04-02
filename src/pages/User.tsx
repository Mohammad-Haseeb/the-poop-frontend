import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import UsersComponents from '../components/Users';
import DefaultLayout from '../layout/DefaultLayout';

const User = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Users" />
      <div className="flex flex-col gap-10">
        <UsersComponents />
      </div>
    </DefaultLayout>
  );
};

export default User;
