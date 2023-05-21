import { Bookings } from "./bookings.js";
import { Clients } from "./clients.js";
import { Services } from "./services.js";
import { Reviews } from "./reviews.js";
import { Bookings_Services } from "./bookings.js";

const a = await Bookings.findOne({
  include: [Clients, Services],
});

const c = await Reviews.findOne({
  include: Clients,
});
const b = await Reviews.findAll({ include: Clients });
console.log(JSON.stringify(a));
