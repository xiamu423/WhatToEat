# WhatToEat (吃什么) 🍱

五角场大学城美食地图 - 为复旦、同济、财大学子打造的本地化美食指南。

## 核心功能
*   **美食地图**：基于高德地图 API，实时获取复旦大学地铁站周边 3km 餐饮商户。
*   **智能筛选**：支持价格区间、品类（快餐、火锅、奶茶等）、距离及评分的多维度筛选。
*   **必吃榜单**：展示五角场地区高评分商户 Top 15。
*   **探店发布**：支持用户发布探店笔记和用餐评价。
*   **个人中心**：管理收藏夹及历史记录。

## 技术栈
*   **前端**: React + Vite + React Router
*   **UI**: 移动端优先，美团风格配色 (Meituan Yellow)
*   **API**: 高德地图 JS API (Amap API)

## 开发调试

1.  克隆仓库：
    ```bash
    git clone https://github.com/xiamu423/WhatToEat.git
    cd WhatToEat
    ```

2.  安装依赖：
    ```bash
    npm install
    ```

3.  配置环境变量：
    复制 `.env.example` 为 `.env` 并填写你的高德地图 API Key 和 Secret。

4.  运行项目：
    ```bash
    npm run dev
    ```

## 贡献
欢迎提交 Issue 或 Pull Request 来改进这个小工具！
