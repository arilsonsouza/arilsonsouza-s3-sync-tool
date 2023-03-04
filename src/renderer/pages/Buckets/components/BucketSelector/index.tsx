import { useEffect, useState } from 'react';
import { BucketType } from '../../types';
import { BucketSelectorContainer } from './styles';

type BucketSelectorProps = {
  // eslint-disable-next-line no-unused-vars
  onSelectBucket: (bucket: BucketType) => void;
};
export function BucketSelector({ onSelectBucket }: BucketSelectorProps) {
  const [loading, setLoading] = useState(false);
  const [buckets, setBuckets] = useState<BucketType[]>([]);

  function getBuckets() {
    setLoading(true);
    window.electron.ipcRenderer.on('s3-ls-stdout', (bucketInfo: string) => {
      const loadedBuckets = bucketInfo
        .split('\n')
        .map((bucketString: string) => {
          const [date, hour, name] = bucketString.split(' ');
          const bucket: BucketType = {
            name,
            dateModified: `${date} ${hour}`,
          };
          return bucket;
        });

      setBuckets(loadedBuckets);
      setLoading(false);
    });

    window.electron.ipcRenderer.sendMessage('s3-ls', []);
  }

  useEffect(() => {
    getBuckets();
  }, []);

  function handleBucketChange(bucketName: string) {
    const selectedBucket = buckets.find((bucket) => bucket.name === bucketName);
    if (selectedBucket) {
      onSelectBucket(selectedBucket);
    }
  }

  return (
    <BucketSelectorContainer>
      <select onChange={(evt) => handleBucketChange(evt.target.value)}>
        <option value="" disabled selected>
          {loading ? 'Carregando...' : 'Selecione um Bucket S3'}
        </option>
        {buckets.map(({ name, dateModified }) => (
          <option value={name} key={`${name}-${dateModified}`}>
            {name}
          </option>
        ))}
      </select>
    </BucketSelectorContainer>
  );
}
