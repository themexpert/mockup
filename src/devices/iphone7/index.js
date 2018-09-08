import Device from "../../models/Device";
import Orientation from "../../models/Orientation";

export default new Device('iPhone7', {
    landscape: new Orientation(),
    portrait: new Orientation(),
});
