import * as React from 'react'
import classNames from 'classnames'
import useConfig from '../hooks/useConfig'

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'normal' | 'large'
  align?: 'start' | 'center' | 'end'
  direction?: 'vertical' | 'horizontal'
}

const InternalSpace: React.ForwardRefRenderFunction<unknown, SpaceProps> = (props, ref) => {
  const {
    className,
    children,
    size = 'normal',
    align,
    direction = 'horizontal',
    ...restProps
  } = props

  const { getPrefixCls } = useConfig()
  const prefixCls = getPrefixCls('space')

  const classes = classNames(prefixCls, className, {
    [`${prefixCls}-gap-${size}`]: size,
    [`${prefixCls}-align-${align}`]: align,
    [`${prefixCls}-${direction}`]: direction,
  })

  return (
    <div ref={ref as any} className={classes} {...restProps}>
      {React.Children.map(children, (child) => (
        <div className={`${prefixCls}-item`}>{child}</div>
      ))}
    </div>
  )
}

const Space = React.forwardRef(InternalSpace)
Space.displayName = 'Space'

export default Space
