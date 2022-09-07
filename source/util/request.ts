//

import axios from "axios";


export type Ranking = Array<Result>;
export type Result = {
  rank: number,
  name: string,
  score: number,
  level: number,
  hitCount: number,
  killCount: number
};

const API_URL = "https://script.google.com/macros/s/AKfycbx1nmvHdsL31_U8aGedrDQn0ojK7aSRodOwp82K8JPOjjJoRTjzsZmeA6k4uAJWirY/exec";

export async function fetchRanking(): Promise<Ranking> {
  const response = await axios.get(API_URL, {params: {type: "fetch"}});
  const ranking = response.data;
  return ranking;
}

export async function sendResult(result: Omit<Result, "rank">): Promise<void> {
  const response = await axios.get(API_URL, {params: {type: "send", ...result}});
}