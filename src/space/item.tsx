import React from 'react';

export interface SpaceItemProps {
  className: string;
}

const SpaceItem: React.FC<SpaceItemProps> = ({ className, children }) => {
  if (children === null || children === undefined) {
    return null;
  }
  return <div className={className}>{children}</div>;
};

export default SpaceItem;
