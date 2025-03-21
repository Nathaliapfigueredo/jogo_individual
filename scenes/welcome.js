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
        this.load.image("laboratorio2", "./assets/laboratorio2.png");
        this.load.image("grace", "./assets/grace.png");
        this.load.image("descricao", "./assets/descricao.png");
        this.load.image("objetivo", "./assets/objetivo.png");
        this.load.image("titulo", "./assets/missao_ciencia.png");
        this.load.image("titulo1", "./assets/missao_ciencia1.png");
        this.load.image("play", "./assets/botao_play.png");
        this.load.image("controles", "./assets/controles.png");
        this.load.image("controlesImagem", "./assets/controles_imagem.png");
        this.load.image("fechar", "./assets/fechar.png");
    }

    create() {
        // Adiciona a imagem de fundo
        this.add.image(this.larguraJogo / 2, this.alturaJogo / 2, 'laboratorio');

        // Verifica se o dispositivo é desktop ou mobile
        const tituloImage = this.sys.game.device.os.desktop ? 'titulo' : 'titulo1';
        this.add.image(this.larguraJogo / 2, 120, tituloImage).setScale(0.25);

        // Adiciona outros elementos
        this.add.image(this.larguraJogo / 2, 270, "descricao").setScale(0.2);
        this.add.image(this.larguraJogo / 2, 400, "objetivo").setScale(0.2);

        this.botaoJogar = this.add.image(this.larguraJogo / 2 - 90, 500, "play").setScale(0.2).setInteractive();
        this.botaoControles = this.add.image(this.larguraJogo / 2 + 90, 500, "controles").setScale(0.2).setInteractive();

        // Configuração dos botões
        this.botaoJogar.on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
        });

        this.botaoJogar.on("pointerout", () => {
            this.input.setDefaultCursor("default");
        });

        this.botaoJogar.on("pointerdown", () => {
            this.scene.start("MainScene");
        });

        this.botaoControles.on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
        });

        this.botaoControles.on("pointerout", () => {
            this.input.setDefaultCursor("default");
        });

        // Botão de controles para exibir os controles
        this.botaoControles.on("pointerdown", () => {
            this.exibirControles();
        });

        this.cameras.main.clear();
    }

    // Exibe a imagem dos controles
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
        // Atualiza a cena, se necessário
    }
}
