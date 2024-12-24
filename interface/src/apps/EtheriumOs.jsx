import { Layout } from 'antd';
import AppRouter from '@/router/AppRouter';

export default function EtheriumOs() {
  const { Content } = Layout;

  return (
    <Layout>
      <Content>
        <AppRouter />
      </Content>
    </Layout>
  );
}
