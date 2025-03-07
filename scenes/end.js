export class EndScene extends Phaser.Scene {

    alturaJogo = 600;
    larguraJogo = 800;

    constructor() {
        super("EndScene");
    }

    //recebe os dados da cena anterior (pontuação)
    init(data) {
        this.resultado = data.pontuacao;
    }

    //carrega as imagens 
    preload() {
        this.load.image("paisagem", "../assets/paisagem.png");
        this.load.image("laboratorio", "../assets/laboratorio.png");
        this.load.image("perdeu", "../assets/perdeu.png");
        this.load.image("ganhou", "../assets/ganhou.png");
        this.load.image("menu", "../assets/botao_menu.png");
        this.load.image("restart", "../assets/botao_restart.png");
        this.load.image("virus", "../assets/virus.png");
    }


    create() {
        //adiciona as imagens
        this.add.image(this.larguraJogo/2, this.alturaJogo/2, "laboratorio");
        this.add.image(this.larguraJogo/2, 300, "virus").setScale(1)
        
        //adiciona os botões
        this.botaoMenu = this.add.image(this.larguraJogo/2 - 100, 450, "menu").setScale(0.2).setInteractive();
        this.botaoRestart = this.add.image(this.larguraJogo/2 + 100, 450, "restart").setScale(0.2).setInteractive();

        this.botaoMenu.on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
        });
        
        this.botaoMenu.on("pointerout", () => {
            this.input.setDefaultCursor("default");
        });

        this.botaoMenu.on("pointerdown", () => {
            this.scene.start("WelcomeScene")
        })

        this.botaoRestart.on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
        });
        
        this.botaoRestart.on("pointerout", () => {
            this.input.setDefaultCursor("default");
        });

        this.botaoRestart.on("pointerdown", () => {
            this.scene.stop("EndScene");
            this.scene.start("MainScene");
        })

        //exibe a mensagem de vitória ou derrota com base no resultado do jogo
        if (this.resultado === "ganhou"){
            this.add.image(this.larguraJogo/2, 130, "ganhou").setScale(0.25);
        }
        if (this.resultado === "perdeu"){
            this.add.image(this.larguraJogo/2, 130, "perdeu").setScale(0.19);
        }
    }

    update() {

    }
}