import { CCSessionReq, SampleAPI } from './../CCSessionModel';


export class api_lhcdoc {
  static c = new SampleAPI('c=lhcdoc&a=');


  // 获取首页六合栏目列表
  static categoryList() {
    return this.c.get('categoryList');
  }

  // 老黄历
  static lhlDetail(date: string) {// 日期 20201002
    return this.c.get('lhlDetail', { date: date });
  }

  // 当前开奖信息
  static lotteryNumber(gameId: string) {
    return this.c.get('lotteryNumber', { gameId: gameId });
  }

  // 我的历史帖子
  static historyContent(page: number) {
    return this.c.get('historyContent', { rows: 20, page: page });
  }

  // 关注用户列表
  static followList(page: number) {
    return this.c.get('followList', { rows: 20, page: page });
  }

  // 关注帖子列表
  static favContentList(page: number) {
    return this.c.get('favContentList', { rows: 20, page: page });
  }

  // 六合用户数据
  static getUserInfo(uid: string) {
    return this.c.post('getUserInfo', { uid: uid });
  }

  // 帖子列表
  static contentList(alias: string, page: number) {// 栏目别名
    return this.c.get('contentList', { alias: alias, rows: 20, page: page });
  }

  // 获取帖子的期数列表
  static lhcNoList(type: string, type2?: string) { // 栏目ID、资料ID，二级分类的期数列表时必须
    return this.c.get('lhcNoList', { type: type, type2: type2 });
  }

  // 获取帖子详情
  static contentDetail(id: string) {
    return this.c.post('contentDetail', { id: id });
  }

  // 获取评论列表
  static contentReplyList(
    contentId: string, // 帖子ID
    replyPId: string = '', // 回复ID
    page: number = 1, // 页码
    rows: number = 20, // 每页条数
  ) {
    return this.c.get('contentReplyList', { contentId: contentId, replyPId: replyPId, page: page, rows: rows });
  }

  // 设置昵称
  static setNickname(nickname: string) {
    return this.c.post('setNickname', { nickname: nickname });
  }

  // 发表评论
  static postContentReply(cid: string, content: string) {
    return this.c.post('postContentReply', { cid: cid, content: content });
  }

  // 给帖子投票
  static vote(cid: string, animalId: string) {
    return this.c.post('vote', { cid: cid, animalId: animalId });
  }

  // 粉丝列表
  static fansList(page = 1, rows = 20) {
    return this.c.get('fansList', { page: page, rows: rows });
  }

  // 帖子粉丝列表
  static contentFansList() {
    return this.c.get('contentFansList');
  }

  // 搜索帖子
  static searchContent(alias: string, content: string, page = 1, rows = 20) {
    return this.c.get('searchContent', { alias: alias, content: content, page: page, rows: rows });
  }

  // 点赞内容或帖子
  static likePost(
    rid: string,// 帖子或内容ID
    type: number,// 1 点赞帖子 2 点赞评论
    likeFlag: number,// 点赞标记 1 点赞 0 取消点赞
  ) {
    return this.c.get('likePost', { rid: rid, type: type, likeFlag: likeFlag });
  }

  // 关注或取消关注楼主
  static followPoster(posterUid: string, followFlag: boolean) {
    return this.c.get('followPoster', { posterUid: posterUid, followFlag: followFlag });
  }

  // 收藏资料
  static doFavorites(
    id: string,// 分类ID或帖子ID
    type: number,//  1 收藏分类 2 收藏帖子
    favFlag: boolean,// 收藏标记 1 收藏 0 取消收藏
  ) {
    return this.c.get('doFavorites', { id: id, type: type, favFlag: favFlag });
  }

  // 六合图库列表接口
  static tkList(showFav: boolean, page = 1, rows = 20) {
    return this.c.get('tkList', { showFav: showFav, page: page, rows: rows });
  }

  // 发贴（接口待完善）
  static postContent() {
    return this.c.post('postContent');
  }

  // 购买帖子
  static buyContent(cid: string) {
    return this.c.post('buyContent', { cid: cid });
  }

  // 打赏帖子
  static tipContent(cid: string, amount: number) {
    return this.c.post('tipContent', { cid: cid, amount: amount });
  }
}