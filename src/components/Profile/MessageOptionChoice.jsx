import { useState } from 'react';
import Message from './Message';
import MessageByPlace from './Message/MessageByPlace';
import OptionChoice from './Message/OptionChoice';

function MessageOptionChoice() {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <>
      {!selectedOption ? (
        <OptionChoice setSelectedOption={(value) => setSelectedOption(value)} />
      ) : selectedOption === 'user' ? (
        <Message isProvider onBack={() => setSelectedOption(null)} />
      ) : (
        <MessageByPlace onBack={() => setSelectedOption(null)} />
      )}
    </>
  );
}

export default MessageOptionChoice;
