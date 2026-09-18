import { useEffect } from 'react';
import { useI18n } from './i18n/I18nProvider.jsx';
import Nav from './components/layout/Nav.jsx';
import { BorderGlowGroup } from './components/ui/BorderGlow/BorderGlowGroup.jsx';
import SidebarRail from './components/sidebar/SidebarRail.jsx';
import StatusCard from './components/cards/StatusCard/StatusCard.jsx';
import MapCard from './components/cards/MapCard/MapCard.jsx';
import ProjectStackCard from './components/cards/ProjectStackCard/ProjectStackCard.jsx';
import ApiStatusCard from './components/cards/ApiStatusCard/ApiStatusCard.jsx';
import WeatherCard from './components/cards/WeatherCard/WeatherCard.jsx';
import ActivityCard from './components/cards/ActivityCard/ActivityCard.jsx';
import FolderCard from './components/cards/FolderCard/FolderCard.jsx';
import ThemeToggleCard from './components/cards/ThemeToggleCard/ThemeToggleCard.jsx';
import DevProjectsCard from './components/cards/ProjectsCard/DevProjectsCard.jsx';
import SocialsCard from './components/cards/SocialsCard/SocialsCard.jsx';
import EngineeringProjectsCard from './components/cards/ProjectsCard/EngineeringProjectsCard.jsx';
import ChatCard from './components/cards/ChatCard/ChatCard.jsx';
import ToolsCard from './components/cards/ToolsCard/ToolsCard.jsx';

export default function App() {
  const { lang } = useI18n();

  useEffect(() => {
    const preventImageContextMenu = e => {
      if (e.target.closest('img')) {
        e.preventDefault();
      }
    };
    document.addEventListener('contextmenu', preventImageContextMenu);
    return () => document.removeEventListener('contextmenu', preventImageContextMenu);
  }, []);

  return (
    <>
      <Nav />
      {/* Keyed by language: switching remounts every container, so each one re-renders (and replays its intro) in the new language. */}
      <BorderGlowGroup key={lang} className="bento-page">
        <SidebarRail />
        <div className="main-grid">
          <StatusCard />
          <MapCard />
          <ProjectStackCard />
          <ApiStatusCard />
          <WeatherCard />
          <ActivityCard />
          <FolderCard />
          <ThemeToggleCard />
          <DevProjectsCard />
          <SocialsCard />
          <EngineeringProjectsCard />
          <ChatCard />
          <ToolsCard />
        </div>
      </BorderGlowGroup>
    </>
  );
}
