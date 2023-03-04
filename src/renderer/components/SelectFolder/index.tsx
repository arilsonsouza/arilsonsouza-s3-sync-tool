import { CheckCircle, Folder } from 'phosphor-react';
import { useState } from 'react';
import { Button } from '../Button';
import { SelectFolderContainer } from './styles';

type SelectFolderProps = {
  text: string;
  // eslint-disable-next-line no-unused-vars
  onSelectFolder: (selectedFolder: string) => void;
};
export function SelectFolder({ text, onSelectFolder }: SelectFolderProps) {
  const [selectedFolder, setSelectedFolder] = useState('');

  function selectFolder() {
    window.electron.ipcRenderer.on('dialog:openFolder', (folder) => {
      if (typeof folder !== 'undefined') {
        setSelectedFolder(folder);
        onSelectFolder(folder);
      }
    });
    window.electron.ipcRenderer.sendMessage('dialog:openFolder', []);
  }
  return (
    <SelectFolderContainer>
      <Button onClick={() => selectFolder()}>
        <Folder size={32} />
        {text}
      </Button>
      <span>
        {selectedFolder.length ? (
          <>
            {selectedFolder} <CheckCircle size="1.2rem" />
          </>
        ) : (
          'Nenhuma pasta selecionada'
        )}
      </span>
    </SelectFolderContainer>
  );
}
