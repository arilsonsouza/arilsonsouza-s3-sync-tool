import styled from 'styled-components';

export const BucketSelectorContainer = styled.div`
  width: 100%;
  position: relative;
  display: inline-block;
  &:before {
    content: '';
    height: calc(36 - 5px);
    position: absolute;
    /* right: 7px; */
    /* top: 3px; */
    /* width: 22px; */

    //background: -webkit-linear-gradient(#fff, #f0f0f0);
    //background: -moz-linear-gradient(#fff, #f0f0f0);
    //background: linear-gradient(#f5f5f5, #e0e0e0);
    /* background: #fff; //for Firefox in Android */

    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    pointer-events: none;
    display: block;
  }
  &:after {
    content: ' ';
    position: absolute;
    right: 15px;
    top: 46%;
    margin-top: -3px;
    z-index: 2;
    pointer-events: none;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6.9px 4px 0 4px;
    border-color: #aaa transparent transparent transparent;
    pointer-events: none;
  }
  select {
    width: 100%;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 0 1.875rem 0 0.625rem;

    border: 1px solid #e0e0e0;
    border-radius: 3px;
    line-height: 36px;
    height: 36px;
    //box-shadow: inset 1px 1px 1px 0px rgba(0, 0, 0, 0.2);
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) => theme.backgrounds.lighter};
    //min-width: 200px;
    font-size: 1.2rem;
    margin: 0 5px 5px 0;
  }

  //fix for ie 10 later
  select::-ms-expand {
    display: none;
  }

  option {
    &:hover {
      background: ${({ theme }) => theme.colors.purpleDark};
    }
  }
`;
