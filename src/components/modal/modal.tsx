import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';
import {createPortal} from 'react-dom';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { TModalProps } from '../../services/types/modal-types';
import { useEffect, FC, MouseEvent } from 'react';

const Modal: FC<TModalProps> = ({header, children, modalClose}) => {
    const modalRoot = document.getElementById('modal') as HTMLElement;

    const modalClick = (event: MouseEvent<HTMLElement>): void  => {
      event.stopPropagation();
    }

    const modalKeyDown = (event: KeyboardEvent): void => {
      if(event.key == 'Escape') {
        modalClose();
      }
    }

    useEffect(()=> {
      document.addEventListener('keydown', modalKeyDown);
      return () => {
        document.removeEventListener('keydown', modalKeyDown);
      }
    }, []);

    return createPortal(
        <>
          <ModalOverlay modalClose={modalClose}>
            <div className={'p-10 ' + styles.modalWindow} onClick={modalClick} data-element="modal">
                <header className={styles.modalHeader}>
                    <span className="text text_type_main-large">{header}</span>
                    <CloseIcon type="primary" onClick={() => modalClose()}/>
                </header>
                <section className="modalContent">
                    {children}
                </section>
            </div>
          </ModalOverlay>
        </>,
        modalRoot
      );
}

export default Modal;