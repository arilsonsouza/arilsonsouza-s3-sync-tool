import { useState } from 'react';
import { SelectFolder } from 'renderer/components/SelectFolder';
import { BucketSelector } from './components/BucketSelector';
import { BucketStats } from './components/BucketStats';
import { BucketSync } from './components/BucketSync';
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
        </SyncFolderContainer>
      </SectionContainer>
      <SectionContainer>
        <BucketSync bucket={selectedBucket} selectedFolder={selectedFolder} />
      </SectionContainer>
    </BucketsContainer>
  );
}
