import {hsl} from 'd3-color';

const GOLDEN_RATIO = 1.61803398875;
const INVERSE_GOLDEN_RATIO = 1 / GOLDEN_RATIO;

const defaultColorFunction = (val: number) => hsl(val * 360, 1, 0.5).toString();

export class RandomColorGenerator {
  protected _seed: number;
  protected value: number;
  protected colorFunc: (color: number) => string;
  protected cache: Record<string | number, string> = {};

  constructor(seedVal?: number, colorFunc: (color: number) => string = defaultColorFunction) {
    this._seed = seedVal ?? Math.random();
    this.value = this._seed;
    this.colorFunc = colorFunc;
  }

  get seed(): number {
    return this._seed;
  }

  public next(key?: string | number): string {
    let color: string;
    if (key && key in this.cache) {
      color = this.cache[key];
    } else {
      this.value += INVERSE_GOLDEN_RATIO;
      this.value %= 1;
      color = this.colorFunc(this.value);
    }
    if (key) {
      this.cache[key] = color;
    }
    return color;
  }
}
