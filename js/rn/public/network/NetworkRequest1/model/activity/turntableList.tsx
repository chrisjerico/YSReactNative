interface turntable {
  end: string;
  id: string;
  param: Param;
  start: string;
  type: string;
}

interface Param {
  buy: string;
  buy_amount: number;
  check_in_user_levels: string;
  membergame: string;
  prize_time: number;
  content_turntable: string[];
  prizeArr: Prize[];
}

interface Prize {
  prizeAmount: string;
  prizeIcon: string;
  prizeIconName: string;
  prizeId: number;
  prizeName: string;
  prizeType: string;
}

type Data = turntable[]
export default Data