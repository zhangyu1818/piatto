import React, { PureComponent } from 'react';
import classNames from 'classnames';
import clamp from 'lodash/clamp';
import { ConfigContext } from '../config-provider';

import './index.less';

export interface SliderProps {
  min: number;
  max: number;
  step: number;
  defaultValue?: number;
  value?: number;
  onChange?: (value: number) => void;
  className?: string;
}

interface SliderState {
  value: number;
  focus: boolean;
}

class Slider extends PureComponent<SliderProps, SliderState> {
  static contextType = ConfigContext;

  // refs
  sliderRef = React.createRef<HTMLDivElement>();
  sliderHandleRef = React.createRef<HTMLDivElement>();

  steps = 0;
  maxDistance = 0;
  onceStepDistance = 0;
  stepsNum = 0;
  prevValue = 0;
  startPos = 0;

  constructor(props: SliderProps) {
    super(props);
    const { defaultValue = 0, value } = this.props;
    this.state = {
      value: value ?? defaultValue,
      focus: false,
    };
  }

  componentDidMount() {
    const { max, min, step } = this.props;
    this.steps = (max - min) / step;
    if (!this.sliderRef.current) throw new Error(`can't get slider element`);
    const { width } = this.sliderRef.current.getBoundingClientRect();
    this.maxDistance = width;
    this.onceStepDistance = width / this.steps;

    this.sliderRef.current.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  }

  componentWillUnmount() {
    this.sliderRef.current?.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  }

  getOffset = (value: number) => {
    const { min, max, step } = this.props;
    const percent = (value - min) / (max - min);
    const offset = clamp(percent * this.maxDistance, 0, this.maxDistance);
    this.stepsNum = (value - min) / step;
    return offset;
  };

  onMouseDown = ({ pageX }: MouseEvent) => {
    this.startPos = pageX;
    this.setState({ focus: true });
  };

  onMouseMove = ({ pageX }: MouseEvent) => {
    if (!this.state.focus) return;
    const distance = pageX - this.startPos + this.prevValue;
    this.stepsNum = Math.floor(distance / this.onceStepDistance);
    this.setState({ value: this.stepsNum });
  };

  onMouseUp = () => {
    const { value } = this.state;
    this.prevValue = value;
    this.setState({ focus: false });
  };

  render() {
    const { className } = this.props;
    const { value, focus } = this.state;

    const prefixCls = this.context.getPrefixCls('slider');
    const classes = classNames(prefixCls, className);

    const handleCls = classNames(`${prefixCls}-handle`, {
      [`${prefixCls}-handle-focus`]: focus,
    });

    const offset = this.getOffset(value);

    return (
      <div className={classes} style={{ backgroundPositionX: `${offset}px` }} ref={this.sliderRef}>
        <div
          className={handleCls}
          ref={this.sliderHandleRef}
          style={{ transform: `translateX(${offset}px)` }}
        />
      </div>
    );
  }
}

export default Slider;
