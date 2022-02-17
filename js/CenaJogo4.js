import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Sprite from "./Sprite.js";
import PC from "./PC.js";
import Magia from "./Magia.js";
import Espadada from "./Espadada.js";
import { mapa4 as modeloMapa4 } from "../maps/mapa4.js";

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

export default class CenaJogo4 extends Cena {
  onColisao(a, b) {
    if (
      (a.tags.has("pc") && b.tags.has("tiro")) ||
      (a.tags.has("pc") && b.tags.has("espada")) ||
      (b.tags.has("pc") && a.tags.has("tiro")) ||
      (b.tags.has("pc") && a.tags.has("espada"))
    ) {
    } else {
      if (!this.aRemover.includes(a)) {
        this.aRemover.push(a);
      }
      if (!this.aRemover.includes(b)) {
        this.aRemover.push(b);
      }

      if (a.tags.has("pc") && b.tags.has("enemy")) {
        this.rodando = false;
        this.assets.play("derrota");
        this.game.selecionaCena("fim");
      } else {
        this.assets.play("colisaoInimigos");
      }
    }
  }
  checaFim() {
    if (this.pcCenaJogo.x > 591) {
      this.game.selecionaCena("fase5");
    } else if (this.pcCenaJogo.x < 17) {
      this.game.selecionaCena("fase3");
    }
    if (this.sprites.length == 0) {
      this.game.selecionaCena("fim");
    }
  }

  preparar() {
    super.preparar();
    const mapa4 = new Mapa(19, 12, 32);
    mapa4.carregaMapa(modeloMapa4);
    this.configuraMapa(mapa4);
    this.mapa = mapa4;
    this.contaMapa = 1;
    this.contador = 0;
    const acao = null;
    const pc = new PC({ x: 32 * 1, y: 32 * 10, h: 32, w: 32 });
    pc.tags.add("pc");
    this.pcCenaJogo = pc;
    this.dashCD = 0;
    const cena = this;

    pc.controlar = function (dt) {
      if (cena.input.comandos.get("MOVE_ESQUERDA")) {
        this.vx = -50;
        cena.acaoNoMomento = "MOVENDO_PARA_ESQUERDA";
      }
      if (cena.input.comandos.get("MOVE_DIREITA")) {
        this.vx = +50;
        cena.acaoNoMomento = "MOVENDO_PARA_DIREITA";
      }
      if (cena.input.comandos.get("DASH")) {
        if (cena.dashCD <= 0) {
          if (this.vx > 0) {
            this.vx = +500;
            cena.acaoNoMomento = "MOVENDO_PARA_DIREITA";
            cena.dashCD = 0.5;
          } else if (this.vx < 0) {
            this.vx = -500;
            cena.acaoNoMomento = "MOVENDO_PARA_ESQUERDA";
            cena.dashCD = 0.5;
          }
        }
      }
      if (
        cena.input.comandos.get("MOVE_ESQUERDA") ===
        cena.input.comandos.get("MOVE_DIREITA")
      ) {
        this.vx = 0;
        cena.acaoNoMomento = "PARADO";
      }

      if (cena.input.comandos.get("PULA")) {
        if (this.vy == 0) {
          this.vy = -100;
          cena.acaoNoMomento = "PULANDO";
        }
      }
      if (cena.input.comandos.get("ATIRAR")) {
        cena.acaoNoMomento = "ATIRANDO";
        if (this.vx < 0) {
          var tiro = new Magia({
            x: this.x - 50,
            y: this.y,
            vx: -100,
          });
        } else {
          var tiro = new Magia({
            x: this.x + 50,
            y: this.y,
            vx: +100,
          });
        }
        tiro.tags.add("tiro");
        this.cena.adicionar(tiro);
        tiro.mover(0);
      }
      if (cena.input.comandos.get("BATER")) {
        cena.acaoNoMomento = "BATENDO";
        if (this.vx < 0) {
          var batida = new Espadada({
            x: this.x - 32,
            y: this.y,
            color: "rgba(255, 0, 0, 1)",
          });
          batida.tags.add("espada");
        } else {
          var batida = new Espadada({
            x: this.x + 32,
            y: this.y,
            color: "rgba(255, 0, 0, 1)",
          });
          batida.tags.add("espada");
        }
        this.cena.adicionar(batida);
      }
    };

    this.adicionar(pc);
  }
}
