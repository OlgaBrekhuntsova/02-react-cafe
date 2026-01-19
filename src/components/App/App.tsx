import css from './App.module.css';
import CafeInfo from '../CafeInfo/CafeInfo';
import type { Votes, VoteType } from '../../types/votes';
import { useState } from 'react';
import VoteOptions from '../VoteOptions/VoteOptions';
import VoteStats from '../VoteStats/VoteStats';
import Notification from '../Notification/Notification';

function App() {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleVote = (type: VoteType) => {
    setVotes({ ...votes, [type]: votes[type] + 1 });
  };

  const resetVotes = () => {
    setVotes({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };
  const totalVotes = votes.good + votes.neutral + votes.bad;
  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions
        onVote={type => {
          handleVote(type);
        }}
        onReset={resetVotes}
        canReset={!!totalVotes}
      />
      {!!totalVotes && (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={
            totalVotes ? Math.round((votes.good / totalVotes) * 100) : 0
          }
        />
      )}
      {!totalVotes && <Notification />}
    </div>
  );
}

export default App;
