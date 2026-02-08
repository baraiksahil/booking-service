import CrudRepository from "./crud.repository.js";
import { serviceModel } from "../model/index.js";

class ServiceRepository extends CrudRepository {
  constructor() {
    super(serviceModel);
  }
}

export default ServiceRepository;
