import CrudRepository from "./crud.repository.js";
import { Service } from "../model/index.js";

class ServiceRepository extends CrudRepository {
  constructor() {
    super(Service);
  }
}

export default ServiceRepository;
