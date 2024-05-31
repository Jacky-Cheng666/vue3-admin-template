//用户信息数据
function createUserList() {
  return [
    {
      userId: 1,
      username: 'admin',
      status: 1,
      desc: '超级管理员',
      dept: '研发部',
      phonenumber: '15213357829',
      createTime: '2023-12-03 08:05:00',
    },
    {
      userId: 2,
      username: 'shop',
      status: 0,
      desc: '商品管理员',
      dept: '采购部',
      phonenumber: '13250214932',
      createTime: '2023-12-03 10:05:00',
    },
    {
      userId: 3,
      username: 'Tom',
      status: 0,
      desc: '汤姆',
      dept: '人事部',
      phonenumber: '13250214532',
      createTime: '2023-12-03 10:05:00',
    },
    {
      userId: 4,
      username: 'Jerry',
      status: 0,
      desc: '杰瑞',
      dept: '客服部',
      phonenumber: '18950214532',
      createTime: '2023-12-03 10:05:00',
    },
    {
      userId: 5,
      username: 'Linda',
      status: 0,
      desc: '琳达',
      dept: '客服部',
      phonenumber: '18950214532',
      createTime: '2023-12-03 10:05:00',
    },
  ];
}

export default [
  // 获取用户列表接口
  {
    url: '/api/user/list', //请求地址
    method: 'get', //请求方式
    response: () => {
      const data = createUserList();
      return { code: 200, rows: data, total: data.length };
    },
  },
];
