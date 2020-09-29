import React, { PureComponent } from 'react';
import ReactResizeObserver from 'rc-resize-observer';
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
  disabled?: boolean;
  style?: React.CSSProperties;
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

  startValue = 0;

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
    const { value, defaultValue } = this.props;
    this.calcDistanceValue();

    this.sliderRef.current!.addEventListener('touchstart', this.onMoveStart);
    this.sliderRef.current!.addEventListener('mousedown', this.onMoveStart);

    // rerender component if slider value is controlled,because first render can't get the dom node
    const stateValue = value ?? defaultValue;
    if (stateValue !== undefined) {
      this.startValue = stateValue;
      this.forceUpdate();
    }
  }

  componentWillUnmount() {
    this.sliderRef.current?.removeEventListener('touchstart', this.onMoveStart);
    this.sliderRef.current?.removeEventListener('mousedown', this.onMoveStart);

    this.removeWindowEventHandler();
  }

  static getDerivedStateFromProps(props: SliderProps, state: SliderState) {
    if ('value' in props) {
      return { ...state, value: props.value };
    }
    return null;
  }

  addWindowEventHandler = () => {
    window.addEventListener('touchmove', this.onMove);
    window.addEventListener('touchend', this.onMoveEnd);

    window.addEventListener('mousemove', this.onMove);
    window.addEventListener('mouseup', this.onMoveEnd);
  };

  removeWindowEventHandler = () => {
    window.removeEventListener('touchmove', this.onMove);
    window.removeEventListener('touchend', this.onMoveEnd);

    window.removeEventListener('mousemove', this.onMove);
    window.removeEventListener('mouseup', this.onMoveEnd);
  };

  calcDistanceValue = () => {
    if (!this.sliderRef.current) throw new Error(`can't get slider element`);
    const { max, min, step } = this.props;
    const { width } = this.sliderRef.current.getBoundingClientRect();
    this.maxDistance = width;
    this.stepDistance = (width / (max - min)) * step;
  };

  getOffset = (value: number) => {
    const { min, max } = this.props;
    const percent = (value - min) / (max - min);
    return clamp(percent * this.maxDistance, 0, this.maxDistance);
  };

  onMoveStart = (event: TouchEvent | MouseEvent) => {
    const { pageX } = (event as TouchEvent).touches?.[0] || (event as MouseEvent);
    const { value } = this.state;
    this.startValue = value;
    this.startPos = pageX;
    this.setState({ focus: true });
    if (document.scrollingElement)
      (document.scrollingElement as HTMLElement).style.overflow = 'hidden';
    this.addWindowEventHandler();
  };

  onMove = (event: TouchEvent | MouseEvent) => {
    const { focus, value: oldValue } = this.state;
    if (!focus) return;
    const { pageX } = (event as TouchEvent).touches?.[0] || (event as MouseEvent);
    const { min, max, step } = this.props;
    const distance = pageX - this.startPos;
    const value = clamp(
      Math.floor(distance / this.stepDistance) * step + this.startValue,
      min,
      max,
    );

    if (oldValue === value) return;

    const shouldTriggerChange = value % step === 0;

    if (shouldTriggerChange) {
      const isNotControlled = !('value' in this.props);
      if (isNotControlled) this.setState({ value });

      // trigger onChange
      const { onChange } = this.props;
      onChange?.(value);
    }
  };

  onMoveEnd = () => {
    const { value, focus } = this.state;
    if (!focus) return;
    this.setState({ focus: false });
    const { onAfterChange } = this.props;
    if (onAfterChange) onAfterChange(value);
    if (document.scrollingElement) (document.scrollingElement as HTMLElement).style.overflow = '';
    this.removeWindowEventHandler();
  };

  render() {
    const { className, disabled, style } = this.props;
    const { value, focus } = this.state;

    const prefixCls = this.context.getPrefixCls('slider');
    const classes = classNames(
      prefixCls,
      {
        [`${prefixCls}-disabled`]: disabled,
      },
      className,
    );

    const handleCls = classNames(`${prefixCls}-handle`, {
      [`${prefixCls}-handle-focus`]: focus,
    });

    const offset = this.getOffset(value);

    return (
      <ReactResizeObserver
        onResize={() => {
          this.calcDistanceValue();
          this.forceUpdate();
        }}
      >
        <div
          className={classes}
          style={{ ...style, backgroundPositionX: `${offset}px` }}
          ref={this.sliderRef}
        >
          <div
            className={handleCls}
            ref={this.sliderHandleRef}
            style={{ transform: `translate(${offset}px,-50%)` }}
          />
        </div>
      </ReactResizeObserver>
    );
  }
}

export default Slider;
