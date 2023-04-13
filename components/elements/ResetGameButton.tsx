import React, { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import buttonBaseStyles from '@/styles/elements/ButtonBase.module.scss';

export type ResetGameButtonProps = {
  resetCards: () => void;
};

export default function ResetGameButton(
  props: ResetGameButtonProps
): ReactElement {
  return (
    <button
      id="resetGameButton"
      className={buttonBaseStyles.buttonBase}
      onClick={props.resetCards}
    >
      <FontAwesomeIcon icon={faRotateLeft} data-testid="reset" />
    </button>
  );
}
