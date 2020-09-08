export interface Data {
  id: string;
  name: string;
  alias: string;
  desc: string;
  icon: string;
  isHot: string;
  link: string;
  appLink: string;
  appLinkCode: string;
  contentId: string;
  contentType: string;
  thread_type: string;
}

export interface LhcdocCategoryListModel {
  code: number;
  msg: string;
  data: Data[];
}
