import Mock from 'mockjs';

// 模拟行情数据
Mock.mock('/api/dashboard/market', 'get', () => {
  return {
    code: 200,
    data: {
      kline: Mock.mock({
        'list|30': [{
          'date': '@date("yyyy-MM-dd")',
          'value': '@float(1000, 2000, 2, 2)',
        }]
      }).list,
      assets: [
        { name: '股票', value: 450000 },
        { name: '债券', value: 300000 },
        { name: '现金', value: 100000 },
        { name: '衍生品', value: 150000 },
      ]
    }
  };
});

// 模拟用户数据
Mock.mock('/api/system/users', 'get', () => {
  return {
    code: 200,
    data: Mock.mock({
      'list|10': [{
        'id': '@id',
        'name': '@cname',
        'email': '@email',
        'role': '@pick(["分析师", "管理员", "风控"])',
        'status': '@pick([1, 0])',
      })
    }).list
  };
});

export default Mock;
