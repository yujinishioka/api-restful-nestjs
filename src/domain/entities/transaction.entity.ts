export class Transaction {
  constructor(
    public readonly amount: number,
    public readonly timestamp: Date,
  ) {}
}
