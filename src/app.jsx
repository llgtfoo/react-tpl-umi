import { PageLoading } from '@ant-design/pro-layout';
import { history } from 'umi';
export const initialStateConfig = {
  loading: <PageLoading />,
};

export async function getInitialState() {
  return {};
}
//渲染之前做权限校验，
export function render(oldRender) {
  oldRender();
}
