import { datesAreOnSameDay } from "@/utils/date.formatter";

export function sortResultByDate({ arr = [], timeProperty = "created_at" }) {
  if (arr.length) {
    return arr.reduce((acm, v) => {
      const hasInStack = acm.findIndex((a) => {
        return datesAreOnSameDay(a.time, v[timeProperty]);
      });

      if (hasInStack === -1) {
        acm.push({
          result: [v],
          time: v[timeProperty],
        });
      } else {
        acm[hasInStack].result.push(v);
      }

      return acm;
    }, []);
  }

  return [];
}
