import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';

import { SizeType } from '../interface';
import useConfig from '../hooks/useConfig';
import SpaceItem from './item';

export interface SpaceProps extends HTMLAttributes<HTMLDivElement> {
  size?: SizeType;
}

const Space: React.FC<SpaceProps> = ({ children, className, size = 'normal', ...restProps }) => {
  const { getPrefixCls } = useConfig();

  const prefixCls = getPrefixCls('space');

  const childPrefixCls = getPrefixCls('space-item');

  const childrenNodes = React.Children.toArray(children);

  const classes = classNames(prefixCls, `${prefixCls}-${size}`, className);

  const renderNode = childrenNodes
    .filter(child => child !== null && child !== undefined)
    .map((child, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <SpaceItem key={`${childPrefixCls}-index-${index}`} className={childPrefixCls}>
        {child}
      </SpaceItem>
    ));

  return (
    <div className={classes} {...restProps}>
      {renderNode}
    </div>
  );
};

export default Space;
