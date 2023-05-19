import Core from "@/services/axios/core.axios";
import { axiosVersion } from "@/services/axios/axios";

class LocationService extends Core {
  constructor() {
    super({
      axios: axiosVersion({}),
    });
  }

  cityFindOne({ body: { id } }) {
    return this.get("city/findOne", {
      id,
    });
  }

  cityFindAll({ body: { page = 1, limit = 50, region_id = null } }) {
    return this.post("city/findAll", {
      page,
      limit,
      region_id,
    });
  }

  regionFindOne({ body: { id } }) {
    return this.get("region/findOne", {
      id,
    });
  }

  regionFindAll({ body: { page = 1, limit = 50 } }) {
    return this.post("region/findAll", {
      page,
      limit,
    });
  }
}

export const locationApi = new LocationService();
