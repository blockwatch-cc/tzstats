import React from 'react';
import styled from 'styled-components';
import { FlexRow } from './index';
import { formatCurrency, formatValue } from '../../utils';

//Todo refactoring
const DataBox = ({ value, title, valueType, type = '', valueSize = '18px', titleSize = '10px', mw }) => {
  switch (type) {
    case 'title-bottom':
      return (
        <Wrapper mw={mw} fontSize={valueSize}>
          {title && (valueType && !value) ? (
            <Title fontSize={titleSize}>
              <Value type={valueType} value={title} />
            </Title>
          ) : (
            <Title fontSize={titleSize}>{title}</Title>
          )}
          {value && <Value type={valueType} value={value} />}
        </Wrapper>
      );
    case 'value-as-title':
      return (
        <Wrapper mw={mw} fontSize={valueSize}>
          {title}
          {value && (
            <Title fontSize={titleSize}>
              <Value type={valueType} value={value} />
            </Title>
          )}
        </Wrapper>
      );
    case 'horizontal-value-as-title':
      return (
        <Wrapper mw={mw} fontSize={valueSize}>
          <FlexRow justifyContent="space-between">
            {<div>{title}</div>}
            {value && (
              <Title fontSize={titleSize}>
                <Value type={valueType} value={value} />
              </Title>
            )}
          </FlexRow>
        </Wrapper>
      );

    default:
      return (
        <Wrapper mw={mw} fontSize={valueSize}>
          {value && <Value type={valueType} value={value} />}
          {title && <Title fontSize={titleSize}>{title}</Title>}
        </Wrapper>
      );
  }
};

const Value = ({ type, value }) => {
  if (value && typeof value !== 'string') {
    switch (type) {
      case 'currency-fixed':
        return formatCurrency(Math.round(value), ',');
      case 'currency-short':
        return formatCurrency(value, '.4s');
      case 'currency-full':
        return formatCurrency(value, ',');
      case 'currency-usd-full':
        return formatValue(value, '$,');
      case 'currency-usd-fixed':
        return formatValue(value.toFixed(2), '$,');
      case 'currency-usd-short':
        return '$' + formatValue(Math.round(value), '.2s');
      case 'value-short':
        return formatValue(Math.round(value), '.2s');
      case 'percent':
        return value * 100 < 1 ? '< 1%' : value * 100 > 99 ? '99%' : formatValue(value, '.0%');
      default:
        return formatValue(Math.round(value), ',');
    }
  }
  return value;
};

const Wrapper = styled.div`
  font-size: ${props => props.fontSize};
  min-width: ${props => (props.mw ? props.mw : 'min-content')}px;
`;
const Title = styled.div`
  color: rgba(255, 255, 255, 0.52);
  font-size: ${props => props.fontSize};
`;

export default DataBox;
