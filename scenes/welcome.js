export class WelcomeScene extends Phaser.Scene {

    alturaJogo = 600;
    larguraJogo = 800;

    //define o nome da cena
    constructor() {
        super("WelcomeScene");
    }

    preload() {
        //carrega as imagens usadas na cena
        this.load.image("paisagem", "./assets/paisagem.png");
        this.load.image("laboratorio", "./assets/laboratorio.png");
        this.load.image("grace", "./assets/grace.png");
        this.load.image("descricao", "./assets/descricao.png");
        this.load.image("objetivo", "./assets/objetivo.png");
        this.load.image("titulo", "./assets/missao_ciencia.png");
        this.load.image("play", "./assets/botao_play.png");
        this.load.image("controles", "./assets/controles.png");
        this.load.image("controlesImagem", "./assets/controles_imagem.png");
        this.load.image("fechar", "./assets/fechar.png");
    }

    create() {
        //adiciona alguns elementos
        this.add.image(this.larguraJogo/2, this.alturaJogo/2, "laboratorio");
        this.add.image(this.larguraJogo/2, 120, "titulo").setScale(0.25);
        this.add.image(this.larguraJogo/2, 270, "descricao").setScale(0.2);
        this.add.image(this.larguraJogo/2, 400, "objetivo").setScale(0.2);
        this.botaoJogar = this.add.image(this.larguraJogo/2 - 90, 500, "play").setScale(0.2).setInteractive();
        this.botaoControles = this.add.image(this.larguraJogo/2 + 90, 500, "controles").setScale(0.2).setInteractive();

        //add e configura botões
        this.botaoJogar.on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
        });
        
        this.botaoJogar.on("pointerout", () => {
            this.input.setDefaultCursor("default");
        });

        this.botaoJogar.on("pointerdown", () => {
            this.scene.start("MainScene")
        })



        this.botaoControles.on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
        });
        
        this.botaoControles.on("pointerout", () => {
            this.input.setDefaultCursor("default");
        });

        //botão de controles para exibir os controles
        this.botaoControles.on("pointerdown", () => {
            this.exibirControles();
   
        })

        
    }
    //exibe a imagem dos controles
    exibirControles() {

        // Adiciona a imagem dos controles à tela
        this.controlesImage = this.add.image(this.larguraJogo / 2, this.alturaJogo / 2, "controlesImagem").setScale(0.3);

        // Adiciona o botão de fechar
        this.botaoFechar = this.add.image(this.larguraJogo - 90, 60, "fechar").setScale(0.1).setInteractive();

        this.botaoFechar.on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
        });

        this.botaoFechar.on("pointerout", () => {
            this.input.setDefaultCursor("default");
        });

        // Ao clicar no botão de fechar a imagem some
        this.botaoFechar.on("pointerdown", () => {
            this.controlesImage.setVisible(false);
            this.botaoFechar.setVisible(false);
        });

    }



    update() {

    }
}
