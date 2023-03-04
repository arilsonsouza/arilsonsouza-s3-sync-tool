import { useState } from 'react';
import { BucketSelector } from './components/BucketSelector';
import { BucketsContainer } from './styles';
import { BucketType } from './types';

export function Buckets() {
  const [selectedBucket, setSelectedBucket] = useState<BucketType>();

  function onSelectBucket(bucket: BucketType) {
    setSelectedBucket(bucket);
  }

  return (
    <BucketsContainer>
      <h1>Buckets</h1>
      <BucketSelector onSelectBucket={onSelectBucket} />
    </BucketsContainer>
  );
}
