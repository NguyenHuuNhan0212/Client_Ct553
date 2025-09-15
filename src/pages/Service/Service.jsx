import { Button } from 'antd';
import { useState } from 'react';
import userApi from '../../apis/userService';

function Services() {
  const [info, setInfo] = useState(' Khoong co');
  const handleClick = async () => {
    const res = await userApi.getUserById();
    setInfo(res.fullName);
  };
  return (
    <div>
      <div>{info}</div>
      <Button onClick={() => handleClick()}>Hello</Button>
    </div>
  );
}

export default Services;
