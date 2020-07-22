import Mock from 'mockjs';
const baseApi = '/api/govShow';

const mockList = [
    //#region 通用接口
    {
        //获取登录用户信息和行政区划选项,刷新时间
        url: `${baseApi}?optionType=location`,
        method: 'get',
        data: {
            "rows": {
                "ProjectList": null,
                "RegionList": [
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
                "CodeList": null,
                "StartTime": null,
                "EndTime": null,
                "Id": "00000000-0000-0000-0000-000000000000",
                "Name": "管理员",
                "Account": null,
                "HeadIcon": null,
                "ContactTel": null,
                "LocationCode": null,
                "LocationName": "浙江省",
                "TopName": "浙江省",
                "X": null,
                "Y": null,
                "Description": null,
                "EnabledMark": null,
                "DeleteMark": null,
                "SortCode": null,
                "CreateTime": null,
                "CreateUserId": null,
                "CreaterUserName": null,
                "ModifyTime": null,
                "ModifyUserId": null,
                "ModifyUserName": null,
                "LocationLevel": 0,
                "ZoomLevel": 0,
                "IsSelect": false
            }
        }
    },
    {
        //获取整体状体
        url: `${baseApi}?optionType=status`,
        method: 'get',
        data:
            Mock.mock({
                'businessCount|1-200': 1,
                'equipmentCount|1-9999': 1,
                'placeCount|1-999': 1,
            })
    },
    {
        //获取天气
        url: `${baseApi}?optionType=weather`,
        method: 'get',
        data: {
            "reason": "查询成功",
            "result": {
                "data": {
                    "realtime": {
                        "city_code": "101210401",
                        "city_name": "宁波",
                        "date": "2020-07-22",
                        "time": "10:00:00",
                        "week": "3",
                        "moon": "六月初二",
                        "dataUptime": 1595383622,
                        "weather": Mock.mock({
                            "temperature|16-40": 1,
                            "humidity": "65",
                            "info": Mock.mock('@pick(["多云", "晴","多云转晴","雾天","大雨","小雪","中雪","大雪"])'),
                            "img": "01"
                        }),
                        "wind": {
                            "direct": "南风",
                            "power": "3级",
                            "offset": "",
                            "windspeed": ""
                        }
                    },
                    "life": {
                        "date": "2020-07-22",
                        "info": {
                            "kongtiao": [
                                "部分时间开启",
                                "您将感到些燥热，建议您在适当的时候开启制冷空调来降低温度，以免中暑。"],
                            "guomin": [
                                "极不易发",
                                "天气条件极不易诱发过敏，可放心外出，享受生活。"],
                            "shushidu": [
                                "很不舒适",
                                "白天天气晴好，但烈日炎炎您会感到很热，很不舒适。"],
                            "chuanyi": [
                                "炎热",
                                "天气炎热，建议着短衫、短裙、短裤、薄型T恤衫等清凉夏季服装。"],
                            "diaoyu": [
                                "不宜",
                                "天气太热，不适合垂钓。"],
                            "ganmao": [
                                "少发",
                                "各项气象条件适宜，发生感冒机率较低。但请避免长期处于空调房间中，以防感冒。"],
                            "ziwaixian": [
                                "弱",
                                "紫外线强度较弱，建议出门前涂擦SPF在12-15之间、PA+的防晒护肤品。"],
                            "xiche": [
                                "较适宜",
                                "较适宜洗车，未来一天无雨，风力较小，擦洗一新的汽车至少能保持一天。"],
                            "yundong": [
                                "较不宜",
                                "天气较好，但风力较强，在户外要选择合适的运动，另外考虑到天气炎热，建议停止高强度运动。"],
                            "daisan": [
                                "不带伞",
                                "天气较好，不会降水，因此您可放心出门，无须带雨伞。"]
                        }
                    },
                    "weather": [
                        {
                            "date": "2020-07-22",
                            "info": {
                                "dawn": [
                                    "1",
                                    "多云",
                                    "26",
                                    "南风",
                                    "3-5级",
                                    "18:54"],
                                "day": [
                                    "1",
                                    "多云",
                                    "36",
                                    "南风",
                                    "3-5级",
                                    "05:06"],
                                "night": [
                                    "1",
                                    "多云",
                                    "26",
                                    "南风",
                                    "4-5级",
                                    "18:53"]
                            },
                            "week": "三",
                            "nongli": "六月初二"
                        },
                        {
                            "date": "2020-07-23",
                            "info": {
                                "dawn": [
                                    "1",
                                    "多云",
                                    "26",
                                    "南风",
                                    "4-5级",
                                    "18:53"],
                                "day": [
                                    "2",
                                    "阴",
                                    "38",
                                    "西风",
                                    "4-5级",
                                    "05:07"],
                                "night": [
                                    "1",
                                    "多云",
                                    "26",
                                    "西北风",
                                    "3-5级",
                                    "18:53"]
                            },
                            "week": "四",
                            "nongli": "六月初三"
                        },
                        {
                            "date": "2020-07-24",
                            "info": {
                                "dawn": [
                                    "1",
                                    "多云",
                                    "26",
                                    "西北风",
                                    "3-5级",
                                    "18:53"],
                                "day": [
                                    "4",
                                    "雷阵雨",
                                    "28",
                                    "西风",
                                    "4-5级",
                                    "05:07"],
                                "night": [
                                    "0",
                                    "晴",
                                    "21",
                                    "西风",
                                    "3-5级",
                                    "18:52"]
                            },
                            "week": "五",
                            "nongli": "六月初四"
                        },
                        {
                            "date": "2020-07-25",
                            "info": {
                                "dawn": [
                                    "0",
                                    "晴",
                                    "21",
                                    "西风",
                                    "3-5级",
                                    "18:52"],
                                "day": [
                                    "1",
                                    "多云",
                                    "31",
                                    "持续无风向",
                                    "微风",
                                    "05:08"],
                                "night": [
                                    "21",
                                    "小到中雨",
                                    "23",
                                    "持续无风向",
                                    "微风",
                                    "18:52"]
                            },
                            "week": "六",
                            "nongli": "六月初五"
                        },
                        {
                            "date": "2020-07-26",
                            "info": {
                                "dawn": [
                                    "21",
                                    "小到中雨",
                                    "23",
                                    "持续无风向",
                                    "微风",
                                    "18:52"],
                                "day": [
                                    "7",
                                    "小雨",
                                    "30",
                                    "东南风",
                                    "3-5级",
                                    "05:09"],
                                "night": [
                                    "2",
                                    "阴",
                                    "23",
                                    "南风",
                                    "3-5级",
                                    "18:51"]
                            },
                            "week": "日",
                            "nongli": "六月初六"
                        }],
                    "f3h": {
                        "temperature": [
                            {
                                "jg": "20200722080000",
                                "jb": "32"
                            },
                            {
                                "jg": "20200722110000",
                                "jb": "33"
                            },
                            {
                                "jg": "20200722140000",
                                "jb": "36"
                            },
                            {
                                "jg": "20200722170000",
                                "jb": "33"
                            },
                            {
                                "jg": "20200722200000",
                                "jb": "28"
                            },
                            {
                                "jg": "20200722230000",
                                "jb": "28"
                            },
                            {
                                "jg": "20200723020000",
                                "jb": "27"
                            },
                            {
                                "jg": "20200723050000",
                                "jb": "26"
                            },
                            {
                                "jg": "20200723080000",
                                "jb": "30"
                            }],
                        "precipitation": [
                            {
                                "jg": "20200722080000",
                                "jf": "0"
                            },
                            {
                                "jg": "20200722110000",
                                "jf": "0"
                            },
                            {
                                "jg": "20200722140000",
                                "jf": "0"
                            },
                            {
                                "jg": "20200722170000",
                                "jf": "0"
                            },
                            {
                                "jg": "20200722200000",
                                "jf": "0"
                            },
                            {
                                "jg": "20200722230000",
                                "jf": "0"
                            },
                            {
                                "jg": "20200723020000",
                                "jf": "0"
                            },
                            {
                                "jg": "20200723050000",
                                "jf": "0"
                            },
                            {
                                "jg": "20200723080000",
                                "jf": "0"
                            }]
                    },
                    "pm25": {
                        "pm25": {
                            "level": 1,
                            "quality": "优",
                            "des": "空气很棒，快出门呼吸新鲜空气吧。",
                            "curPm": "20",
                            "pm25": "11",
                            "pm10": "20",
                            "pub_time": 1595379600,
                            "city_code": "101210401"
                        },
                        "cityName": "宁波",
                        "key": "宁波",
                        "dateTime": "2020年07月22日09时"
                    },
                    "jingqu": "",
                    "jingqutq": "",
                    "date": "",
                    "isForeign": "0",
                    "partner": {
                        "title_word": "全国",
                        "show_url": "tianqi.so.com",
                        "base_url": "http://tianqi.so.com/weather/101210401"
                    }
                }
            },
            "error_code": 0
        },
    },
    //#endregion


    //#region 地图

    {
        //获取街道/镇列表
        url: `${baseApi}?optionType=town`,
        method: 'get',
        data: {
        }
    },
    {
        //地图--街道/镇-->地图点点击-->街道/镇详情
        url: `${baseApi}?optionType=town`,
        method: 'get',
        data: {
        }
    },
    {
        //地图--街道/镇-->地图点点击-->异常列表
        url: `${baseApi}?optionType=townwarninglist`,
        method: 'get',
        data: {
        }
    },
    {
        //获取场所列表
        url: `${baseApi}?optionType=placelist`,
        method: 'get',
        data: {
        }
    },
    {
        //地图--场所-->地图点点击-->场所详情
        url: `${baseApi}?optionType=place`,
        method: 'get',
        data: {
        }
    },
    {
        //地图--场所-->地图点点击-->案件列表
        url: `${baseApi}?optionType=placewarninglist`,
        method: 'get',
        data: {
        }
    },
    //#endregion


    //#region 单位
    {
        //单位-单位运行情况(原report1)
        url: `${baseApi}?optionType=customerOperation`,
        method: 'get',
        data: {
            rows: [
                { status: "仅报警", count: 56, progress: 0.5, aaa: 12 },
                { status: "仅故障", count: 26, progress: 0.7, aaa: 32 },
                { status: "报警且故障", count: 16, progress: 0.3, aaa: 20 },
            ]
        }
    },
    {
        //单位-单位年度运行情况(原report1)
        url: `${baseApi}?optionType=customerOperationYear`,
        method: 'get',
        data: {
        }
    },
    {
        //单位-单位年度运行情况--饼图点击-->单位预警情况(原businesslist)
        url: `${baseApi}?optionType=businesslist`,
        method: 'get',
        data: {
        }
    },
    {
        //单位-单位年度运行情况--文本点击-->案件列表(原recordlist)
        url: `${baseApi}?optionType=recordlist`,
        method: 'get',
        data: {
        }
    },
    //#endregion


    //#region 行业
    {
        //行业-各行业单位数占比(原report2)
        url: `${baseApi}?optionType=industryCustomerRate`,
        method: 'get',
        data: {
        }
    },
    {
        //行业-行业运行趋势图(原report2)
        url: `${baseApi}?optionType=industryCustomerOperation`,
        method: 'get',
        data: {
        }
    },
    {
        //行业-各行业单位数占比--饼图点击-->行业详情--头部信息
        url: `${baseApi}?optionType=industryInfo`,
        method: 'get',
        data: {
        }
    },
    {
        //行业-各行业单位数占比--饼图点击-->行业详情--企业信息(分页)
        url: `${baseApi}?optionType=industryCustomerList`,
        method: 'get',
        data: {
        }
    },
    //#endregion


    //#region 设备
    {
        //设备-各类设备数量占比(原report3)
        url: `${baseApi}?optionType=equipmentCategoryRate`,
        method: 'get',
        data: {
        }
    },
    {
        //设备-各类设备在线率(原report3)
        url: `${baseApi}?optionType=equipmentCategoryOnlineRate`,
        method: 'get',
        data: {
        }
    },
    {
        //设备-各类设备运行趋势图(原report3)
        url: `${baseApi}?optionType=equipmentCategoryOperation`,
        method: 'get',
        data: {
        }
    },
    {
        //设备-各类设备数量占比--饼图点击-->设备列表
        url: `${baseApi}?optionType=equipmentlist`,
        method: 'get',
        data: {
        }
    },
    //#endregion


    //#region 场所搜索
    {
        //场所搜索
        url: `${baseApi}?optionType=placelist`,
        method: 'get',
        data: {
        }
    }
    //#endregion
]

mockList.forEach(i => {
    const { url, method, data } = i;

    Mock.mock(url, method, {
        isSuccess: true,
        bl: true,
        data
    })
})