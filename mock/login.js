const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

let userInfo = {};

export default {
  //登录接口
  'POST /api/login': async (req, res) => {
    const { password, username, type } = req.body;
    await waitTime(1000);
    if (password === '123456' && username === 'admin') {
      userInfo = {
        status: 'ok',
        type,
        currentAuthority: 'admin',
        token: 'brear lkkdkdkfkkfkffkfkfk',
        userName: 'llgtfoo',
        avatar:
          'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        userId: '00000001',
        email: 'llgtfoo@163.com',
        access: 'admin',
      };
      res.send({
        status: 'ok',
        data: { ...userInfo },
        message: '登录成功',
        success: true,
      });
      return;
    } else {
      userInfo = {};
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
  //判断是不是登录状态
  'GET /api/isLoginState': (req, res) => {
    if (Object.keys(userInfo).length <= 0) {
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
      data: { ...userInfo },
    });
  },
  //获取用户信息
  'GET /api/currentUserInfo': (req, res) => {
    if (Object.keys(userInfo).length <= 0) {
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
      data: { ...userInfo },
    });
  },
  //退出登录
  'POST /api/login/outLogin': (req, res) => {
    userInfo = {};
    res.send({
      data: { message: '退出登录!' },
      success: true,
    });
  },
};
