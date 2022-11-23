export interface Item {
  application: string;
  domain: string;
  duration: 0.31;
  id: 2;
  ip: string;
  method: string;
  offset: 0.0;
  request: {
    header: string;
    size: 175;
    type: string;
  };
  response: {
    header: string;
    size: 89;
    type: string;
  };
  size: 264;
  speed: 8493.548387096775;
  status: string;
  type: string;
  url: string;
  user: string;
}

export interface Result {
  fileName?: string;
  data?: Item[];
}
