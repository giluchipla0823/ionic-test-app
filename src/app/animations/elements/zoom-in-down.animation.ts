import { createAnimation, Animation } from '@ionic/core';

export const animationZoomInDown = (
  baseEl: HTMLElement,
  duration: number = 900
): Animation => {
  return createAnimation()
    .addElement(baseEl)
    .direction('normal')
    .easing('cubic-bezier(0.55, 0.055, 0.675, 0.19)')
    .duration(duration)
    .keyframes([
      {
        offset: 0,
        opacity: 0,
        transform: 'scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0)',
      },
      {
        offset: 0.6,
        opacity: 1,
        transform: 'scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)',
      },
    ]);
};
