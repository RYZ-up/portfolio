import Folder from '../../ui/Folder/Folder.jsx';
import { folderImages } from '../../../data/projects.js';
import './FolderCard.css';

const FOLDER_COLOR = '#5F3FE0';

const folderItems = folderImages.map(src => (
  <img key={src} src={src} alt="" draggable={false} loading="lazy" decoding="async" />
));

export default function FolderCard() {
  return (
    <div className="cell-folder folder-decor-plain">
      <Folder color={FOLDER_COLOR} size={1.6} backWidthScale={1.55} items={folderItems} />
    </div>
  );
}
