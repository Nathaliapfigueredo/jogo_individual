export class GameScene extends Phaser.Scene {

    alturaJogo = 600;
    larguraJogo = 800;
    plataformas = [];
    virusList = []; // Lista para armazenar os vírus

    constructor() {
        super("MainScene");
    }

    preload() {
        this.load.image("paisagem", "./assets/fundo2.png");
        this.load.image("plataforma", "./assets/plataforma.png");
        this.load.spritesheet("cientista", "./assets/spritesheet.png", { frameWidth: 72, frameHeight: 100 });
        this.load.audio("musicaFundo", "./assets/musica.mp3");
        this.load.image("cura", "./assets/cura.png");
        this.load.image("virus", "./assets/virus.png");
    }

    create() {
        this.pontuacao = 0; //inicializa a pontuação

        //adiciona a música de fundo em loop
        this.musica = this.sound.add("musicaFundo");
        this.musica.play({ loop: true, volume: 0.5 });
        

        this.add.image(this.larguraJogo / 2, this.alturaJogo / 2, "paisagem").setScale(0.6);

        //cria jogador
        this.player = this.physics.add.sprite(this.larguraJogo / 2, 100, 'cientista').setScale(0.8);
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(60, 90, true);

        //cria as plataformas
        this.plataformas[0] = this.physics.add.staticImage(200, 450, 'plataforma');
        this.plataformas[0].body.setSize(148, 44, true);
        this.plataformas[0].setScale(0.3);

        this.plataformas[1] = this.physics.add.staticImage(580, 360, 'plataforma');
        this.plataformas[1].body.setSize(148, 44, true);
        this.plataformas[1].setScale(0.3);


        //adiciona colisão entre o jogador e as plataformas
        for (let i = 0; i < this.plataformas.length; i++) {
            this.physics.add.collider(this.player, this.plataformas[i]);
        }

        //captura das teclas de movimento
        this.cursors = this.input.keyboard.createCursorKeys();

        //adiciona o texto
        this.placar = this.add.text(50, 50, 'Frascos:' + this.pontuacao, { fontSize: '45px', fill: '#495613' });

        //cria frasco de cura e colisão
        this.cura = this.physics.add.sprite(this.larguraJogo / 3, 0, 'cura').setScale(0.2);
        this.cura.setCollideWorldBounds(true);
        for (let i = 0; i < this.plataformas.length; i++) {
            this.physics.add.collider(this.cura, this.plataformas[i]);
        }

        //quando o jogador coleta a cura, aumenta a pontuação e reposiciona o item
        this.physics.add.overlap(this.player, this.cura, () => {
            this.cura.setVisible(false);
            var posicaoCura_Y = Phaser.Math.RND.between(50, 650);
            this.cura.setPosition(posicaoCura_Y, 100);
            this.pontuacao += 1;
            this.placar.setText('Frascos: ' + this.pontuacao);
            this.cura.setVisible(true);
        });

        //definição das animações do personagem
        this.anims.create({
            key: 'direita',
            frames: this.anims.generateFrameNumbers('cientista', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'esquerda',
            frames: this.anims.generateFrameNumbers('cientista', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'parada',
            frames: [{ key: 'cientista', frame: 4 }],
            frameRate: 20
        });

        // Criar vários vírus
        for (let i = 0; i < 5; i++) {
            let virus = this.physics.add.sprite(Phaser.Math.RND.between(50, this.larguraJogo - 50), 
                Phaser.Math.RND.between(100, this.alturaJogo - 100), 'virus').setScale(0.3);
            virus.setCollideWorldBounds(true);
            this.virusList.push(virus);

            // Colisão com as plataformas
            for (let j = 0; j < this.plataformas.length; j++) {
                this.physics.add.collider(virus, this.plataformas[j]);
            }

            // Colisão com o jogador           
            this.physics.add.overlap(this.player, virus, () => {
                // Impulso para trás ao tocar no vírus
                this.player.setVelocityX(-400); // Impulso para a esquerda
                this.player.setVelocityY(-400); // Pequeno impulso para cima 

                // Subtrai a pontuação
                this.pontuacao -= 1;
                this.placar.setText('Frascos: ' + this.pontuacao);

                // Delay para o impulso ser visível antes de verificar o game over
                this.time.delayedCall(100, () => {

                    // Verificar se a pontuação ficou negativa e encerrar o jogo
                    if (this.pontuacao < 0) {
                        this.player.setVisible(false);
                        this.virusList.forEach(v => v.setVisible(false));
                        this.cura.setVisible(false);
                    }
                });
            });

            // Mudar direção dos vírus
            this.time.addEvent({
                delay: 1000,
                callback: () => this.mudarDirecaoVirus(virus),
                callbackScope: this,
                loop: true
            });
        }
    }

    update() {

        //controle de movimento do jogador
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            if (this.player.anims.currentAnim?.key !== 'esquerda') {
                this.player.anims.play('esquerda', true);
            }
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            if (this.player.anims.currentAnim?.key !== 'direita') {
                this.player.anims.play('direita', true);
            }
        } else {
            this.player.setVelocityX(0);
            if (this.player.anims.currentAnim?.key !== 'parada') {
                this.player.anims.play('parada', true);
            }
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-400);
        }

        if (this.cursors.down.isDown) {
            this.player.setVelocityY(400);
        }

        //verifica condições de vitória ou derrota
        if (this.pontuacao >= 6) {
            this.musica.stop();
            this.scene.stop('MainScene');
            this.scene.start('EndScene', {pontuacao: "ganhou"});
        } else if (this.pontuacao < 0) {
            this.musica.stop();
            this.scene.stop('MainScene');
            this.scene.start('EndScene', {pontuacao: "perdeu"});
        }
    }

    mudarDirecaoVirus(virus) {
        let direcao = Phaser.Math.RND.pick([-160, 160]);
        virus.setVelocityX(direcao);
    }

    
}
