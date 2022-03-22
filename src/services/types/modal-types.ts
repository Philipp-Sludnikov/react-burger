export type TModalProps = {
  header?: string;
  modalClose: () => void;
}

export type TModalOverlayProps = Omit<TModalProps, 'header'> 