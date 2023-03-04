import { useState } from 'react';
import { BucketSelector } from './components/BucketSelector';
import { BucketStats } from './components/BucketStats';
import { BucketsContainer, SectionContainer } from './styles';
import { BucketType } from './types';

export function Buckets() {
  const [selectedBucket, setSelectedBucket] = useState<BucketType>(
    {} as BucketType
  );

  function onSelectBucket(bucket: BucketType) {
    setSelectedBucket(bucket);
  }

  return (
    <BucketsContainer>
      <h1>Buckets</h1>
      <BucketSelector onSelectBucket={onSelectBucket} />
      <SectionContainer>
        <BucketStats bucket={selectedBucket} />
      </SectionContainer>
      <SectionContainer>UPLOAD FOLDER</SectionContainer>
      <SectionContainer>CONSOLE OUTPUT</SectionContainer>
    </BucketsContainer>
  );
}
