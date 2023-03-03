import Core from "@/services/axios/core.axios";

class LevelService extends Core {
    constructor() {
        super({
            endpoint: "levels/",
        });
    }

    fetchLevels() {
        return this.get("");
    }

    fetchLevelsWithFloat() {
        return this.get("float");
    }

    fetchGift(id){
        return this.post(`${id}`);
    }

    createPrize({level}) {
        return this.post(`levels/${level}`);
    }

    fetchHistories() {
        return this.get("histories");
    }
}

export const levelApi = new LevelService();
