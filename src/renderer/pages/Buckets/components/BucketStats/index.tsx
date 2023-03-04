import { useEffect, useState } from 'react';
import { ArrowsClockwise } from 'phosphor-react';
import { BucketType } from '../../types';
import {
  BucketInfoContainer,
  BucketInfoContent,
  BucketInfoHeader,
  BucketStatsContainer,
  BucketStatsItem,
} from './styles';

type BucketStatsProps = {
  bucket: BucketType;
};

export function BucketStats({ bucket }: BucketStatsProps) {
  const [selectedBucket, setSelectedBucket] = useState<BucketType>(
    {} as BucketType
  );
  const [loading, setLoading] = useState(false);

  function parseBucketStats(bucketStats: string): string[] {
    return bucketStats.split('\n\n').pop().split(/\s+/);
  }
  useEffect(() => {
    setSelectedBucket(bucket);
  }, [bucket]);

  function getBucketStats() {
    setLoading(true);
    window.electron.ipcRenderer.on(
      's3-bucket-stats-stdout',
      (result: string) => {
        if (result) {
          const parsedBucketStats = parseBucketStats(result);

          const totalObjects = Number(parsedBucketStats[2]);
          const totalSize = `${parsedBucketStats[5]} ${parsedBucketStats[6]}`;
          setSelectedBucket((state) => ({
            ...state,
            totalObjects,
            totalSize,
          }));
          setLoading(false);
        }
      }
    );

    window.electron.ipcRenderer.sendMessage('s3-bucket-stats', bucket.name);
  }

  function handleGetStats() {
    getBucketStats();
  }

  return (
    <BucketStatsContainer>
      {loading ? (
        <span>Carregando...</span>
      ) : (
        <BucketInfoContainer>
          <BucketInfoHeader>
            <strong>Informações do Bucket</strong>
            <button
              type="button"
              onClick={handleGetStats}
              disabled={!bucket.name}
            >
              <ArrowsClockwise size={32} />
            </button>
          </BucketInfoHeader>
          <BucketInfoContent>
            <BucketStatsItem>
              <span>→</span>
              <strong>Total de Objetos: {selectedBucket.totalObjects}</strong>
            </BucketStatsItem>
            <BucketStatsItem>
              <span>→</span>
              <strong>Tamanho total: {selectedBucket.totalSize}</strong>
            </BucketStatsItem>
          </BucketInfoContent>
        </BucketInfoContainer>
      )}
    </BucketStatsContainer>
  );
}
