import React from 'react'; 
import { FlexContainerProps } from 'utils/types';

const Flex: React.FC<FlexContainerProps> = ({ children, style }) => {
  return <div className="flex-container" style={style}>{children}</div>;
};

export default Flex;
