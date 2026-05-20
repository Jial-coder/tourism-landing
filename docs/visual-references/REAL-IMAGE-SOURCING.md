# 真实图替换指南 — Tourism Landing

本文件用于把 AI 生成的 mood-only 视觉参考图，**在客户视觉方向通过后**替换成真实摄影或合规图库素材。  
所有 `docs/visual-references/mood-only/` 下的图片都是 AI 图，仅做 Figma Make / 设计审稿参考，**不允许直接发布到对外网站。**

## 1. 替换原则

- 任何 hero / destination / advisor 镜头上线前必须替换为真实摄影。
- 真实摄影优先级：自家拍摄 > 合作摄影师授权 > 地方旅游局/官方授权 > 公开真实图库 (Unsplash / Pexels / Wikimedia 商用许可) > 付费图库 (Getty / Adobe Stock)。
- 替换后必须保留 `attribution.json` 记录来源与授权状态。
- 不允许把 AI 生成图当作“真实”素材以任何形式宣传服务能力。

## 2. mood-only 与正式素材目录

```
docs/visual-references/
  mood-only/                 # AI 视觉参考，禁止上线
    destinations/
    service/
    background/
  real/                      # 替换后的真实素材，准备上线用
    destinations/
    service/
    background/
  attribution.json           # 真实素材的来源与授权登记
```

## 3. 目的地素材替换清单

每个目的地至少 3 张候选，挑选时优先：自然光、真实地点细节、不刻意摆拍、不带 stock 笑脸、不带过度修饰。

### 3.1 张家界 Zhangjiajie

- 关键词：Wulingyuan, Zhangjiajie sandstone pillars, morning fog, Avatar Hallelujah Mountain
- 推荐来源：
  - 张家界市文化旅游广电体育局官网
  - Unsplash 关键词 `zhangjiajie`, `wulingyuan`
  - Wikimedia Commons CC-BY 类
- 验证点：石柱真实形态、植被颜色不偏荧光、晨雾不像后期合成。

### 3.2 桂林 Guilin

- 关键词：Li River, karst landscape, Yangshuo, bamboo raft, morning mist
- 推荐来源：
  - 桂林市文化广电和旅游局
  - Unsplash 关键词 `guilin`, `li river`, `yangshuo`
- 验证点：山形、河面竹筏比例真实、不要 HDR 假色。

### 3.3 九寨沟 Jiuzhaigou

- 关键词：Jiuzhaigou, alpine lake, turquoise water, Five Flower Lake, Nuorilang
- 推荐来源：
  - 九寨沟景区官方
  - Unsplash 关键词 `jiuzhaigou`
- 验证点：水色为真实冰川蓝绿，非饱和卡通色；岸边树木形态符合实地。

### 3.4 云南 Yunnan

- 关键词：Lijiang, Dali, Shangri-La, old town, Naxi, Bai, highland
- 推荐来源：
  - 云南省文化和旅游厅
  - Unsplash 关键词 `lijiang`, `dali yunnan`, `yunnan old town`
- 验证点：建筑形制、屋瓦、巷道与真实古镇匹配；不要主题公园式过度装饰。

## 4. 服务/顾问镜头替换

`mood-only/service/` 下两张是 AI 图：

- `05_local_advisor_planning.png`：本地顾问规划行程
- `06_concierge_itinerary_note.png`：行程笔记静物

替换方向：

- 自拍 / 合作摄影师在你团队真实办公环境拍摄；
- 真实顾问、真实使用的工具（地图、笔记本、电脑屏幕里有马赛克 / 占位图）；
- 不要 stock 西装握手照、不要 stock 笑脸服务台；
- 必要时只拍手部、笔记、屏幕局部，避免肖像权问题。

## 5. 背景层替换

`mood-only/background/`：

- `07_misty_mountain_atmosphere.png`：山雾大背景
- `08_film_grain_overlay_texture.png`：胶片颗粒叠加层

替换方向：

- 自家或图库实拍山脉远景（建议从主推目的地之一拍）；
- 颗粒叠加可以保留 AI 生成版本作为纯纹理（不构成宣传素材），但仍写入 attribution。

## 6. attribution.json 规范

每张正式素材必须登记一行：

```json
{
  "file": "real/destinations/zhangjiajie-01.jpg",
  "destination": "zhangjiajie",
  "source_type": "unsplash | self-shot | partner-photographer | tourism-bureau | wikimedia | paid-stock",
  "source_url": "https://...",
  "photographer": "Name or @handle",
  "license": "CC-BY-4.0 | Unsplash License | Custom Commercial | ...",
  "verified_real": true,
  "captured_at": "2024-09 or YYYY-MM-DD if known",
  "notes": "any usage / cropping / retouch caveats"
}
```

## 7. 上线前校验清单

- [ ] `mood-only/` 下没有任何文件被 import 到正式页面代码或 Figma 文件作为最终交付。
- [ ] `app/client/...` 引用的每张图都能在 `attribution.json` 找到对应记录。
- [ ] 真实素材都验证过商用授权范围覆盖你的网站使用场景。
- [ ] 服务/顾问镜头若有真人，已获得肖像授权或不可识别。
- [ ] 关键目的地的视觉与文案一致，不存在“写桂林配九寨”的错位。

## 8. AI 图退场流程

1. Figma Make / 客户 review 通过视觉方向；
2. 拉取真实素材并填写 `attribution.json`；
3. 在原型 / 代码里把 mood-only 路径全部替换为 `real/...`；
4. `mood-only/` 整个目录加入 `.gitignore-not-publish` 或单独标记，不打包进上线产物；
5. 在 `docs/DESIGN.md` 注明视觉素材已切换为真实摄影。
