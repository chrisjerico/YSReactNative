import { CCSessionReq } from './../CCSessionModel';


export class api_lhcdoc {
  c = 'c=lhcdoc&a=';


  // 获取首页六合栏目列表
  categoryList() {
    return CCSessionReq.get(this.c + arguments.callee.name);
  }

  // 老黄历
  lhlDetail(date: string) {// 日期 20201002
    return CCSessionReq.get(this.c + arguments.callee.name, { date: date });
  }

  // 当前开奖信息
  lotteryNumber(gameId: string) {
    return CCSessionReq.get(this.c + arguments.callee.name, { gameId: gameId });
  }

  // 我的历史帖子
  historyContent(page: number) {
    return CCSessionReq.get(this.c + arguments.callee.name, { rows: 20, page: page });
  }

  // 关注用户列表
  followList(page: number) {
    return CCSessionReq.get(this.c + arguments.callee.name, { rows: 20, page: page });
  }

  // 关注帖子列表
  favContentList(page: number) {
    return CCSessionReq.get(this.c + arguments.callee.name, { rows: 20, page: page });
  }

  // 六合用户数据
  getUserInfo(uid: string) {
    return CCSessionReq.post(this.c + arguments.callee.name, { uid: uid });
  }

  // 帖子列表
  contentList(alias: string, page: number) {// 栏目别名
    return CCSessionReq.get(this.c + arguments.callee.name, { alias: alias, rows: 20, page: page });
  }

  // 获取帖子的期数列表
  lhcNoList(type: string, type2?: string) { // 栏目ID、资料ID，二级分类的期数列表时必须
    return CCSessionReq.get(this.c + arguments.callee.name, { type: type, type2: type2 });
  }

  // 获取帖子详情
  contentDetail(id: string) {
    return CCSessionReq.post(this.c + arguments.callee.name, { id: id });
  }

  // 获取评论列表
  contentReplyList(
    contentId: string, // 帖子ID
    replyPId: string = '', // 回复ID
    page: number = 1, // 页码
    rows: number = 20, // 每页条数
  ) {
    return CCSessionReq.get(this.c + arguments.callee.name, { contentId: contentId, replyPId: replyPId, page: page, rows: rows });
  }

  // 设置昵称
  setNickname(nickname: string) {
    return CCSessionReq.post(this.c + arguments.callee.name, { nickname: nickname });
  }

  // 发表评论
  postContentReply(cid: string, content: string) {
    return CCSessionReq.post(this.c + arguments.callee.name, { cid: cid, content: content });
  }

  // 给帖子投票
  vote(cid: string, animalId: string) {
    return CCSessionReq.post(this.c + arguments.callee.name, { cid: cid, animalId: animalId });
  }

  // 粉丝列表
  fansList(page = 1, rows = 20) {
    return CCSessionReq.get(this.c + arguments.callee.name, { page: page, rows: rows });
  }

  // 帖子粉丝列表
  contentFansList() {
    return CCSessionReq.get(this.c + arguments.callee.name);
  }

  // 搜索帖子
  searchContent(alias: string, content: string, page = 1, rows = 20) {
    return CCSessionReq.get(this.c + arguments.callee.name, { alias: alias, content: content, page: page, rows: rows });
  }

  // 点赞内容或帖子
  likePost(
    rid: string,// 帖子或内容ID
    type: number,// 1 点赞帖子 2 点赞评论
    likeFlag: number,// 点赞标记 1 点赞 0 取消点赞
  ) {
    return CCSessionReq.get(this.c + arguments.callee.name, { rid: rid, type: type, likeFlag: likeFlag });
  }

  // 关注或取消关注楼主
  followPoster(posterUid: string, followFlag: boolean) {
    return CCSessionReq.get(this.c + arguments.callee.name, { posterUid: posterUid, followFlag: followFlag });
  }

  // 收藏资料
  doFavorites(
    id: string,// 分类ID或帖子ID
    type: number,//  1 收藏分类 2 收藏帖子
    favFlag: boolean,// 收藏标记 1 收藏 0 取消收藏
  ) {
    return CCSessionReq.get(this.c + arguments.callee.name, { id: id, type: type, favFlag: favFlag });
  }

  // 六合图库列表接口
  tkList(showFav: boolean, page = 1, rows = 20) {
    return CCSessionReq.get(this.c + arguments.callee.name, { showFav: showFav, page: page, rows: rows });
  }

  // 发贴（接口待完善）
  postContent() {
    return CCSessionReq.post(this.c + arguments.callee.name);
  }

  // 购买帖子
  buyContent(cid: string) {
    return CCSessionReq.post(this.c + arguments.callee.name, { cid: cid });
  }

  // 打赏帖子
  tipContent(cid: string, amount: number) {
    return CCSessionReq.post(this.c + arguments.callee.name, { cid: cid, amount: amount });
  }
}