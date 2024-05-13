import Conversations from "./Conversations";
import SearchInput from "./SearchInput";
import LogoutButton from "./LogoutButton";

const Sidebar = () => {
  return (
    <div>
      <SearchInput />
      <div className="divider px-3" />
      <Conversations />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
