import Footer from '../../components/Footer/Footer';
import FormAddPlace from '../../components/FormPlace/FormAddPlace';
import Header from '../../components/Header/Header';
import { Layout } from 'antd';
import bgGlobal from '../../assets/images/bgAddPlace.png';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const { Content } = Layout;
function AddPlace() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (!user && !token) {
      navigate('/login');
    }
  }, [navigate, user, token]);
  return (
    <>
      <Header />
      <Content
        style={{
          backgroundImage: `url(${bgGlobal})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          marginTop: -25
        }}
      >
        <FormAddPlace />
      </Content>
      <Footer />
    </>
  );
}

export default AddPlace;
