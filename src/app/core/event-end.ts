import { InjectionToken, ValueProvider } from '@angular/core';

enum TransitionEvent {
  transition = 'transitionend',
  oTransition = 'oTransitionEnd',
  mozTransition = 'transitionend',
  webkitTransition = 'webkitTransitionEnd'
}

enum AnimationEvent {
  animation = 'animationend',
  oAnimation = 'oAnimationEnd',
  mozAnimation = 'animationend',
  webkitAnimation = 'webkitAnimationEnd'
}

interface EventEnd {
  transitionEnd: TransitionEvent;
  animationEnd: AnimationEvent;
}

const EVENT_END = new InjectionToken<EventEnd>('eventEnd');

function eventEnd(): EventEnd {
  const fakeElement: HTMLElement = document.createElement('fake');
  const styleProperties: string[] = Object.keys(fakeElement.style);

  const transitionProperty = Object.keys(TransitionEvent)
    .find(t => styleProperties.some(p => p === t));
  const animationProperty = Object.keys(AnimationEvent)
    .find(a => styleProperties.some(p => p === a));

  let transitionEnd = TransitionEvent.transition;
  if (!transitionProperty) {
    transitionEnd = TransitionEvent[transitionProperty];
  }
  let animationEnd = AnimationEvent.animation;
  if (!animationProperty) {
    animationEnd = AnimationEvent[animationProperty];
  }
  const d = {
    transitionEnd,
    animationEnd
  };

  return {
    transitionEnd,
    animationEnd
  };
}

const EVENT_END_PROVIDER: ValueProvider = {
  provide: EVENT_END,
  useValue: eventEnd()
};

export {
  TransitionEvent,
  AnimationEvent,
  EventEnd,
  EVENT_END,
  EVENT_END_PROVIDER
};
