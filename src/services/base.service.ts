import { API_URL } from "../constants";

export class BaseService<T> {
  protected endpoint: string;
  constructor(private entity: string) {
    this.endpoint = API_URL + this.entity;
  }

  async getAll(): Promise<T[]> {
    const res = await fetch(this.endpoint);
    return await res.json();
  }

  async findOne(id: number | string): Promise<T | undefined> {
    const res = await fetch(this.endpoint + "/" + id);
    return await res.json();
  }

  async updateOne({ id, data }: { id: string; data: any }) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const res = await fetch(this.endpoint + "/" + id, requestOptions);
    return await res.json();
  }
}
