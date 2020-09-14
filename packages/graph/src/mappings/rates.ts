import { log } from "@graphprotocol/graph-ts";
import { NewRate } from "../../generated/Rate/Rate";
import { Rate, User } from "../../generated/schema";

export function handleNewRate(event: NewRate): void {
  log.log(2, "- new rate -");

  let id_rate =
    event.params.from.toHexString() + "-" + event.params.to.toHexString();
  let newRate = Rate.load(id_rate);
  newRate.from = event.params.from;
  newRate.to = event.params.to;
  newRate.rate = event.params.rate;
  newRate.timestamp = event.params.timestamp;

  newRate.save();

  let newUser = User.load(event.params.from.toHexString());
  if (newUser == null) {
    newUser.address = event.params.from;
    newUser.timestamp = event.params.timestamp;
    newUser.save();
  }
}
