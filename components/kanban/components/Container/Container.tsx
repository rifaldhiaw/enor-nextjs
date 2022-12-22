import classNames from "classnames";
import React, { forwardRef } from "react";

import { Handle, Remove } from "../Item";

import Styles from "./Container.module.css";

export interface Props {
  children: React.ReactNode;
  columns?: number;
  label?: string;
  style?: React.CSSProperties;
  horizontal?: boolean;
  hover?: boolean;
  handleProps?: React.HTMLAttributes<any>;
  scrollable?: boolean;
  shadow?: boolean;
  placeholder?: boolean;
  unstyled?: boolean;
  onClick?(): void;
  onRemove?(): void;
}

export const Container = forwardRef<HTMLDivElement, Props>(
  (
    {
      children,
      columns = 1,
      handleProps,
      horizontal,
      hover,
      onClick,
      onRemove,
      label,
      placeholder,
      style,
      scrollable,
      shadow,
      unstyled,
      ...props
    }: Props,
    ref
  ) => {
    const Component = onClick ? "button" : "div";

    return (
      <Component
        {...props}
        // @ts-ignore
        ref={ref}
        style={
          {
            ...style,
            "--columns": columns,
          } as React.CSSProperties
        }
        className={classNames(
          Styles.Container,
          unstyled && Styles.unstyled,
          horizontal && Styles.horizontal,
          hover && Styles.hover,
          placeholder && Styles.placeholder,
          scrollable && Styles.scrollable,
          shadow && Styles.shadow
        )}
        onClick={onClick}
        tabIndex={onClick ? 0 : undefined}
      >
        {label ? (
          <div className={Styles.Header}>
            {label}
            <div className={Styles.Actions}>
              {onRemove ? <Remove onClick={onRemove} /> : undefined}
              <Handle {...handleProps} />
            </div>
          </div>
        ) : null}
        {placeholder ? children : <ul>{children}</ul>}
      </Component>
    );
  }
);
