/** lunar-javascript 1.7.8 无官方类型;只声明本仓用到的面。 */
declare module "lunar-javascript" {
  export class Solar {
    static fromYmd(y: number, m: number, d: number): Solar;
    getLunar(): Lunar;
    toYmd(): string;
  }
  export class Lunar {
    static fromYmd(y: number, m: number, d: number, isLeap?: boolean): Lunar;
    getSolar(): Solar;
    getYear(): number;
    getMonth(): number;
    getDay(): number;
    getYearInChinese(): string;
    getMonthInChinese(): string;
    getDayInChinese(): string;
    getYearInGanZhi(): string;
    getYearShengXiao(): string;
    getJieQi(): string;
    toString(): string;
  }
}
