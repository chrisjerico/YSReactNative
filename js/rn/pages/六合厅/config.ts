import { UGUserCenterType } from "../../redux/model/全局/UGSysConfModel"

const config = {
  "preferences": [
    {
      "gameId": "1",
      "title": "重庆时时彩",
      "selected": false,
      "logo": "cqssc",
      "gameType": "cqssc",
      "des": "全天59期"
    },
    {
      "gameId": "2",
      "title": "七星彩",
      "selected": false,
      "logo": "qxc",
      "gameType": "qxc",
      "des": "全天59期"
    },
    {
      "gameId": "3",
      "title": "PK10牛牛",
      "selected": false,
      "logo": "pk10nn",
      "gameType": "pk10nn",
      "des": "全天59期"
    },
    {
      "gameId": "6",
      "title": "福彩3D",
      "selected": true,
      "logo": "fc3d",
      "gameType": "fc3d",
      "des": "全天59期"
    },
    {
      "gameId": "12",
      "title": "大乐透",
      "selected": true,
      "logo": "dlt",
      "gameType": "dlt",
      "des": "全天59期"
    },
    {
      "gameId": "55",
      "title": "幸运飞艇",
      "selected": false,
      "logo": "xyft",
      "gameType": "xyft",
      "des": "全天180期"
    },
    {
      "gameId": "50",
      "title": "北京赛车(PK10)",
      "selected": true,
      "logo": "bjpk10",
      "gameType": "pk10",
      "des": "全天44期"
    },
    {
      "gameId": "66",
      "title": "pc蛋蛋",
      "selected": true,
      "logo": "pcdd",
      "gameType": "pcdd",
      "des": "全天179期"
    },
    {
      "gameId": "70",
      "title": "香港六合彩",
      "selected": true,
      "logo": "lhc",
      "gameType": "lhc",
      "des": "一周开三期"
    },
    {
      "gameId": "",
      "title": "长龙资讯",
      "selected": true,
      "logo": "clzx",
      "gameType": "clzx",
      "des": "长龙助手"
    },
    {
      "gameId": "",
      "title": "开奖网",
      "selected": true,
      "logo": "lmzs",
      "gameType": "lmzs",
      "des": "开奖网"
    },
    {
      "gameId": "",
      "title": "红包",
      "selected": true,
      "logo": "hongbao",
      "gameType": "hongbao",
      "des": "抢红包"
    }
  ],
  "bottomTools": [
    {
      "logo": "data:image/png;base64,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",
      "userCenterType": UGUserCenterType.在线客服
    },
    {
      "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOYAAAB0CAMAAACmGr7BAAAAolBMVEVMaXHr6+vr6+vr6+vr6+vr6+vr6+vi4uLr6+vr6+v///9ChfTr6+uGsfhmZmb+qkfMzMytra319fXR4v2FhYXb6P19q/ikxvqzzvvx9v6Vu/np8f64uLhZlPVKivVzc3PE2fz/+vOOtvn6+vt0pfejo6OPj4//8N7/2q/y8vJpnveZmZn+xYG70/vCwsL/6Mz+t2P+sFPW1tZOh+lljNOfsdcWfeBJAAAACnRSTlMA1yHYn2BE/MkP+Rv84QAABIBJREFUeNrt221XqkwUgOHq6ME24z4wkq8IKqIpamWd///Xnj2ASUCGjXUeprk/uKa3tbrWniErucp202y0DKZARqvRvLkqr9liqyAAJQqCFWs1S5C/r1cBKFWwuv6dQ942EqRq0MbtG2WLg5Lx1m1G+YuDovFft7lZqj7PBgeF4430GrsCpVsl19vrAJQuuBbK5goUb9UkZisAxQta9DyWgfKxm2TPqr9rGwEoX9BIjqb6h9OAH5BxxeAHxDRTMzVTMzXzXzG3c8+s0Lh9V2PmYG5Wrldf5sfKtSdmORbLfl2Z2w+VHbgzzTlAl9beoF7M6sP0AGAstms/HmdNmd7HBzKgia9Ho7VJtWvKNM+rW2dmv1OhWd2ZE6jUuubMO6jUUDNrzuz0j83W63W7X9IkqDcz6LUrNRzUmrltV6xXa+awXbVaM2c/i9mB9xsNVWEO4VRbZaY5ghP11Dmbvfeb6UuQZv4fmb1OoZ56zBmUNJRnGgZUznZYjZihkxQSMkIfuAgoZhVikMnF8ELMUaHLb1oHkxyLVpHBUWSJaWEhG6hXtO+/LiWYo7ZnFupe/hJkI+cWCWx0DQCOCztCKztNB7PT5FgS/zRzNDZLmldVDs9hQsLkYFucVhYxM/k+ZOI091yOBLP9zr9NKtb5DJOMRSa5ckzIJcP0Ela+dSXkbAJnMG07Ootp55JgjkzKI26h0dqj5hPBmXted1ASwDlM6gRTTDqbtcdcewukmDMoaxsfUugQ05P/k1fMK9u0PG2HLj8EcbRwMeIi143fK8UkS1m99EN3/VN/2ZM9mxyLvU7Z8J0E56ALIMEcmKL2dlKo5yVM6iuZYKf5iIvDmkHc3vfTFSenDBPG5sl61ZjylyCGjr+AbNxG37V2gr1wHERXhtk/qfRG1ZjylyAX3RD3b5h4yKFCmqcEE4anlB0oMOUvQcwuYS7QMPDtOPfiCREnLY8VvhQTOrPuMS/xjbui3gDg4mczQh9xl2daGIlP2UGhAxP4BX9D6cTOdeqDizNDAzFy0coxuY+GePQZHOV2EmK6sCSYRWdeOZ0On5+f29Njn2UyF9F2DQjF8YzsCI3jlnWTmTo88wW57Asy4W6cVU43f0ranC9lETqIuBAyfwEcQzwexRBDiHMzTmYlIaYLJsM8HSnLeoRz8xGd0EY7trjEtPkBxJ1EmTqN8rNJfRnz4c873cOZuTsjfd669x0QTEjb+UJ5dPrutzPvE9QDLR6n0w3t1uXj55hUwrTRNzJMtsi5SL0wiOscQnxdul/KFFtUwO7JCxs55g4XDDLMMH47G48wzDCpb2FSS9q9GxLSw1RmmtxisEvF7ECHfMV3fdfZFLanp+QhYar1EgvylfU0VYtZ/nPzcQlqMQm6XP59eXn5u7yPx/iwpJR+XdADKROhykxybpb6VV6aqZmaqZmaqZmaqZmqMWc1ZnqVv/eBV+O7iubmWfVVu+OvWH3u+JMdZ1/fjavvrdZ3ymumZmqmZmqmZmqmZmqmZmqmZmqmZmqmZmqmZmrmh8wf0X8MhGiIbjHSkwAAAABJRU5ErkJggg==",
      "userCenterType": UGUserCenterType.聊天室
    },
    {
      "logo": "data:image/png;base64,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",
    }
  ],
  "moreLottery": [
    {
      "gameId": "",
      "gameType": "more",
      "title": "更多彩种",
      "des": "好挣好玩",
      "logo": "gdcz",
      "selected": true
    }
  ],
  "profileButtons": [
    {
      "title": "我要充值",
      "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAhFBMVEVMaXH///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8NoezaAAAAK3RSTlMAeT33/kvu+xYCyvIFcim3iKIK1pvrOIIewd5UqV6wWDNm0I4SCETmTpXF+M2xIAAAAT5JREFUeNqN0OeWgyAUBOARjIItxmhM73Xn/d9vj0ZM2UX9/nEY7gD413XsyWN8QZ+UtUCh24aNMbotaQh8y+5O6qyeVQlbJb6NWXGP8RlnwdYD3wI2wtu2c+KOrSKa0tjfFT7p16Y7E6lTntZTl5NzGMaRbWSOhtpka5KLOd4Jl43jahOXZbxLNHCo7yLwMpP8o3jMclbCGYy5xy6hadcLdvvRqMWsSJ9WG1QudfEpyia0WWqo1Sqtr66BTNJGwPy0VwXt5SfQSHWU02oBtryQdjdwGDk86HKQAgEHCaByyQEmAOZr9jsAgHLZx1eobNlnjFoi2WOEJ6f3zcaEna4wos7kAm8cn1YC7/ZBz5NbI0vO3Q8MbmEJetNCknJpBia2oAMg0u1yjW+CNak+zvkJ/sj9qviAJ1V3hzGefgGcsK0Pe5ychwAAAABJRU5ErkJggg==",
      "userCenterType": UGUserCenterType.存款
    },
    {
      "title": "我要提现",
      "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAclBMVEVMaXH///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+MC121AAAAJXRSTlMAERYCuoH9qt1mj0qYXr3N73npC6D6n+EvprEe8jfFVdU+rQOGYAGmhQAAANdJREFUeNrN0+cKwzAMRtHPaZw6e4+me+j9X7EBle7KhlLo/SXwQRiDIae2XWU8yM3W5SagqVJSXrqo6JL/CR3XOg/oVlt/WFXQU/HLqv0ppzclD2oZHgp6X3+vRiO0xC8amrlDuoYhpw4gt1qQYz+H39/Rl2Gx8blISTCPj7gmwI6ZFWaTi6MotsIBaGiqscAdkPKUynABjDyNMkyAjKdMgHysedIybBWUoSmjZEgR4CV9n3jWB9+Cs8JA13bIVV0ZcnuGDmlXuPrzz8Vw5eZ2CAsHFuTDGVr2omSvHclzAAAAAElFTkSuQmCC",
      "userCenterType": UGUserCenterType.取款
    },
    {
      "title": "资金明细",
      "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAkFBMVEVMaXH///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+X6JXfAAAAL3RSTlMAqtfdtOK77zNmDgb+di76S/U9pQqfFESU8jjJA68bjFzpKmvCYVWZfHIl0kiDt2iWfhMAAAGuSURBVHjazZTZbqswEEAnTgwUs4SdEgIJ2UPb+f+/62AHcAvct0r3SIxt6djjRQP0HEyegc49YB5MsX1EDhoNIp5hioeEDSNbGvO/FuN/i6IESbhGolbizey5KJFRDGqpSg9zJUbYc1Iil4MLECi5Vd3UcjWKIYX2Ja5GcQfkfJbrQczFGZ1L5cjBZhTxCoUHLg4EjQifkOBE9OswzB0cOT6Kjw1OxGX+Xvw6vU1x2UTcwSypr4uqO4swf4vO3Zoh3P8v17OMGT2uB3cf6OJxsxpgL+0UAwj67O0o8hQ0Enm1FYTRkZZIChjFFehcOy9O96hwInsQ3wv9Pc6Ut0pbVMhZUlSqOeB0pQC0XmJFiDer6y2d2owzWTMfiAVwym4tiBFEXZJKcFY25jtiviC6QOcNtZ8BG0S+fnGUlSwoPLIsKwWFO2LwEk1PuxwH8SAo7AzDiFMKLW0D+j1prLvU/GfqduZlLB9x373OzXVdYVOgfg39NRo9Z/IwsAtV5Halyr4BnOcOkWy3B9nksCQGT3uHA4YA4Atmm9qJgxI/Jw8KtmCyJ3g5C3xWN0B8A0vxrdroB81PAAAAAElFTkSuQmCC",
      "userCenterType": UGUserCenterType.资金明细
    }
  ]
}

export default config