import Scene from "./Scene.js";
import Sprite from "./Sprite.js";

const canvas = document.querySelector("canvas");

const cena1 = new Scene(canvas);

const pc = new Sprite();
const en1 = new Sprite({ x: 140, color: "red" });

cena1.adicionar(pc);
cena1.adicionar(en1);

cena1.quadro(0);
