
import { userProviders } from "./users/user.provider";
import { citiesProviders } from "./cities/cities.provider";
import { statesProviders } from "./states/states.provider";
import { BCVProviders } from "./bcv/bcv.provider";

export const repositoriesProviders = [
  ...userProviders,
  ...citiesProviders,
  ...statesProviders,
  ...BCVProviders,
]