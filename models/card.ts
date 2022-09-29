import { date } from "utils";

export interface iCard {
  id: number;
  title: string;
  note: string;
  createdAt: date.DateType;
}

export type sCard = {
  id: number;
  dish_id: number;
  title: string;
  note: string;
  portion: number; // ?
  created_at: string;
  modified_at: string;
};

class Card implements iCard {
  id: number;
  title: string;
  note: string;
  createdAt: date.DateType;

  constructor(sCard: sCard) {
    this.id = sCard.id;
    this.title = sCard.title;
    this.note = sCard.note;
    this.createdAt = date.parse(sCard.created_at);
  }
}

export default Card;
