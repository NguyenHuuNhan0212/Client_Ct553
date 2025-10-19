import Footer from '../../components/Footer/Footer';
import FormAddPlace from '../../components/FormPlace/FormAddPlace';
import Header from '../../components/Header/Header';
import { Layout } from 'antd';
import bgGlobal from '../../assets/images/bgAddPlace.png';
const { Content } = Layout;
function AddPlace() {
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
