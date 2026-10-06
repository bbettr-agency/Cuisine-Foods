/**
 * SA-GEO — the single source of the South Africa map geometry used by the
 * homepage National Footprint and the /locations coverage map. A real low-res
 * contour (equirectangular, cos-corrected) projected into a 1000 × 878.2 box:
 * two subpaths, the coastline + the Lesotho enclave hole (which makes the shape
 * unmistakable). No map library — just an inline path string (~1.3KB).
 *
 * Hub marker positions are the geographic projection of each hub into the same
 * box, as a percentage. Keeping this here means there is ONE geometry to
 * maintain; each page composes its own layout around it.
 */
import type { Hub } from "@/config/coverage";

export const SA_VIEW = "0 0 1000 878.2";

export const SA_PATH =
  "M 920.6 494.4 L 908.7 504.4 L 883.0 539.5 L 866.1 574.9 L 831.7 624.3 L 763.1 695.5 L 720.3 736.9 L 674.5 768.3 L 611.1 795.1 L 580.2 798.7 L 572.4 817.8 L 535.5 807.6 L 505.5 820.8 L 439.7 807.5 L 403.0 815.9 L 377.9 812.3 L 315.3 839.5 L 263.5 850.4 L 226.0 876.5 L 198.4 878.2 L 172.8 853.6 L 152.3 852.3 L 126.2 821.5 L 123.3 831.1 L 115.2 812.5 L 115.6 772.1 L 95.9 725.8 L 115.4 713.3 L 113.8 660.3 L 74.1 595.7 L 43.6 537.3 L 43.6 537.1 L 0.0 447.5 L 29.1 413.3 L 53.0 432.2 L 63.2 461.7 L 90.5 466.8 L 128.6 479.8 L 161.2 474.8 L 215.3 439.5 L 215.4 184.7 L 231.8 195.0 L 267.7 260.6 L 262.1 302.6 L 275.7 326.9 L 319.1 319.8 L 349.5 289.0 L 378.2 268.3 L 393.0 235.2 L 422.6 219.2 L 448.2 227.6 L 477.2 246.9 L 526.5 250.3 L 565.3 234.3 L 571.5 212.8 L 582.1 179.7 L 615.1 174.2 L 633.4 148.3 L 653.6 102.3 L 708.0 50.8 L 793.9 0.0 L 818.6 0.8 L 847.9 12.4 L 868.4 4.2 L 900.6 11.1 L 929.7 108.2 L 945.4 157.2 L 934.6 234.1 L 939.8 258.9 L 909.2 246.2 L 891.7 251.2 L 885.9 271.2 L 869.4 297.2 L 869.9 321.0 L 906.1 358.4 L 941.6 351.0 L 954.0 320.3 L 1000.0 320.9 L 984.8 371.1 L 977.7 428.4 L 962.0 459.6 L 920.6 494.4 Z M 766.3 473.6 L 739.9 452.4 L 711.5 466.4 L 678.6 493.4 L 646.3 537.1 L 691.8 590.2 L 713.5 583.3 L 724.7 561.3 L 758.5 550.5 L 768.8 528.0 L 787.4 494.4 L 766.3 473.6 Z";

/** Hub marker positions, as a percentage of the SA box (geographic projection). */
export const HUB_MAP_POS: Record<Hub["id"], { x: number; y: number }> = {
  gauteng: { x: 71.85, y: 29.61 },
  "kwazulu-natal": { x: 88.29, y: 54.28 },
  "western-cape": { x: 12.59, y: 92.95 },
};
