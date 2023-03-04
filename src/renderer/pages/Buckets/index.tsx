import { CloudArrowUp } from 'phosphor-react';
import { useState } from 'react';
import { Button } from 'renderer/components/Button';
import { SelectFolder } from 'renderer/components/SelectFolder';
import { BucketSelector } from './components/BucketSelector';
import { BucketStats } from './components/BucketStats';
import {
  BucketsContainer,
  SectionContainer,
  SyncFolderContainer,
} from './styles';
import { BucketType } from './types';

export function Buckets() {
  const [selectedBucket, setSelectedBucket] = useState<BucketType>(
    {} as BucketType
  );
  const [selectedFolder, setSelectedFolder] = useState('');

  function onSelectBucket(bucket: BucketType) {
    setSelectedBucket(bucket);
  }

  function onSelectFolder(folder: string) {
    setSelectedFolder(folder);
  }

  return (
    <BucketsContainer>
      <h1>Buckets</h1>
      <BucketSelector onSelectBucket={onSelectBucket} />
      <SectionContainer>
        <BucketStats bucket={selectedBucket} />
      </SectionContainer>
      <SectionContainer>
        <SyncFolderContainer>
          <SelectFolder
            text="Escolha a pasta de upload"
            onSelectFolder={onSelectFolder}
          />

          <Button disabled={!selectedFolder.length}>
            <CloudArrowUp size={32} /> Sincronizar
          </Button>
        </SyncFolderContainer>
      </SectionContainer>
      <SectionContainer>CONSOLE OUTPUT</SectionContainer>
    </BucketsContainer>
  );
}
