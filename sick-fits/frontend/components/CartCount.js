import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';

const DotStyles = styled.div`
  background: var(--red);
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  line-height: 2rem;
  max-width: 3rem;
  margin-left: 1rem;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`;

const AnimationStyles = styled.span`
  position: relative;
  .count {
    display: block;
    position: relative;
    transition: transform 0.4s;
    backface-visibility: hidden;
  }
  .count-enter {
    transform: scale(4) rotateX(0.5turn);
  }
  .count-enter-active {
    transform: rotateX(0turn);
  }
  .count-exit {
    top: 0;
    position: absolute;
    transform: rotateX(0turn);
  }
  .count-exit-active {
    transform: scale(4) rotateX(0.5turn);
  }
`;

export default function CartCount({ count }) {
  return (
    <AnimationStyles>
      <TransitionGroup>
        <CSSTransition
          unmountOnExit
          classNames="count"
          className="count"
          key={count}
          timeout={{ enter: 400, exit: 400 }}
        >
          <DotStyles>{count}</DotStyles>
        </CSSTransition>
      </TransitionGroup>
    </AnimationStyles>
  );
}
