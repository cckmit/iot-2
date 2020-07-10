import Mock from 'mockjs';
Mock.mock('/api/region', 'get', {
    isSuccess: true,
    bl: true,
    data: {
        rows: [
            {
                Name: '杭州市',
                Id: "A",
            },
            {
                Name: '宁波市',
                Id: "B",
            },
            {
                Name: "鄞州区",
                Id: "B1",
                ParentId: "B"
            },
            {
                Name: "江北区",
                Id: "B2",
                ParentId: "B"
            },
            {
                Name: "北仑区",
                Id: "B3",
                ParentId: "B"
            },
            {
                Name: "中和街道",
                Id: "B1_1",
                ParentId: "B1"
            },
            {
                Name: "钟公庙街道",
                Id: "B1_2",
                ParentId: "B1"
            },
            {
                Name: "南裕街道",
                Id: "B1_3",
                ParentId: "B1"
            }
        ],
        total: 100,
    }
})