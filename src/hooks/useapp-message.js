import { useContext } from 'react';
import { MessageStateContext } from '../contexts/provider/MessageProvider';

export const useMessageState = () => useContext(MessageStateContext);
