import React from 'react';
import './Button.css';

const Button = ({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  block = false,
  className = '',
  children,
  ...props
}) => {
  const classes = ['ui-button', `ui-button--${variant}`, `ui-button--${size}`];
  if (block) {
    classes.push('ui-button--block');
  }
  if (className) {
    classes.push(className);
  }

  return (
    <Component className={classes.join(' ')} {...props}>
      {children}
    </Component>
  );
};

export default Button;


