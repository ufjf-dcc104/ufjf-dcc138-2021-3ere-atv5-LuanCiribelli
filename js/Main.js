import AssetManager from "./AssetManager.js";
import Scene from "./Scene.js";
import Sprite from "./Sprite.js";
import Mapa from "./Mapa.js";
import { mapa1 as modeloMapa1 } from "../maps/mapa1.js";

const assets = new AssetManager();

assets.carregaImagem("garota", "assets/girl.png");
assets.carregaImagem("orc", " assets/orc.png");
assets.carregaImagem("skelly", "assets/skelly.png");
assets.carregaAudio("pulo", "assets/jump.wav");

const canvas = document.querySelector("canvas");
canvas.width = 14 * 32;
canvas.height = 10 * 32;
const cena1 = new Scene(canvas, assets);

const mapa1 = new Mapa(10, 14, 32);

mapa1.carregaMapa(modeloMapa1);
cena1.configuraMapa(mapa1);

const pc = new Sprite({ x: 50, vx: 10 });
const en1 = new Sprite({ x: 160,vx:-10 ,color: "red" });

cena1.adicionar(pc);
cena1.adicionar(en1);
cena1.adicionar(new Sprite({x:115, y: 70, vy:10,color: "red" }));
cena1.adicionar(new Sprite({x:115, y: 160, vy:-10,color: "red" }));

cena1.iniciar();

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "s":
      cena1.iniciar();

      break;
    case "p":
      cena1.parar();
      break;
    default:
      break;
  }
});
