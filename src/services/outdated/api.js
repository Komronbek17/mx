import Auth from "@/services/outdated/auth";
import Info from "@/services/outdated/info";
import Bonus from "@/services/outdated/bonus";
import Subscribe from "@/services/outdated/subscribe";
import Levels from "@/services/outdated/levels";
import Content from "@/services/outdated/content";
import History from "@/services/outdated/history";
import Telegram from "@/services/outdated/telegram";
import News from "@/services/outdated/news";

export default {
  auth: new Auth("/v1/oauth/"),
  info: new Info("/v1/info/"),
  bonus: new Bonus("/v1/gifts/"),
  subscribe: new Subscribe("/v1/subscribe/"),
  levels: new Levels("/v1/levels"),
  content: new Content("/v1/content/"),
  history: new History("/v1/histories/"),
  news: new News("/v1/api/news/"),
  telegram: new Telegram("/v1/telegram/"),
};
