export interface UGGameLobbyModel {
  category: string;
  categoryName: string;
  games: Game[];
}

interface Game {
  gameType: string;
  gameTypeName: string;
  id: string;
  isClose: string;
  isHot: string;
  isInstant: string;
  isSeal: string;
  name: string;
  pic: string;
  title: string;
}

export default UGGameLobbyModel