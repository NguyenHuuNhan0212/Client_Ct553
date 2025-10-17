import Footer from '../../components/Footer/Footer';
import FormAddPlace from '../../components/FormPlace/FormAddPlace';
import Header from '../../components/Header/Header';
import { Layout } from 'antd';
import bgGlobal from '../../assets/images/bgGlobal.svg';
const { Content } = Layout;
function AddPlace() {
  return (
    <>
      <Header />
      <Content
        style={{
          backgroundImage: `url(${bgGlobal})`,
          backgroundRepeat: 'no-repeat',
          marginTop: -25,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <FormAddPlace />
      </Content>

      <Footer />
    </>
  );
}

export default AddPlace;
