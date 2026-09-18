import useStickyRail from '../../hooks/useStickyRail.js';
import Sidebar from './Sidebar.jsx';

/** The sticky column that holds the sidebar block (see `useStickyRail`). */
export default function SidebarRail() {
  const ref = useStickyRail();
  return (
    <div ref={ref} className="sidebar-col">
      <Sidebar />
    </div>
  );
}
