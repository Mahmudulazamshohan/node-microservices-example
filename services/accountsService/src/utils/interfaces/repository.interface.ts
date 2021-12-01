interface RepositoryInterface {
  FindById(_id: number): Promise<any>;
}

export default RepositoryInterface;
