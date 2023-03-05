import { useEffect, useState } from 'react';
import { animateScroll } from 'react-scroll';
import { CaretDown, CaretUp, CloudArrowUp } from 'phosphor-react';
import { Button } from 'renderer/components/Button';
import {
  BucketSyncContainer,
  BucketSyncHeader,
  ConsoleOutputContainer,
  ProgressBarContainer,
  ProgressBarStatus,
} from './styles';
import { BucketType } from '../../types';

type BucketSyncProps = {
  bucket: BucketType;
  selectedFolder: string;
};

export function BucketSync({ bucket, selectedFolder }: BucketSyncProps) {
  const [showOutput, setShowOutput] = useState(true);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  function toggleOutput() {
    setShowOutput((state) => !state);
  }

  function scrollToBottom() {
    animateScroll.scrollToBottom({ containerId: 'consoleOutput' });
  }

  function updateConsoleOutput(output: string) {
    setConsoleOutput((state) => [...state, output]);
  }

  function toggleUploadingState() {
    setUploading((state) => !state);
  }

  function parseCode(code: number) {
    return code === 0 ? 'Transfer complete.' : 'Failure';
  }

  function updateProgressBar(data: string) {
    const dataString = data.toString();

    let ratio = 0;
    if (dataString.length && uploadProgress !== 100) {
      const dataArray = data.split(/\s+/);
      const index = dataArray.indexOf('Completed');
      if (index >= 0) {
        const currentAmount = dataArray[index + 1];
        let totalAmount = dataArray[index + 2];

        totalAmount = totalAmount.split('/')[1].replace('~', '');

        ratio = Math.round((+currentAmount / +totalAmount) * 100);
      }
    }

    setUploadProgress(ratio);
  }

  function syncBucket() {
    toggleUploadingState();
    setUploadProgress(0);
    const startMessage = `Starting upload - folder: ${selectedFolder}`;
    updateConsoleOutput(startMessage);

    const syncArgs = ['s3', 'sync', `${selectedFolder}`, `s3://${bucket.name}`];
    window.electron.ipcRenderer.on('s3-bucket-sync-stdout', (data: string) => {
      updateConsoleOutput(data);
      updateProgressBar(data);
    });

    window.electron.ipcRenderer.on('s3-bucket-sync-stderr', (data: string) => {
      updateConsoleOutput(data);
    });

    window.electron.ipcRenderer.on('s3-bucket-sync-close', (code) => {
      const parsedCode = parseCode(code);
      updateConsoleOutput(parsedCode);
      toggleUploadingState();
    });

    window.electron.ipcRenderer.sendMessage('s3-bucket-sync', syncArgs);
  }

  useEffect(() => {
    scrollToBottom();
  }, [consoleOutput]);

  return (
    <BucketSyncContainer>
      <BucketSyncHeader>
        <Button
          disabled={!selectedFolder.length || uploading}
          onClick={syncBucket}
        >
          <CloudArrowUp size={32} /> Sincronizar
        </Button>
        <Button onClick={toggleOutput}>
          {showOutput ? 'Ocultar' : 'Mostrar'} saída do console
          {showOutput ? <CaretUp size="1rem" /> : <CaretDown size="1rem" />}
        </Button>
      </BucketSyncHeader>

      {uploading && (
        <ProgressBarContainer>
          <ProgressBarStatus progress={uploadProgress}>
            {uploadProgress}%
          </ProgressBarStatus>
        </ProgressBarContainer>
      )}
      <ConsoleOutputContainer isOpen={showOutput} id="consoleOutput">
        <ul>
          {consoleOutput.map((output, index) => (
            <li key={index}>
              <span>&#8594;</span> {output}
            </li>
          ))}
        </ul>
      </ConsoleOutputContainer>
    </BucketSyncContainer>
  );
}
