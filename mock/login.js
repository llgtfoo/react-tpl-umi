const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

let access = null;

//获取用户状态
const getAccess = () => {
  return access;
};
export default {
  //登录接口
  'POST /api/login': async (req, res) => {
    const { password, username, type } = req.body;
    await waitTime(1000);
    if (password === '123456' && username === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
        token: 'brear lkkdkdkfkkfkffkfkfk',
      });
      access = 'admin';
      return;
    } else if (password === '123456' && username === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
        token: 'brear lkkdkdkfkkfqkffkfkfk',
      });
      access = 'user';
      return;
    } else {
      res.send({
        data: {
          status: 'noOk',
          message: '用户名或密码错误！',
        },
        success: true,
      });
      return;
    }
  },
  //获取用户信息
  'GET /api/currentUserInfo': (req, res) => {
    if (!getAccess()) {
      res.status(401).send({
        data: {
          isLogin: false,
        },
        errorCode: '401',
        errorMessage: '请先登录！',
        success: true,
      });
      return;
    }
    res.send({
      success: true,
      data: {
        userName: 'llgtfoo',
        avatar:
          'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        userId: '00000001',
        email: 'llgtfoo@163.com',
        access: getAccess(),
      },
    });
  },
  'POST /api/login/outLogin': (req, res) => {
    access = '';
    res.send({
      data: { message: '退出登录!' },
      success: true,
    });
  },
};
