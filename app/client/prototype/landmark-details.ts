// Landmark detail content for HERO-01 click-to-expand panels.
// Day 3 placeholder copy — refine in Day 4 review with real itinerary data.

export type LandmarkDetail = {
  id: string;
  emotionLine: string;
  intro: string;
  food: { name: string; tag: string }[];
  culture: string[];
  infra: { icon: string; label: string }[];
};

export const LANDMARK_DETAILS: Record<string, LandmarkDetail> = {
  beijing: {
    id: "beijing",
    emotionLine: "六百年皇城，每一块砖都听过故事。",
    intro:
      "故宫、天坛、长城、胡同 —— 北京是中国历史最厚的城市。我们带你避开人满为患的午门主路，走西六宫的清晨光线，登慕田峪长城看晨雾散开。",
    food: [
      { name: "全聚德烤鸭", tag: "百年老字号" },
      { name: "护国寺小吃", tag: "豆汁焦圈" },
      { name: "南锣鼓巷炸酱面", tag: "老北京味" },
      { name: "牛街白记水盆羊肉", tag: "回民街早餐" },
    ],
    culture: ["明清皇家", "胡同文化", "京剧 798", "建都史 3000 年"],
    infra: [
      { icon: "✈", label: "首都/大兴双机场" },
      { icon: "🚄", label: "高铁 2h 通沪" },
      { icon: "🏨", label: "国贸/王府井酒店圈" },
      { icon: "💳", label: "外卡/支付宝/微信" },
    ],
  },
  shanghai: {
    id: "shanghai",
    emotionLine: "外滩夜色把过去和未来同时点亮。",
    intro:
      "上海是中国最国际化的入境门户。外滩 1844 年起的万国建筑群对望陆家嘴金融天际线，新天地的石库门巷弄里藏着私房菜馆。半天行程也能看到三个时代。",
    food: [
      { name: "和平饭店老年爵士酒吧", tag: "外滩夜生活" },
      { name: "鼎泰丰小笼", tag: "经典上海点心" },
      { name: "大壶春生煎", tag: "本帮小吃" },
      { name: "豫园南翔馒头", tag: "百年老店" },
    ],
    culture: ["万国建筑博览", "海派文化", "石库门民居", "现代艺术"],
    infra: [
      { icon: "✈", label: "浦东/虹桥双机场" },
      { icon: "🚄", label: "虹桥高铁 4h 通京" },
      { icon: "🏨", label: "外滩/新天地酒店圈" },
      { icon: "💳", label: "全境支付兼容" },
    ],
  },
  xian: {
    id: "xian",
    emotionLine: "兵马俑沉默两千两百年，等你走近。",
    intro:
      "西安是十三朝古都。除了兵马俑和华清池，城墙骑行夜跑、回民街市井早餐、大唐芙蓉园灯会才是当地人日常。我们安排错峰参观，让你独享俑坑的呼吸感。",
    food: [
      { name: "回民街羊肉泡馍", tag: "西北经典" },
      { name: "永兴坊毛笔酥", tag: "新派伴手礼" },
      { name: "biangbiang 面", tag: "陕西特色" },
      { name: "肉夹馍", tag: "国民小吃" },
    ],
    culture: ["秦汉兵马俑", "唐长安城", "回民街", "丝路起点"],
    infra: [
      { icon: "✈", label: "咸阳国际机场" },
      { icon: "🚄", label: "高铁 6h 通京/沪" },
      { icon: "🏨", label: "钟楼 / 城墙根酒店" },
      { icon: "💳", label: "全境支付兼容" },
    ],
  },
  zhangjiajie: {
    id: "zhangjiajie",
    emotionLine: "悬空山就这样飘在你眼前。",
    intro:
      "阿凡达取景地，三千座石英砂岩柱直插云霄。天门山玻璃栈道悬崖、武陵源金鞭溪徒步、土家族民俗村寨，一次看尽。深秋红叶最佳，避开五一/十一峰值。",
    food: [
      { name: "土家三下锅", tag: "山区炖菜" },
      { name: "湘西腊肉", tag: "烟熏年货" },
      { name: "酸萝卜", tag: "土家小吃" },
      { name: "桑植白茶", tag: "本地茶饮" },
    ],
    culture: ["土家族民俗", "阿凡达地理", "武陵源世遗", "湘西巫傩"],
    infra: [
      { icon: "✈", label: "荷花/大庸机场" },
      { icon: "🚌", label: "景区直通巴士" },
      { icon: "🏨", label: "武陵源 / 索溪谷山庄" },
      { icon: "💳", label: "支付宝/微信" },
    ],
  },
  guilin: {
    id: "guilin",
    emotionLine: "漓江一段山水，一段宋元山水画。",
    intro:
      "桂林山水甲天下，阳朔山水甲桂林。漓江竹筏、银子岩溶洞、龙脊梯田、十里画廊骑行 —— 我们用 4 天给你讲清这片喀斯特地貌怎么活了千年。",
    food: [
      { name: "桂林米粉", tag: "卤水绝活" },
      { name: "啤酒鱼", tag: "阳朔西街" },
      { name: "马蹄爽", tag: "本地饮品" },
      { name: "荔浦芋扣肉", tag: "宴席主菜" },
    ],
    culture: ["山水诗画", "壮瑶民族", "象鼻山图腾", "梯田农耕"],
    infra: [
      { icon: "✈", label: "两江国际机场" },
      { icon: "🛶", label: "漓江竹筏专线" },
      { icon: "🏨", label: "阳朔西街民宿" },
      { icon: "💳", label: "支付宝/微信" },
    ],
  },
  chengdu: {
    id: "chengdu",
    emotionLine: "熊猫和火锅，两件事就够留住你。",
    intro:
      "大熊猫繁育研究基地清晨投喂、宽窄巷子掏耳朵、人民公园老茶馆、青城山道家清晨。成都是中国生活节奏最慢的大城市，给紧凑行程一个「不走」的留白日。",
    food: [
      { name: "大龙燚火锅", tag: "麻辣经典" },
      { name: "钟水饺", tag: "早晨小吃" },
      { name: "蛋烘糕", tag: "街头小食" },
      { name: "三大炮", tag: "锦里景区" },
    ],
    culture: ["大熊猫保育", "三国文化", "川剧变脸", "盖碗茶馆"],
    infra: [
      { icon: "✈", label: "天府/双流双机场" },
      { icon: "🚄", label: "高铁 3h 通昆/重" },
      { icon: "🏨", label: "春熙路 / 太古里酒店" },
      { icon: "💳", label: "全境支付兼容" },
    ],
  },
  hangzhou: {
    id: "hangzhou",
    emotionLine: "断桥残雪，三潭印月，名字本身就是诗。",
    intro:
      "西湖十景每个时辰光线不同。雷峰塔夕照、灵隐寺晨钟、龙井村摘茶、宋城千古情演出。半小时车程到乌镇水乡，一日往返足矣。",
    food: [
      { name: "西湖醋鱼", tag: "宋代名菜" },
      { name: "龙井虾仁", tag: "茶香入菜" },
      { name: "东坡肉", tag: "苏东坡传世" },
      { name: "片儿川", tag: "杭州拉面" },
    ],
    culture: ["宋元诗画", "龙井茶道", "梁祝白蛇", "丝绸博物馆"],
    infra: [
      { icon: "✈", label: "萧山国际机场" },
      { icon: "🚄", label: "高铁 1h 通沪" },
      { icon: "🏨", label: "西湖周边精品酒店" },
      { icon: "💳", label: "全境支付兼容" },
    ],
  },
  dunhuang: {
    id: "dunhuang",
    emotionLine: "鸣沙山下，月牙泉静卧两千年不干涸。",
    intro:
      "莫高窟 735 个洞窟壁画讲尽佛教东传史。鸣沙山骆驼、雅丹地貌日落、玉门关汉长城遗址。最佳季节 5-10 月，避开冬季封窟期。",
    food: [
      { name: "驴肉黄面", tag: "丝路第一面" },
      { name: "杏皮水", tag: "解暑必备" },
      { name: "羊肉粉汤", tag: "西北早餐" },
      { name: "敦煌酿皮", tag: "凉拌小吃" },
    ],
    culture: ["丝绸之路", "莫高窟壁画", "汉唐边塞诗", "雅丹地貌"],
    infra: [
      { icon: "✈", label: "莫高国际机场" },
      { icon: "🐫", label: "鸣沙山骆驼专线" },
      { icon: "🏨", label: "敦煌山庄 / 沙漠营地" },
      { icon: "💳", label: "支付宝/微信" },
    ],
  },
  lhasa: {
    id: "lhasa",
    emotionLine: "布达拉宫的金顶，要慢慢呼吸才看得清。",
    intro:
      "拉萨海拔 3650 米，建议先在西宁 / 林芝过夜适应。布达拉宫、大昭寺、八廓街转经、纳木措湖、羊湖一日往返。冬季少人但温度低，4-6 月最佳。",
    food: [
      { name: "藏式酥油茶", tag: "高原必备" },
      { name: "牦牛肉饺子", tag: "藏式午餐" },
      { name: "糌粑", tag: "传统主食" },
      { name: "甜茶馆", tag: "藏族日常" },
    ],
    culture: ["藏传佛教", "唐蕃和亲史", "唐卡艺术", "格萨尔史诗"],
    infra: [
      { icon: "✈", label: "贡嘎国际机场" },
      { icon: "🚄", label: "拉日 / 拉林高铁" },
      { icon: "🏨", label: "圣地天堂洲际" },
      { icon: "💊", label: "高原医疗保障" },
    ],
  },
  lijiang: {
    id: "lijiang",
    emotionLine: "古城屋瓦下，纳西东巴的字还在呼吸。",
    intro:
      "丽江古城世遗、玉龙雪山蓝月谷、虎跳峡徒步、束河古镇民宿、泸沽湖摩梭族走婚文化。云南南北跨度大，建议 5-7 天串联大理 / 香格里拉。",
    food: [
      { name: "纳西烤鱼", tag: "古城特色" },
      { name: "鸡豆凉粉", tag: "云南小吃" },
      { name: "丽江粑粑", tag: "早餐主食" },
      { name: "酥油茶", tag: "高原暖饮" },
    ],
    culture: ["纳西东巴文", "茶马古道", "摩梭走婚", "雪山祭祀"],
    infra: [
      { icon: "✈", label: "三义国际机场" },
      { icon: "🚄", label: "高铁通昆明" },
      { icon: "🏨", label: "古城客栈 / 雪山酒店" },
      { icon: "💳", label: "支付宝/微信" },
    ],
  },
};
