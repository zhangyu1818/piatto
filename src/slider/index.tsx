import React, { PureComponent } from 'react';
import classNames from 'classnames';
import clamp from 'lodash/clamp';
import { ConfigContext } from '../config-provider';

export interface SliderProps {
  min: number;
  max: number;
  step: number;
  defaultValue?: number;
  value?: number;
  onChange?: (value: number) => void;
  onAfterChange?: (value: number) => void;
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

  maxDistance = 0;

  stepDistance = 0;

  prevValue = 0;

  // record start position each click
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
    const { max, min, step, value, defaultValue } = this.props;
    if (!this.sliderRef.current) throw new Error(`can't get slider element`);
    const { width } = this.sliderRef.current.getBoundingClientRect();
    this.maxDistance = width;
    this.stepDistance = width / (max - min) / step;

    this.sliderRef.current.addEventListener('touchstart', this.onTouchStart);
    window.addEventListener('touchmove', this.onTouchMove);
    window.addEventListener('touchend', this.onTouchEnd);

    // rerender component if slider value is controlled,because first render can't get the dom node
    const stateValue = value ?? defaultValue;
    if (stateValue !== undefined) {
      this.prevValue = stateValue;
      this.forceUpdate();
    }
  }

  componentWillUnmount() {
    this.sliderRef.current?.removeEventListener('touchstart', this.onTouchStart);
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('touchend', this.onTouchEnd);
  }

  static getDerivedStateFromProps(props: SliderProps, state: SliderState) {
    if ('value' in props) {
      return { ...state, value: props.value };
    }
    return null;
  }

  getOffset = (value: number) => {
    const { min, max } = this.props;
    const percent = (value - min) / (max - min);
    return clamp(percent * this.maxDistance, 0, this.maxDistance);
  };

  onTouchStart = ({ touches }: TouchEvent) => {
    const { pageX } = touches[0];
    const { value } = this.state;
    this.prevValue = value;
    this.startPos = pageX;
    this.setState({ focus: true });
    if (document.scrollingElement)
      (document.scrollingElement as HTMLElement).style.overflow = 'hidden';
  };

  onTouchMove = ({ touches }: TouchEvent) => {
    const { focus } = this.state;
    if (!focus) return;
    const { pageX } = touches[0];
    const { min, max } = this.props;
    const distance = pageX - this.startPos;
    const value = clamp(Math.floor(distance / this.stepDistance) + this.prevValue, min, max);
    this.setState({ value });
    // trigger onChange
    const { onChange } = this.props;
    if (onChange) onChange(value);
  };

  onTouchEnd = () => {
    const { value, focus } = this.state;
    if (!focus) return;
    this.setState({ focus: false });
    const { onAfterChange } = this.props;
    if (onAfterChange) onAfterChange(value);
    if (document.scrollingElement) (document.scrollingElement as HTMLElement).style.overflow = '';
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
          style={{ transform: `translate(${offset}px,-50%)` }}
        />
      </div>
    );
  }
}

export default Slider;