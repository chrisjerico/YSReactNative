"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BZHThemeColor = void 0;
exports.BZHThemeColor = {
    宝石红: {
        skitType: '宝石红',
        skitString: '宝石红',
        tabBarBgColor: '#ffffff',
        tabNoSelectColor: '#9D9D9D',
        homeContentSubColor: '#f2f2f2',
        get bgColor() { return [this.tabBarBgColor, this.tabBarBgColor]; },
        get navBarBgColor() { return [this.themeColor, this.themeColor]; },
        get tabSelectedColor() { return this.themeColor; },
        get progressBgColor() { return [this.tabBarBgColor, this.tabBarBgColor]; },
        get homeContentColor() { return this.themeLightColor; },
        // cellBgColor: '#444',
        // CLBgColor: '#E6E6E6', // 推薦收益區塊
        get menuHeadViewColor() { return [this.themeColor, this.themeColor]; },
        textColor1: '#111111',
        textColor2: '#555555',
        textColor3: '#C1C1C1',
        textColor4: '#ffffff',
        conversionCellColor: '#444',
        // intoViewColor: '#444',
        //moneyCellColor: '#444',
        themeColor: '#e53333',
        themeLightColor: '#FFECEC',
        isBlack: false,
        is23: false,
        yubaoBgColor: "#8E8E8E"
    },
};
//# sourceMappingURL=BZHThemeColor.js.map