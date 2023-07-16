import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import Button from "../../components/Button";
import PageHeader from "../../components/PageHeader";
import Avatar from "../../components/navbar/Avatar";

const SettingsPage = () => {
  const { currentUser } = useAppSelector((state: RootState) => state.user);
  return (
    <div>
      <PageHeader title={"Settings"} />
      <div className="mt-10 flex flex-col gap-10 ">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="rounded-full w-12 h-12 border-[2px] border-neutral-600 bg-white  shadow-sm"></div>
          <h3 className="font-bold">{currentUser?.name}</h3>
        </div>

        <div className="flex flex-col gap-10 bg-gray-100 dark:bg-transparent dark:border-[1.5px] dark:border-darkCardBg p-10 rounded-md">
          {/* name container */}
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-xs text-gray-400">Display Name</h3>
              <h2 className="font-semibold text-neutral-600">
                {currentUser?.name}
              </h2>
            </div>
            <div>
              <Button secondary>Edit </Button>
            </div>
          </div>
          {/* email container */}
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-normal text-gray-400">Email</h3>
              <h2 className="font-semibold text-neutral-600">
                {currentUser?.email}
              </h2>
            </div>
            <div>
              <Button secondary>Edit </Button>
            </div>
          </div>

          {/* password container */}
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-normal text-gray-400">Password</h3>
              <h2 className="font-semibold text-neutral-600">********</h2>
            </div>
            <div>
              <Button secondary>Edit </Button>
            </div>
          </div>
        </div>
        {/* sign out button */}
        <div className="w-44  self-center">
          <Button fullWidth>Log out</Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
