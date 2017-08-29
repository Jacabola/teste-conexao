class Personagem {
    constructor(nome, nivel, posicaoX, posicaoY, velocidadeNormal, velocidadeCorrendo){
        this.nome = nome;
        this.nivel = nivel;
        this.posicaoX = posicaoX;
        this.posicaoY = posicaoY;
        this.velocidadeNormal = velocidadeNormal;
        this.velocidadeCorrendo = velocidadeCorrendo;
    }
    
    falar(tx){
        console.log(this.nome + ': ' + tx);
    }
    
    andarEsq(){
        this.posicaoX = this.posicaoX + this.velocidadeNormal;
    }
    
    andarDir(){
        this.posicaoX = this.posicaoX - this.velocidadeNormal;
    }
    
    correrEsq(){
        this.posicaoX = this.posicaoX + this.velocidadeCorrendo;
    }
    
    correrDir(){
        this.posicaoX = this.posicaoX - this.velocidadeCorrendo;
    }
}

class Player extends Personagem{
    constructor(id, nome, posicaoX, posicaoY, classe){
        super(nome, 0, posicaoX, posicaoY, 20, 40);
        this.id = id;
        this.classe = classe;
    }
}