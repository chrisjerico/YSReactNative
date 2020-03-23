import {Color1} from "../site/Color1";
import {Color2} from "../site/Color2";
import {SiteConfig, StationConfig} from "../../site/SiteConfig";
import {Color3} from "../site/Color3";


/**
 * 各站点对应的主题
 */
export const ThemeColorConfig = {
  c199: Color3,
  c199_a: Color1,
  c199_b: Color1,
  c199_c: Color1,
  c208: Color2,
  c208_a: Color2,
  c208_b: Color2,
  c208_c: Color2,
};


// export const ThemeColorConfig = (site: string, station = '') => {
//   switch (site) {
//     case SiteConfig.c199.name:
//       switch (station) {
//         case StationConfig.a.name:
//           return Color1;
//         case StationConfig.b.name:
//           return Color1;
//         default:
//           return Color1;
//       }
//       break;
//     case SiteConfig.c208.name:
//       switch (station) {
//         case StationConfig.a.name:
//           return Color1;
//         case StationConfig.b.name:
//           return Color1;
//         default:
//           return Color1;
//       }
//       break;
//     default:
//       return Color2;
//   }
// };
