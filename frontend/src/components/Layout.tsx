import Sidebar from "./Sidebar";
import PageContent from "./PageContent";

function Layout() {
  return (
    <>
      <div className="drawer  lg:drawer-open">
        <input
          id="left-sidebar-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <PageContent />
        <Sidebar />
      </div>
    </>
  );
}
export default Layout;
