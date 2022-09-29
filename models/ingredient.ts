export interface iIngredient {
  id: number;
  name: string;
  volumn: number;
  unit: string;
}

export type sIngredient = {
  id: number;
  title: string;
  volume: number;
  volumn_unit: string;
};

class Ingredient implements iIngredient {
  id: number;
  name: string;
  volumn: number;
  unit: string;

  constructor(sIngredient: sIngredient) {
    this.id = sIngredient.id;
    this.name = sIngredient.title;
    this.volumn = sIngredient.volume;
    this.unit = sIngredient.volumn_unit;
  }
}
