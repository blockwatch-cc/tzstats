import React from 'react';
import styled from 'styled-components';
import { Card, DataBox, FlexRow, FlexRowSpaceBetween, CopyHashButton } from '../../Common';
import { HorizontalProgressBar } from '../../Common/ProgressBar';
import { proposals } from '../../../config/proposals';
import { convertMinutes, getShortHash } from '../../../utils';
import _ from 'lodash';

const ElectionProgress = ({ election }) => {
  let period = currentPeriod(election);
  let settings = getPeriodSettings(period);
  const endTime = getEndTime(period);

  let title = `${period.title} Period  ${endTime}`;
  return (
    <Wrapper>
      <Card title={title}>
        <FlexRowSpaceBetween>
          <DataBox value={period.turnout_rolls} />
          <DataBox value={period.eligible_rolls} />
        </FlexRowSpaceBetween>
        <HorizontalProgressBar settings={settings} />
        <FlexRowSpaceBetween>
          <DataBox title={`Participation Rolls ${((100 * period.turnout_rolls) / period.eligible_rolls).toFixed()}%`} />
          <DataBox title={`Maximum Rolls`} />
        </FlexRowSpaceBetween>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  min-width: 340px;
  margin: 0 5px;
`;
function getEndTime(period) {
  return period.is_open
    ? `ends in ${convertMinutes((new Date(period.period_end_time) - Date.now()) / 60000)}`
    : 'is completed';
}
function currentPeriod(election) {
  if (election.promotion_vote) {
    election.promotion_vote['title'] = 'Promotion';
    return election.promotion_vote;
  }
  if (election.testing) {
    election.testing['title'] = 'Testing';
    return election.testing;
  }
  if (election.testing_vote) {
    election.testing_vote['title'] = 'Exploration';
    return election.testing_vote;
  }
  if (election.proposal) {
    election.proposal['title'] = 'Proposal';
    return election.proposal;
  }
}
function getPeriodSettings(period) {
  return [
    {
      percent: (period.turnout_rolls / period.eligible_rolls) * 100,
      color: '#19f3f9',
      title: 'Participation Rolls',
      value: period.turnout_rolls,
    },
    {
      percent: ((period.eligible_rolls - period.turnout_rolls) / period.eligible_rolls) * 100,
      color: '#858999;',
      title: 'Maximum Rolls',
      value: period.eligible_rolls - period.turnout_rolls,
    },
  ];
}

export default ElectionProgress;