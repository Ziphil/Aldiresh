//


export type Ranking = Array<Result>;
export type Result = {
  rank: number,
  name: string,
  score: number,
  level: number,
  hitCount: number,
  killCount: number
};

export async function fetchRanking(): Promise<Ranking> {
  const ranking = [
    {rank: 1, name: "SLF", score: 1047502, level: 32, killCount: 398, hitCount: 1203},
    {rank: 2, name: "XRS", score: 845749, level: 30, killCount: 323, hitCount: 916},
    {rank: 3, name: "KJH", score: 745749, level: 29, killCount: 293, hitCount: 816},
    {rank: 4, name: "JHG", score: 645749, level: 28, killCount: 263, hitCount: 716},
    {rank: 5, name: "DFG", score: 545749, level: 27, killCount: 233, hitCount: 616},
    {rank: 6, name: "CVB", score: 445749, level: 26, killCount: 203, hitCount: 516},
    {rank: 7, name: "BNM", score: 345749, level: 25, killCount: 173, hitCount: 416},
    {rank: 8, name: "MNB", score: 245749, level: 24, killCount: 143, hitCount: 316},
    {rank: 9, name: "VBN", score: 34, level: 23, killCount: 113, hitCount: 216},
    {rank: 10, name: "ASD", score: 12, level: 22, killCount: 83, hitCount: 116}
  ];
  return ranking;
}